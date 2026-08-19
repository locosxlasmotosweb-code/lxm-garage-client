import React, { useState } from 'react';

export default function ThreadPlay({ state, registered, auth, continueGame, home }) {
  const [selected, setSelected] = useState(null);
  const [step, setStep] = useState('choices');
  if (!state) return null;
  const select = (choice) => { if (!registered) { auth(); return; } setSelected(choice); setStep('result'); };
  const options = step === 'followups' ? selected.followups : state.choices;
  return <section className="story page thread-play"><button className="back" onClick={home}>← ABANDONAR HILO</button><div className="story-head"><div className="node-art">✦</div><div><p className="eyebrow">HILOS ACTIVOS · LOBBY LXM</p><h2>{step === 'choices' ? 'ELEGÍ TU PRIMER MOVIMIENTO' : step === 'result' ? 'CONSECUENCIA' : '¿CÓMO SEGUÍS?'}</h2><div className="story-line" /></div></div>{step === 'result' ? <article className="narrative">{selected.result || 'Tu decisión cambia el ritmo de la noche.'}</article> : <section className="choices">{options.map((choice, index) => <button className="choice" key={`${choice.text}-${index}`} onClick={() => step === 'followups' ? continueGame() : select(choice)}><span className="choice-index">0{index + 1}</span><div><b>{choice.text}</b><small>{choice.threadTitle || selected.threadTitle}</small></div><i>→</i></button>)}</section>}{step === 'result' && <div className="ending-actions"><button className="play-button" onClick={() => setStep('followups')}>VER 3 NUEVAS OPCIONES</button></div>}</section>;
}
