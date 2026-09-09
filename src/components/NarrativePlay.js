import React, { useMemo, useState } from 'react';
import { applyChoice, chooseVariant, nextNode, selectChoices } from '../engine/narrativeEngine';

export default function NarrativePlay({ story, playerName, equipment, onFinish, leave }) {
  const [session, setSession] = useState({ nodeId: story.startNode, state: {}, decisions: [], visited: [], equipment, rewards: { xp: 0, credits: 0 } });
  const node = story.nodes[session.nodeId];
  const variant = useMemo(() => node && chooseVariant(node, session), [node, session]);
  const choices = useMemo(() => node && selectChoices(node, session), [node, session]);
  if (!node) return <section className="story page"><p className="empty">Esta historia no tiene un nodo inicial válido.</p><button className="secondary" onClick={leave}>VOLVER</button></section>;
  if (node.ending) return <section className="ending page"><div className={`ending-medal ${node.ending}`}>🏁</div><p className="eyebrow">{node.ending.toUpperCase()}</p><h1>{node.title}</h1><p className="ending-text">{node.text.replaceAll('{player}', playerName || 'Piloto')}</p><div className="reward-summary"><div><b>+{session.rewards.xp}</b><span>XP</span></div><div><b>◉ {session.rewards.credits}</b><span>CRÉDITOS</span></div><div><b>{session.decisions.length}</b><span>DECISIONES</span></div></div><button className="play-button" onClick={() => onFinish(session)}>VOLVER AL GARAGE</button></section>;
  const choose = (choice) => { const next = applyChoice({ ...session, visited: [...session.visited, node.id] }, choice); const nextId = nextNode(story, node, choice, next); setSession({ ...next, nodeId: nextId || 'finish' }); };
  return <section className="story page"><button className="back" onClick={leave}>← ABANDONAR HISTORIA</button><div className="story-head"><div className="node-art">🏁</div><div><p className="eyebrow">{node.location || story.title}</p><h2>{node.title}</h2><div className="story-line" /></div></div><article className="narrative">{(variant?.text || node.text).replaceAll('{player}', playerName || 'Piloto')}</article><section className="choices"><div className="choices-title"><span>¿QUÉ HACÉS?</span><p>Tus decisiones modifican el estado de la partida.</p></div>{choices.map((choice, index) => <button className="choice" key={choice.id} onClick={() => choose(choice)}><span className="choice-index">0{index + 1}</span><div><b>{choice.text}</b><small>{choice.tags?.join(' · ') || 'DECISIÓN'}</small></div><i>→</i></button>)}</section></section>;
}
