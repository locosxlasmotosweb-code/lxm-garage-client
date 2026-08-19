import React, { useState } from 'react';

export default function ThreadPlay({ state, registered, auth, continueGame, home }) {
  const [selected, setSelected] = useState(null);
  if (!state) return null;
  const select = (choice) => { if (!registered) { auth(); return; } setSelected(choice); };
  const followups = (selected?.followups || []).map((item) => typeof item === 'string' ? { text: item } : item);
  return <section className="story page thread-play"><button className="back" onClick={home}>← ABANDONAR HILO</button><div className="story-head"><div className="node-art">✦</div><div><p className="eyebrow">HILOS ACTIVOS · LOBBY LXM</p><h2>{selected ? 'CONSECUENCIA Y CONTINUACIÓN' : 'ELEGÍ TU PRIMER MOVIMIENTO'}</h2><div className="story-line" /></div></div>{selected ? <><article className="narrative">{selected.result || 'Tu decisión cambia el ritmo de la noche.'}</article><section className="choices"><div className="choices-title"><span>¿CÓMO SEGUÍS?</span><p>Estas tres acciones nacen de la decisión que acabás de tomar.</p></div>{followups.map((choice, index) => <button className="choice" key={`${choice.text}-${index}`} onClick={continueGame}><span className="choice-index">0{index + 1}</span><div><b>{choice.text}</b><small>Continuación de: {selected.threadTitle}</small></div><i>→</i></button>)}</section></> : <section className="choices"><div className="choices-title"><span>3 OPCIONES ALEATORIAS</span><p>Una de cada hilo activo: moto, piloto y copiloto.</p></div>{state.choices.map((choice, index) => <button className="choice" key={`${choice.text}-${index}`} onClick={() => select(choice)}><span className="choice-index">0{index + 1}</span><div><b>{choice.text}</b><small>{choice.role} · {choice.threadTitle}</small></div><i>→</i></button>)}</section>}</section>;
}
