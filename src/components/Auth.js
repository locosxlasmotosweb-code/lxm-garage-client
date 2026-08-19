import React, { useState } from 'react';
import { playerEmail, supabase } from '../services/supabaseClient';

export default function Auth({ progress, submit, hasSupabase }) {
  const [login, setLogin] = useState(true);
  const [form, setForm] = useState({ firstName: '', lastName: '', username: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const change = (key, value) => setForm({ ...form, [key]: value });
  const toggle = () => { setLogin(!login); setError(''); };
  const send = async (event) => {
    event.preventDefault(); setError('');
    const username = form.username.trim().toLowerCase().replace(/\s/g, '');
    if (!username || form.password.length < 4) { setError('Ingresá usuario y una contraseña de al menos 4 caracteres.'); return; }
    if (!login && (!form.firstName.trim() || !form.lastName.trim() || !form.phone.trim())) { setError('Completá nombre, apellido y celular.'); return; }
    setLoading(true);
    try {
      if (hasSupabase) {
        if (login) {
          const { data, error: authError } = await supabase.auth.signInWithPassword({ email: playerEmail(username), password: form.password });
          if (authError) throw authError;
          submit({ ...data.user.user_metadata, username: data.user.user_metadata.username, password: '' });
        } else {
          const details = { firstName: form.firstName.trim(), lastName: form.lastName.trim(), username, phone: form.phone.trim() };
          const { data, error: authError } = await supabase.auth.signUp({ email: playerEmail(username), password: form.password, options: { data: details } });
          if (authError) throw authError;
          if (!data.session) throw new Error('Activá “Confirm email” en OFF dentro de Supabase: Authentication → Providers → Email.');
          submit({ ...details, password: '' });
        }
      } else if (login) {
        if (username !== progress.username || form.password !== progress.password) throw new Error('No encontramos una sesión local con esos datos. Configurá Supabase para acceso online.');
        submit({});
      } else submit({ firstName: form.firstName.trim(), lastName: form.lastName.trim(), username, phone: form.phone.trim(), password: form.password });
    } catch (err) { setError(err.message || 'No se pudo iniciar sesión.'); }
    finally { setLoading(false); }
  };
  return <section className="auth"><div className="auth-art"><p className="eyebrow">LXM GAME · ACCESO DE PILOTOS</p><h1>EL CIRCUITO<br /><em>TE ESPERA.</em></h1><p>Cada elección cuenta. Creá tu piloto y encontrá las rutas que otros no ven.</p></div><form className="auth-card" onSubmit={send}><div className="auth-mark">◈</div><h2>{login ? 'VOLVISTE AL GARAGE' : 'CREÁ TU PILOTO'}</h2><p>{login ? 'Ingresá con tu nombre de usuario y contraseña.' : 'Tus datos personales solo se muestran dentro de Mi perfil.'}</p>{!login && <div className="auth-row"><label>Nombre<input value={form.firstName} onChange={(e) => change('firstName', e.target.value)} placeholder="Tu nombre" /></label><label>Apellido<input value={form.lastName} onChange={(e) => change('lastName', e.target.value)} placeholder="Tu apellido" /></label></div>}<label>Nombre de usuario<input value={form.username} onChange={(e) => change('username', e.target.value)} placeholder="ej. rider.lxm" autoCapitalize="none" /></label>{!login && <label>Celular<input type="tel" value={form.phone} onChange={(e) => change('phone', e.target.value)} placeholder="+54 9 351..." /></label>}<label>Contraseña<input type="password" value={form.password} onChange={(e) => change('password', e.target.value)} placeholder="••••••••" /></label>{error && <span className="auth-error">{error}</span>}<button className="play-button" type="submit" disabled={loading}>{loading ? 'CONECTANDO...' : login ? 'INICIAR SESIÓN' : 'CREAR PILOTO'}</button><button className="auth-toggle" type="button" onClick={toggle}>{login ? '¿No tenés cuenta? Creá tu piloto' : '¿Ya tenés cuenta? Iniciar sesión'}</button></form></section>;
}
