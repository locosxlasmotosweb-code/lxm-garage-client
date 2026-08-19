import React, { useState } from 'react';
import { saveCustomContent } from '../services/gameService';

export default function StoryAdmin({ customContent, setCustomContent, nodes, back, notify }) {
  const ids = Object.keys(nodes);
  const [nodeId, setNodeId] = useState(ids[0]);
  const node = nodes[nodeId];
  const [draft, setDraft] = useState(null);
  const active = draft || { title: node.title, text: node.text, choices: node.choices.map((choice) => ({ ...choice })) };
  const select = (id) => { setNodeId(id); setDraft(null); };
  const updateChoice = (index, text) => setDraft({ ...active, choices: active.choices.map((choice, i) => i === index ? { ...choice, text } : choice) });
  const save = () => { const next = { ...customContent, storyOverrides: { ...customContent.storyOverrides, [nodeId]: active } }; if (!saveCustomContent(next)) { notify('No se pudo guardar la historia.'); return; } setCustomContent(next); setDraft(null); notify('Nodo actualizado'); };
  return <section className="admin page"><button className="back" onClick={back}>← VOLVER A ADMIN</button><div className="admin-heading"><div><p className="eyebrow">PANEL ADMIN · HISTORIA</p><h1>EDITAR<br /><em>EL CIRCUITO</em></h1></div><p>Elegí un nodo para cambiar el texto, título y las acciones. Los destinos de las opciones se mantienen para no romper los caminos.</p></div><div className="story-admin-layout"><aside>{ids.map((id) => <button className={nodeId === id ? 'selected' : ''} onClick={() => select(id)} key={id}>{nodes[id].ending ? '★ ' : '○ '}{nodes[id].title}</button>)}</aside><section className="story-editor"><label>Título<input value={active.title} onChange={(e) => setDraft({ ...active, title: e.target.value })} /></label><label>Texto / situación<textarea value={active.text} onChange={(e) => setDraft({ ...active, text: e.target.value })} /></label><h2>ACCIONES DE ESTE NODO</h2>{active.choices.map((choice, index) => <label key={choice.id}>Opción {index + 1} <small>→ {choice.nextNode}</small><input value={choice.text} onChange={(e) => updateChoice(index, e.target.value)} /></label>)}<button className="play-button" onClick={save}>GUARDAR NODO</button></section></div></section>;
}
