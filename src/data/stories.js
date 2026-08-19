export const stories = [{ id: 'circuit', title: 'El Circuito', subtitle: 'Una noche, muchas rutas', description: 'Llegás al circuito clandestino. Una vibración extraña en el motor anuncia que esta noche nada será una vuelta normal.', startNode: 'arrival', color: 'orange' }];

export const nodes = {
  arrival: { id: 'arrival', title: 'EL CIRCUITO', location: 'Acceso oeste · 23:48', image: '🏁', text: 'Estás llegando al circuito y escuchás que una moto está haciendo un ruido extraño. Los faros de otros pilotos dibujan sombras sobre el asfalto.', choices: [
    { id: 'inspect', text: 'Revisar la moto', tag: 'GRATIS', nextNode: 'inspection', rewards: { xp: 15 }, consequence: 'Notaste un detalle antes de correr.' },
    { id: 'race', text: 'Seguir andando hacia la grilla', tag: 'GRATIS', nextNode: 'grid', rewards: { xp: 10 }, consequence: 'El cronómetro ya está corriendo.' },
    { id: 'secret', text: 'Buscar la entrada olvidada', nextNode: 'pit-secret', requirements: { cards: ['secret-path'] }, hint: 'Requiere: Carta Camino secreto', secret: true, rewards: { xp: 30, coins: 40 } }
  ] },
  inspection: { id: 'inspection', title: 'EL RUIDO', location: 'Boxes improvisados', image: '🔧', text: 'El sonido viene de la cadena. Un mecánico te mira de reojo: “puedo ayudarte, pero la carrera empieza ya”.', choices: [
    { id: 'ask-mechanic', text: 'Pedir ayuda al mecánico', nextNode: 'repair-bay', requirements: { avatars: ['mechanic'] }, hint: 'Requiere: Avatar Mecánica', rewards: { xp: 25, coins: 15 } },
    { id: 'quick-fix', text: 'Ajustarla rápido y salir', tag: 'GRATIS', nextNode: 'grid', rewards: { xp: 15 }, consequence: 'La cadena queda tensa. Tal vez demasiado.' },
    { id: 'dirt', text: 'Evitar la grilla por el camino de tierra', nextNode: 'dirt-road', requirements: { bikes: ['tornado-250'] }, hint: 'Requiere: Moto Tornado 250', rewards: { xp: 20, coins: 20 } }
  ] },
  grid: { id: 'grid', title: 'LA GRILLA', location: 'Recta principal', image: '🚦', text: 'Tres luces rojas. A tu izquierda, Viper sonríe. A la derecha, un corredor señala un atajo entre los containers.', choices: [
    { id: 'honest', text: 'Salir limpio por la recta', tag: 'GRATIS', nextNode: 'straight', rewards: { xp: 20 } },
    { id: 'bet', text: 'Apostar doble o nada', nextNode: 'risky-start', requirements: { cards: ['double-or-nothing'] }, hint: 'Requiere: Carta Doble o nada', rewards: { xp: 35, coins: 50 } },
    { id: 'jump', text: 'Saltar los containers', nextNode: 'jump-line', requirements: { avatars: ['stunt'] }, hint: 'Requiere: Avatar Stunt', rewards: { xp: 30 } }
  ] },
  'repair-bay': { id: 'repair-bay', title: 'MANOS EXPERTAS', location: 'Box 07', image: '⚙️', text: 'Con un ajuste perfecto, la moto responde como si supiera hacia dónde querés ir. El mecánico te entrega una nota: “buscá la luz azul”.', choices: [
    { id: 'blue-light', text: 'Seguir la luz azul', tag: 'GRATIS', nextNode: 'pit-secret', rewards: { xp: 35, card: 'hidden-info' }, consequence: 'Obtuviste Información oculta.' },
    { id: 'back-grid', text: 'Volver a la grilla', tag: 'GRATIS', nextNode: 'grid', rewards: { xp: 10 } }
  ] },
  'dirt-road': { id: 'dirt-road', title: 'POLVO Y NEÓN', location: 'Perímetro del circuito', image: '🌙', text: 'La Tornado muerde la tierra. El camino te ofrece una curva segura y un sendero que sube hacia las antenas.', choices: [
    { id: 'safe-dirt', text: 'Tomar la curva ancha', tag: 'GRATIS', nextNode: 'straight', rewards: { xp: 25, coins: 25, achievement: 'dirt-rider' } },
    { id: 'mountain', text: 'Subir al sendero de montaña', nextNode: 'mountain-trail', requirements: { bikes: ['cross-x'] }, hint: 'Requiere: Moto Cross X', rewards: { xp: 45 } }
  ] },
  straight: { id: 'straight', title: 'A FONDO', location: 'Recta principal', image: '💨', text: 'La salida fue limpia. Viper te cierra el paso en la última curva; detrás de él se abre una puerta de mantenimiento.', choices: [
    { id: 'pass', text: 'Frenar tarde y buscar el hueco', tag: 'GRATIS', nextNode: 'good-ending', rewards: { xp: 55, coins: 100, achievement: 'champion' } },
    { id: 'maintenance', text: 'Entrar por la puerta de mantenimiento', nextNode: 'pit-secret', requirements: { cards: ['secret-path'] }, hint: 'Requiere: Carta Camino secreto', secret: true, rewards: { xp: 40 } },
    { id: 'qualifying', text: 'Activar modo clasificación', nextNode: 'qualifying', requirements: { bikes: ['apex-r'], avatars: ['runner'] }, hint: 'Requiere: Apex R + Avatar Corredor', rewards: { xp: 60, coins: 60 } }
  ] },
  'risky-start': { id: 'risky-start', title: 'TODO O NADA', location: 'Curva cero', image: '⚡', text: 'El asfalto desaparece bajo tus ruedas. Ganás dos posiciones, pero la moto vibra como una alarma.', choices: [
    { id: 'push', text: 'Mantener el acelerador abierto', tag: 'RIESGO', nextNode: 'bad-ending', rewards: { xp: 25, coins: -30 } },
    { id: 'shift', text: 'Cambiar el destino de la vuelta', nextNode: 'pit-secret', requirements: { cards: ['destiny-shift'] }, hint: 'Requiere: Carta Cambio de destino', secret: true, rewards: { xp: 70 } }
  ] },
  'jump-line': { id: 'jump-line', title: 'EN EL AIRE', location: 'Zona industrial', image: '✦', text: 'El mundo se queda quieto un segundo. Al caer, descubrís que el salto evita media pista.', choices: [
    { id: 'land', text: 'Aterrizar y atacar la curva', tag: 'GRATIS', nextNode: 'good-ending', rewards: { xp: 65, coins: 80, bike: 'cross-x' } },
    { id: 'roof', text: 'Seguir por los techos', nextNode: 'pit-secret', requirements: { cards: ['secret-path'] }, hint: 'Requiere: Carta Camino secreto', secret: true, rewards: { xp: 45 } }
  ] },
  'mountain-trail': { id: 'mountain-trail', title: 'ARRIBA DEL RUIDO', location: 'Antenas del norte', image: '⛰', text: 'Desde arriba, el circuito parece un tablero de luces. Encontrás una llave con el símbolo LXM grabado.', choices: [
    { id: 'legendary', text: 'Abrir el circuito que no figura en el mapa', nextNode: 'legendary-ending', requirements: { cards: ['secret-path'], level: 2 }, hint: 'Requiere: Camino secreto + Nivel 2', secret: true, rewards: { xp: 120, coins: 250, bike: 'phantom-lx', achievement: 'legend' } },
    { id: 'return', text: 'Bajar a la carrera', tag: 'GRATIS', nextNode: 'good-ending', rewards: { xp: 45, coins: 70 } }
  ] },
  'pit-secret': { id: 'pit-secret', title: 'LA LUZ AZUL', location: 'Túnel de servicio', image: '🔷', text: 'El túnel se abre detrás de los boxes. Hay un casco antiguo, una ruta marcada y una voz por radio: “solo los que combinan piezas llegan hasta acá”.', choices: [
    { id: 'secret-race', text: 'Aceptar el desafío LXM', nextNode: 'legendary-ending', requirements: { bikes: ['tornado-250'], avatars: ['rider'], cards: ['secret-path'] }, hint: 'Requiere: Tornado 250 + Rider + Camino secreto', secret: true, rewards: { xp: 100, coins: 180, avatar: 'runner', achievement: 'secret-finder' } },
    { id: 'normal-return', text: 'Volver a la pista principal', tag: 'GRATIS', nextNode: 'straight', rewards: { xp: 20 } }
  ] },
  qualifying: { id: 'qualifying', title: 'MILÉSIMAS', location: 'Crono LXM', image: '⏱', text: 'El cronómetro baja. Con la moto correcta y pulso frío, cruzás la línea dejando a Viper sin respuesta.', choices: [
    { id: 'chrono-win', text: 'Cruzar la meta', tag: 'GRATIS', nextNode: 'good-ending', rewards: { xp: 90, coins: 180, skin: 'chrome' } }
  ] },
  'good-ending': { id: 'good-ending', ending: 'good', title: 'FINAL: DUEÑO DE LA RECTA', image: '🏆', text: 'La meta explota en luces. Esta noche el circuito conoce tu nombre.', choices: [] },
  'bad-ending': { id: 'bad-ending', ending: 'bad', title: 'FINAL: DEMASIADO RÁPIDO', image: '💥', text: 'La curva no perdona. No ganaste la carrera, pero ahora sabés exactamente dónde estuvo el error.', choices: [] },
  'legendary-ending': { id: 'legendary-ending', ending: 'legendary', title: 'FINAL LEGENDARIO: MÁS ALLÁ DEL MAPA', image: '♛', text: 'La ruta secreta termina en un circuito suspendido sobre la ciudad. LXM acaba de abrirte su puerta más alta.', choices: [] }
};
