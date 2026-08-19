export const getLevel = (xp) => Math.floor(xp / 100) + 1;
export const getXpProgress = (xp) => xp % 100;
export function meetsRequirements(requirements, progress) {
  if (!requirements) return true;
  const hasAll = (items, owned) => !items || items.every((id) => owned.includes(id));
  if (!hasAll(requirements.cards, progress.cards) || !hasAll(requirements.bikes, progress.bikes) || !hasAll(requirements.avatars, progress.avatars)) return false;
  if (requirements.level && getLevel(progress.xp) < requirements.level) return false;
  if (requirements.decisions && !hasAll(requirements.decisions, progress.decisions)) return false;
  if (requirements.anyOf) return requirements.anyOf.some((group) => meetsRequirements(group, progress));
  return true;
}
export function applyRewards(progress, rewards = {}) {
  const unlocked = [];
  const next = { ...progress, xp: Math.max(0, progress.xp + (rewards.xp || 0)), coins: Math.max(0, progress.coins + (rewards.coins || 0)) };
  ['card', 'bike', 'avatar', 'skin', 'achievement'].forEach((type) => { if (rewards[type] && !next[`${type}s`].includes(rewards[type])) { next[`${type}s`] = [...next[`${type}s`], rewards[type]]; unlocked.push({ type, id: rewards[type] }); } });
  return { next, unlocked };
}
