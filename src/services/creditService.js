import { supabase } from './supabaseClient';

const LOCAL_KEY = 'lxm-credit-ledger-v1';
const readLocal = () => { try { return JSON.parse(localStorage.getItem(LOCAL_KEY)) || { balances: {}, transactions: [], purchases: [] }; } catch { return { balances: {}, transactions: [], purchases: [] }; } };
const writeLocal = (data) => localStorage.setItem(LOCAL_KEY, JSON.stringify(data));

export async function getWallet(playerId) {
  if (supabase && playerId) {
    const { data, error } = await supabase.from('player_wallets').select('balance_credits').eq('player_id', playerId).maybeSingle();
    if (!error && data) return { balance: data.balance_credits, source: 'supabase' };
  }
  const local = readLocal(); return { balance: local.balances[playerId] || 0, source: 'local' };
}

export async function getTransactions(playerId) {
  if (supabase && playerId) {
    const { data, error } = await supabase.from('credit_transactions').select('*').eq('player_id', playerId).order('created_at', { ascending: false }).limit(20);
    if (!error) return data;
  }
  return readLocal().transactions.filter((item) => item.player_id === playerId).slice(0, 20);
}

export async function findPlayers(query) {
  if (supabase) {
    const { data, error } = await supabase.rpc('admin_find_players', { p_query: query });
    if (error) throw error;
    return data || [];
  }
  return query.trim() ? [{ player_id: query.trim(), username: query.trim().replace(/^@/, ''), balance_credits: (await getWallet(query.trim())).balance }] : [];
}

// En producción esta llamada usa una RPC SECURITY DEFINER. El navegador no calcula el saldo.
export async function purchaseProduct(playerId, product) {
  if (supabase && product.productId) {
    const { data, error } = await supabase.rpc('purchase_product_with_credits', { p_product_id: product.productId });
    if (error) throw error;
    return data;
  }
  // Fallback exclusivo de demo sin backend. En producción la RPC anterior es la autoridad.
  const local = readLocal(); const contentId = product.id;
  if (local.purchases.some((item) => item.player_id === playerId && item.content_id === contentId)) throw new Error('Ya adquiriste este contenido.');
  const price = product.isFree ? 0 : Math.max(0, Number(product.priceCredits || 0)); const balance = local.balances[playerId] || 0;
  if (balance < price) throw new Error('No tenés créditos suficientes.');
  local.balances[playerId] = balance - price;
  const now = new Date().toISOString();
  local.purchases.unshift({ id: `local-purchase-${Date.now()}`, player_id: playerId, content_id: contentId, content_type: product.contentType, paid_credits: price, created_at: now });
  local.transactions.unshift({ id: `local-tx-${Date.now()}`, player_id: playerId, amount: -price, type: 'purchase', reason: `Compra ${product.name}`, description: `Compra ${product.name}`, created_at: now });
  writeLocal(local); return { balance: local.balances[playerId], source: 'local' };
}

// Solo administradores: validar en RPC contra public.admin_users. Nunca modificar saldo directo desde React.
export async function adminAdjustCredits(playerId, amount, reason) {
  if (supabase) {
    const { data, error } = await supabase.rpc('admin_adjust_credits', { p_player_id: playerId, p_amount: amount, p_reason: reason });
    if (error) throw error;
    return data;
  }
  const local = readLocal(); const before = local.balances[playerId] || 0; const next = before + amount;
  if (next < 0) throw new Error('El saldo no puede ser negativo.');
  local.balances[playerId] = next;
  local.transactions.unshift({ id: `local-${Date.now()}`, player_id: playerId, amount, type: amount > 0 ? 'admin_add' : 'admin_remove', reason, description: reason, created_at: new Date().toISOString() });
  writeLocal(local); return { balance: next, source: 'local' };
}
