export const freeCircuitStory = {
  id: 'free-circuit', title: 'Domingo de Circuito', description: 'Historia principal gratuita de demostración.', free: true, active: true, startNode: 'arrival', fallbackNode: 'finish', nodes: {
    arrival: { id: 'arrival', title: 'Llegada', location: 'Circuito · temprano', text: 'Llegás temprano al circuito. El piso está húmedo y el ruido de los motores todavía rebota contra los boxes vacíos.', variants: [{ text: 'Llegás temprano al circuito. El piso está húmedo y el ruido de los motores todavía rebota contra los boxes vacíos.', tags: [] }, { text: 'Venís con el pulso alto. Tus decisiones agresivas de hoy te hacen mirar cada hueco como una oportunidad.', tags: ['ataque', 'riesgo'] }], choices: [
      { id: 'inspect', text: 'Revisás la moto antes de salir.', tags: ['mecanica', 'precaucion'], effects: { state: { precaucion: 2, confianza: 1 } }, nextNode: 'grid', rewards: { xp: 8 } },
      { id: 'rush', text: 'Te ponés el casco y vas directo a la grilla.', tags: ['ataque', 'aceleracion'], effects: { state: { ataque: 2, riesgo: 1 } }, nextNode: 'grid', rewards: { xp: 8 } },
      { id: 'friend-advice', text: 'Escuchás el consejo de tu amigo antes de entrar.', tags: ['estrategia'], requirements: { friend: 'mechanic' }, effects: { state: { estrategia: 2 } }, nextNode: 'grid', rewards: { xp: 10 } }
    ] },
    grid: { id: 'grid', title: 'La grilla', location: 'Recta principal', text: 'Las luces rojas se encienden. Sentís la rueda trasera buscar agarre sobre el asfalto frío.', entryTags: ['ataque', 'precaucion', 'estrategia'], choices: [
      { id: 'inside', text: 'Te tirás por adentro cuando se apagan las luces.', tags: ['ataque', 'adelantamiento'], effects: { state: { ataque: 2, riesgo: 2 } }, nextNode: 'curve', rewards: { xp: 12 } },
      { id: 'wait', text: 'Esperás una vuelta para entender el ritmo.', tags: ['precaucion', 'estrategia'], effects: { state: { precaucion: 2, riesgo: -1 } }, nextNode: 'curve', rewards: { xp: 10 } },
      { id: 'mechanic-memory', text: 'Recordás el consejo de tu mecánico sobre la salida.', tags: ['mecanica'], requirements: { mechanic: 'mechanic' }, effects: { state: { confianza: 2 } }, nextNode: 'curve', rewards: { xp: 14 } }
    ] },
    curve: { id: 'curve', title: 'Curva uno', location: 'Sector técnico', text: 'Entrás a la curva demasiado rápido. El piloto de adelante te tapa la línea y el circuito se achica.', entryTags: ['riesgo', 'precaucion', 'confianza'], choices: [
      { id: 'brake', text: 'Frenás fuerte y buscás salir prolijo.', tags: ['frenada', 'precaucion'], effects: { state: { precaucion: 1, confianza: 1 } }, nextNode: 'battle', rewards: { xp: 10 } },
      { id: 'outside', text: 'Acelerás y buscás pasarlo por afuera.', tags: ['ataque', 'velocidad'], effects: { state: { ataque: 1, riesgo: 2 } }, nextNode: 'battle', rewards: { xp: 15 } },
      { id: 'purito', text: 'Aprovechás la potencia de tu moto y sostenés la línea.', tags: ['aceleracion'], requirements: { bike: 'tornado-250' }, effects: { state: { confianza: 2 } }, nextNode: 'battle', rewards: { xp: 16 } }
    ] },
    battle: { id: 'battle', title: 'La pelea', location: 'Vuelta final', text: 'Queda una vuelta. Escuchás a tu equipo desde afuera y tenés una última oportunidad para decidir cómo terminar la carrera.', entryTags: ['ataque', 'estrategia', 'confianza'], choices: [
      { id: 'attack-finish', text: 'Atacás en la última frenada.', tags: ['ataque', 'riesgo'], effects: { state: { ataque: 1 } }, nextNode: 'good-end', rewards: { xp: 20, credits: 15 } },
      { id: 'safe-finish', text: 'Cuidás la posición y cruzás la meta.', tags: ['precaucion'], effects: { state: { precaucion: 1 } }, nextNode: 'steady-end', rewards: { xp: 16, credits: 10 } },
      { id: 'mistake-finish', text: 'Forzás una maniobra imposible.', tags: ['riesgo'], requirements: { minState: { riesgo: 3 } }, effects: { state: { error: 2 } }, nextNode: 'bad-end', rewards: { xp: 5 } }
    ] },
    'good-end': { id: 'good-end', ending: 'good', title: 'Final: vuelta perfecta', text: 'Cruzás la meta con el casco lleno de tierra y una sonrisa imposible de esconder.', choices: [] },
    'steady-end': { id: 'steady-end', ending: 'funny', title: 'Final: carrera inteligente', text: 'No fue la maniobra más espectacular, pero volvés al box con la moto entera y una anécdota para repetir toda la semana.', choices: [] },
    'bad-end': { id: 'bad-end', ending: 'bad', title: 'Final: límite encontrado', text: 'La maniobra sale mal. No ganaste, pero el circuito te dejó una lección que no vas a olvidar.', choices: [] },
    finish: { id: 'finish', ending: 'good', title: 'Final: circuito completado', text: 'La jornada termina. Mirás la pista y ya pensás qué harías distinto la próxima vez.', choices: [] }
  }
};
