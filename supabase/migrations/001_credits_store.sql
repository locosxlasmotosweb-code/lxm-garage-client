-- LXM GAME: economía segura. Ejecutar una sola vez desde Supabase SQL Editor.
create table if not exists public.player_profiles (
  player_id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  first_name text, last_name text, phone text, created_at timestamptz not null default now()
);
create table if not exists public.player_wallets (
  player_id uuid primary key references auth.users(id) on delete cascade,
  balance_credits integer not null default 0 check (balance_credits >= 0), updated_at timestamptz not null default now()
);
create table if not exists public.credit_transactions (
  id uuid primary key default gen_random_uuid(), player_id uuid not null references auth.users(id) on delete cascade,
  amount integer not null check (amount <> 0), type text not null, reason text not null, description text,
  created_by uuid references auth.users(id), reference_type text, reference_id uuid, created_at timestamptz not null default now()
);
create table if not exists public.raffles (
  id uuid primary key default gen_random_uuid(), name text not null, active boolean not null default true, created_at timestamptz not null default now()
);
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(), content_type text not null, content_id text not null, name text not null,
  description text, image text, category text, sort_order integer not null default 0, price_credits integer not null default 0 check (price_credits >= 0),
  is_free boolean not null default false, purchasable boolean not null default false, active boolean not null default true,
  raffle_id uuid references public.raffles(id), raffle_chances integer not null default 0 check (raffle_chances >= 0), created_at timestamptz not null default now(),
  unique(content_type, content_id)
);
create table if not exists public.player_inventory (
  id uuid primary key default gen_random_uuid(), player_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid references public.products(id), content_type text not null, content_id text not null, acquired_at timestamptz not null default now(),
  unique(player_id, content_type, content_id)
);
create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(), player_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.products(id), paid_credits integer not null check (paid_credits >= 0), currency text not null default 'credits',
  status text not null default 'completed', created_at timestamptz not null default now(), unique(player_id, product_id)
);
create table if not exists public.raffle_entries (
  id uuid primary key default gen_random_uuid(), raffle_id uuid not null references public.raffles(id), player_id uuid not null references auth.users(id) on delete cascade,
  purchase_id uuid not null references public.purchases(id), chances integer not null check (chances > 0), created_at timestamptz not null default now()
);
create table if not exists public.admin_users (player_id uuid primary key references auth.users(id) on delete cascade, created_at timestamptz not null default now());

alter table public.player_profiles enable row level security; alter table public.player_wallets enable row level security; alter table public.credit_transactions enable row level security;
alter table public.products enable row level security; alter table public.player_inventory enable row level security; alter table public.purchases enable row level security; alter table public.raffles enable row level security; alter table public.raffle_entries enable row level security;
create policy "profile own read" on public.player_profiles for select using (auth.uid() = player_id);
create policy "wallet own read" on public.player_wallets for select using (auth.uid() = player_id);
create policy "transaction own read" on public.credit_transactions for select using (auth.uid() = player_id);
create policy "inventory own read" on public.player_inventory for select using (auth.uid() = player_id);
create policy "purchase own read" on public.purchases for select using (auth.uid() = player_id);
create policy "raffle entry own read" on public.raffle_entries for select using (auth.uid() = player_id);
create policy "active products public read" on public.products for select using (active = true);
create policy "active raffles public read" on public.raffles for select using (active = true);

create or replace function public.handle_new_lxm_player() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.player_profiles(player_id, username, first_name, last_name, phone) values (new.id, coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)), new.raw_user_meta_data->>'firstName', new.raw_user_meta_data->>'lastName', new.raw_user_meta_data->>'phone') on conflict (player_id) do nothing;
  insert into public.player_wallets(player_id) values (new.id) on conflict (player_id) do nothing;
  return new;
end; $$;
drop trigger if exists on_auth_user_created_lxm on auth.users;
create trigger on_auth_user_created_lxm after insert on auth.users for each row execute procedure public.handle_new_lxm_player();

create or replace function public.purchase_product_with_credits(p_product_id uuid) returns jsonb language plpgsql security definer set search_path = public as $$
declare v_player uuid := auth.uid(); v_product public.products%rowtype; v_balance integer; v_purchase uuid;
begin
  if v_player is null then raise exception 'Debés iniciar sesión'; end if;
  select * into v_product from public.products where id = p_product_id and active and purchasable for update;
  if not found then raise exception 'Producto no disponible'; end if;
  if exists(select 1 from public.player_inventory where player_id = v_player and content_type = v_product.content_type and content_id = v_product.content_id) then raise exception 'Ya adquiriste este contenido'; end if;
  insert into public.player_wallets(player_id) values (v_player) on conflict (player_id) do nothing;
  select balance_credits into v_balance from public.player_wallets where player_id = v_player for update;
  if v_balance < case when v_product.is_free then 0 else v_product.price_credits end then raise exception 'Créditos insuficientes'; end if;
  update public.player_wallets set balance_credits = balance_credits - case when v_product.is_free then 0 else v_product.price_credits end, updated_at = now() where player_id = v_player;
  insert into public.purchases(player_id, product_id, paid_credits) values (v_player, v_product.id, case when v_product.is_free then 0 else v_product.price_credits end) returning id into v_purchase;
  insert into public.player_inventory(player_id, product_id, content_type, content_id) values (v_player, v_product.id, v_product.content_type, v_product.content_id);
  if not v_product.is_free and v_product.price_credits > 0 then insert into public.credit_transactions(player_id, amount, type, reason, reference_type, reference_id) values (v_player, -v_product.price_credits, 'purchase', 'Compra ' || v_product.name, 'purchase', v_purchase); end if;
  if v_product.raffle_id is not null and v_product.raffle_chances > 0 then insert into public.raffle_entries(raffle_id, player_id, purchase_id, chances) values(v_product.raffle_id, v_player, v_purchase, v_product.raffle_chances); end if;
  return jsonb_build_object('balance', v_balance - case when v_product.is_free then 0 else v_product.price_credits end, 'purchase_id', v_purchase);
end; $$;

create or replace function public.admin_adjust_credits(p_player_id uuid, p_amount integer, p_reason text) returns jsonb language plpgsql security definer set search_path = public as $$
declare v_balance integer;
begin
  if auth.uid() is null or not exists(select 1 from public.admin_users where player_id = auth.uid()) then raise exception 'No autorizado'; end if;
  if p_amount = 0 or length(trim(coalesce(p_reason,''))) = 0 then raise exception 'Cantidad y motivo requeridos'; end if;
  insert into public.player_wallets(player_id) values (p_player_id) on conflict (player_id) do nothing;
  select balance_credits into v_balance from public.player_wallets where player_id = p_player_id for update;
  if v_balance + p_amount < 0 then raise exception 'El saldo no puede ser negativo'; end if;
  update public.player_wallets set balance_credits = v_balance + p_amount, updated_at = now() where player_id = p_player_id;
  insert into public.credit_transactions(player_id, amount, type, reason, created_by) values (p_player_id, p_amount, case when p_amount > 0 then 'admin_add' else 'admin_remove' end, p_reason, auth.uid());
  return jsonb_build_object('balance', v_balance + p_amount);
end; $$;

create or replace function public.admin_find_players(p_query text) returns table(player_id uuid, username text, balance_credits integer) language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null or not exists(select 1 from public.admin_users where player_id = auth.uid()) then raise exception 'No autorizado'; end if;
  return query select p.player_id, p.username, coalesce(w.balance_credits, 0) from public.player_profiles p left join public.player_wallets w on w.player_id = p.player_id where p.username ilike '%' || trim(leading '@' from p_query) || '%' order by p.username limit 20;
end; $$;
grant execute on function public.purchase_product_with_credits(uuid) to authenticated;
grant execute on function public.admin_adjust_credits(uuid, integer, text) to authenticated;
grant execute on function public.admin_find_players(text) to authenticated;
