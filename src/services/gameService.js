import { cards, bikes, avatars, skins, achievements } from '../data/catalog';
import { stories, nodes } from '../data/stories';

const KEY = 'lxm-game-progress-v1';
const CONTENT_KEY = 'lxm-game-custom-content-v1';
export const defaultProgress = { registered: false, username: '', firstName: '', lastName: '', phone: '', password: '', xp: 180, coins: 420, cards: ['secret-path', 'second-chance', 'hidden-info', 'double-or-nothing'], bikes: ['street-125', 'tornado-250'], avatars: ['rider', 'mechanic'], skins: ['neon', 'oil'], achievements: [], equipped: { bike: 'tornado-250', avatar: 'rider', copilot: 'mechanic', skin: 'neon', cards: [] }, decisions: [], completedStories: [] };
export const getProgress = () => { try { const saved = JSON.parse(localStorage.getItem(KEY)); return { ...defaultProgress, ...saved, equipped: { ...defaultProgress.equipped, ...(saved?.equipped || {}) } }; } catch { return defaultProgress; } };
export const saveProgress = (progress) => localStorage.setItem(KEY, JSON.stringify(progress));
export const resetProgress = () => { localStorage.removeItem(KEY); return defaultProgress; };
export const getCustomContent = () => {
  const empty = { cards: [], bikes: [], avatars: [], skins: [], threads: [], storyOverrides: {}, overrides: { cards: {}, bikes: {}, avatars: {}, skins: {} }, deleted: { cards: [], bikes: [], avatars: [], skins: [] }, lobbyImage: '' };
  try {
    const saved = JSON.parse(localStorage.getItem(CONTENT_KEY));
    return { ...empty, ...saved, overrides: { ...empty.overrides, ...(saved.overrides || {}) }, deleted: { ...empty.deleted, ...(saved.deleted || {}) } };
  } catch { return empty; }
};
export const saveCustomContent = (content) => {
  try { localStorage.setItem(CONTENT_KEY, JSON.stringify(content)); return true; }
  catch (error) { console.error('No se pudo guardar el contenido local', error); return false; }
};
export const gameData = { cards, bikes, avatars, skins, achievements, stories, nodes };
