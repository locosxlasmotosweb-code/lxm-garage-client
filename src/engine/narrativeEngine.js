const scoreTags = (wanted = [], state = {}) => wanted.reduce((total, tag) => total + Math.max(0, state[tag] || 0), 0);

export function canUse(option, session) {
  const requirements = option.requirements || {};
  if (requirements.bike && requirements.bike !== session.equipment.bike) return false;
  if (requirements.mechanic && requirements.mechanic !== session.equipment.mechanic) return false;
  if (requirements.friend && requirements.friend !== session.equipment.friend) return false;
  if ((requirements.decisions || []).some((id) => !session.decisions.includes(id))) return false;
  return Object.entries(requirements.minState || {}).every(([tag, amount]) => (session.state[tag] || 0) >= amount);
}

export function chooseVariant(node, session) {
  const variants = node.variants?.length ? node.variants : [{ text: node.text, tags: [] }];
  return [...variants].sort((a, b) => scoreTags(b.tags, session.state) - scoreTags(a.tags, session.state))[0];
}

export function selectChoices(node, session) {
  return node.choices
    .filter((choice) => canUse(choice, session))
    .map((choice) => ({ ...choice, _score: scoreTags(choice.tags, session.state) + (choice.priority || 0) + Math.random() }))
    .sort((a, b) => b._score - a._score)
    .slice(0, 3);
}

export function applyChoice(session, choice) {
  const state = { ...session.state };
  Object.entries(choice.effects?.state || {}).forEach(([tag, amount]) => { state[tag] = (state[tag] || 0) + Number(amount); });
  return { ...session, state, decisions: [...session.decisions, choice.id], rewards: { xp: session.rewards.xp + (choice.rewards?.xp || 0), credits: session.rewards.credits + (choice.rewards?.credits || 0) } };
}

export function nextNode(story, node, choice, session) {
  if (choice.nextNode) return choice.nextNode;
  const candidates = Object.values(story.nodes).filter((candidate) => candidate.id !== node.id && !session.visited.includes(candidate.id) && candidate.entryTags?.some((tag) => (session.state[tag] || 0) > 0));
  return candidates.sort((a, b) => scoreTags(b.entryTags, session.state) - scoreTags(a.entryTags, session.state))[0]?.id || story.fallbackNode || null;
}
