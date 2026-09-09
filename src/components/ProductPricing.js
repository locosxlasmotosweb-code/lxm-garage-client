import React, { useState } from 'react';
import { saveCustomContent } from '../services/gameService';

// Mantiene los precios junto al contenido existente (overrides), sin crear un catálogo paralelo local.
export default function ProductPricing({ catalog, customContent, setCustomContent, notify }) {
  const [kind, setKind] = useState('cards');
  const update = (item, field, value) => {
    const parsed = field === 'priceCredits' || field === 'raffleChances' ? Math.max(0, Number(value) || 0) : value;
    const next = { ...customContent, overrides: { ...customContent.overrides, [kind]: { ...customContent.overrides[kind], [item.id]: { ...(customContent.overrides[kind][item.id] || {}), [field]: parsed } } } };
    if (!saveCustomContent(next)) return notify('No se pudo guardar el precio local.');
    setCustomContent(next);
  };
  return <section className="pricing-admin"><div><p className="eyebrow">PRODUCTOS / TIENDA</p><h2>PRECIOS CONFIGURABLES</h2><small>Al publicar el producto en Supabase, estos valores se copian a la tabla <code>products</code>. La compra nunca usa este valor del navegador.</small></div><label>Contenido<select value={kind} onChange={(event) => setKind(event.target.value)}>{['cards', 'bikes', 'avatars', 'skins'].map((key) => <option value={key} key={key}>{key}</option>)}</select></label>{catalog[kind].map((item) => <article className="price-row" key={item.id}><span>{item.image ? <img src={item.image} alt="" /> : item.icon}</span><b>{item.name}</b><label>Precio<input type="number" min="0" value={item.priceCredits || 0} onChange={(event) => update(item, 'priceCredits', event.target.value)} /></label><label className="check"><input type="checkbox" checked={!!item.purchasable} onChange={(event) => update(item, 'purchasable', event.target.checked)} /> Vender</label><label className="check"><input type="checkbox" checked={item.active !== false} onChange={(event) => update(item, 'active', event.target.checked)} /> Activo</label><label className="check"><input type="checkbox" checked={!!item.isFree} onChange={(event) => update(item, 'isFree', event.target.checked)} /> Gratis</label><label>Chances<input type="number" min="0" value={item.raffleChances || 0} onChange={(event) => update(item, 'raffleChances', event.target.value)} /></label></article>)}</section>;
}
