export const rarity = { common: 'Común', uncommon: 'Poco común', rare: 'Rara', epic: 'Épica', legendary: 'Legendaria' };

export const cards = [
  { id: 'secret-path', name: 'Camino secreto', icon: '🗺️', rarity: 'rare', type: 'Camino secreto', description: 'Revela accesos que no aparecen en una vuelta normal.', effect: 'Abre hilos ocultos del circuito.', threads: ['pit-secret'] },
  { id: 'second-chance', name: 'Segunda oportunidad', icon: '↩️', rarity: 'uncommon', type: 'Segunda oportunidad', description: 'Tu comodín para corregir una mala maniobra.', effect: 'Permite retroceder una decisión negativa.', threads: [] },
  { id: 'hidden-info', name: 'Información oculta', icon: '◉', rarity: 'rare', type: 'Información oculta', description: 'Un scout siempre tiene un dato que otros no ven.', effect: 'Muestra pistas de consecuencia.', threads: [] },
  { id: 'double-or-nothing', name: 'Doble o nada', icon: '⚡', rarity: 'epic', type: 'Doble o nada', description: 'Apuesta todo a una sola vuelta.', effect: 'Duplica la recompensa de riesgo.', threads: [] },
  { id: 'destiny-shift', name: 'Cambio de destino', icon: '✦', rarity: 'legendary', type: 'Cambio de destino', description: 'La carta que transforma un final anunciado.', effect: 'Abre la salida legendaria.', threads: ['legendary-exit'] }
];

export const bikes = [
  { id: 'street-125', name: 'Street 125', icon: '🏍️', rarity: 'common', description: 'Tu primera moto. Ágil y confiable.', traits: ['Equilibrada', 'Inicio'], requirement: 'Disponible desde el inicio', threads: [] },
  { id: 'tornado-250', name: 'Tornado 250', icon: '🏍️', rarity: 'uncommon', description: 'Torque para no frenar cuando termina el asfalto.', traits: ['Tierra', 'Torque'], requirement: 'Nivel 2', threads: ['dirt-road'] },
  { id: 'cross-x', name: 'Cross X', icon: '🏍️', rarity: 'rare', description: 'Suspensión preparada para senderos imposibles.', traits: ['Montaña', 'Salto'], requirement: 'Descubrí la ruta de tierra', threads: ['mountain-trail'] },
  { id: 'apex-r', name: 'Apex R', icon: '🏍️', rarity: 'epic', description: 'Precisión de pista para correr por centímetros.', traits: ['Velocidad', 'Asfalto'], requirement: 'Nivel 4', threads: ['qualifying'] },
  { id: 'phantom-lx', name: 'Phantom LX', icon: '🏍️', rarity: 'legendary', description: 'Una moto nacida para el circuito que no figura en los mapas.', traits: ['Secreta', 'Legendaria'], requirement: 'Encontrá el final legendario', threads: ['secret-circuit'] }
];

export const avatars = [
  { id: 'rider', name: 'Rider', icon: '🧑‍🚀', rarity: 'common', description: 'Tu instinto se activa cuando el semáforo cambia.', skills: ['Carrera callejera'], requirement: 'Disponible desde el inicio', threads: [] },
  { id: 'mechanic', name: 'Mecánica', icon: '👩‍🔧', rarity: 'uncommon', description: 'Escuchás lo que el motor intenta decir.', skills: ['Reparación una vez por partida'], requirement: 'Completá un final de reparación', threads: ['repair-bay'] },
  { id: 'stunt', name: 'Stunt', icon: '🤸', rarity: 'rare', description: 'Donde otros ven una pared, vos ves una rampa.', skills: ['Maniobra aérea'], requirement: 'Nivel 3', threads: ['jump-line'] },
  { id: 'runner', name: 'Corredor', icon: '🏁', rarity: 'epic', description: 'Tus reflejos leen la pista antes que el resto.', skills: ['Clasificación'], requirement: 'Ganale al crono', threads: ['qualifying'] },
  { id: 'ghost', name: 'Ghost Rider', icon: '👤', rarity: 'legendary', description: 'Nunca llega tarde. Nunca deja huellas.', skills: ['Circuito secreto'], requirement: 'Final secreto', threads: ['secret-circuit'] }
];

export const skins = [
  { id: 'neon', name: 'Neón nocturno', icon: '✦', rarity: 'common', character: 'Rider', requirement: 'Disponible desde el inicio' },
  { id: 'oil', name: 'Aceite & acero', icon: '◈', rarity: 'uncommon', character: 'Mecánica', requirement: 'Desbloqueá Mecánica' },
  { id: 'pulse', name: 'Pulso violeta', icon: '◉', rarity: 'rare', character: 'Stunt', requirement: 'Nivel 3' },
  { id: 'chrome', name: 'Cromo de carrera', icon: '⬡', rarity: 'epic', character: 'Corredor', requirement: 'Ganá una carrera' },
  { id: 'void', name: 'Vacío LXM', icon: '✺', rarity: 'legendary', character: 'Ghost Rider', requirement: 'Final legendario' }
];

export const achievements = [
  { id: 'first-lap', name: 'Primera vuelta', icon: '◌', description: 'Terminá El Circuito.', requirement: 'Completá cualquier final.' },
  { id: 'dirt-rider', name: 'Polvo en la visera', icon: '◒', description: 'Tomá la ruta de tierra.', requirement: 'Elegí la ruta de tierra.' },
  { id: 'secret-finder', name: 'Sin mapa', icon: '✦', description: 'Descubrí un hilo secreto.', requirement: 'Necesitás Camino secreto.' },
  { id: 'champion', name: 'Dueño de la recta', icon: '★', description: 'Alcanzá un final bueno.', requirement: 'Ganale al circuito.' },
  { id: 'legend', name: 'LXM: Leyenda', icon: '♛', description: 'Alcanzá el final legendario.', requirement: 'Combiná tus mejores piezas.' }
];
