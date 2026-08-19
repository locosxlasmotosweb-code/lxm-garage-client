import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = url && key ? createClient(url, key) : null;
export const hasSupabase = Boolean(supabase);

// Supabase Auth usa email. El juego conserva un acceso solo por nombre de usuario
// generando internamente una dirección técnica que nunca se muestra al jugador.
export const playerEmail = (username) => `${username.trim().toLowerCase().replace(/[^a-z0-9._-]/g, '')}@players.lxm.game`;
