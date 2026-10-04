import { gameConfig } from '../config/game';
import { items, monsters, news, rankings, serverStatus, shop } from '../data/mock';

const sleep = (ms = 160) => new Promise((resolve) => setTimeout(resolve, ms));
const TOKEN_KEY = 'accessToken';

export const session = {
  get token() { return localStorage.getItem(TOKEN_KEY); },
  set(token: string) { localStorage.setItem(TOKEN_KEY, token); },
  clear() { localStorage.removeItem(TOKEN_KEY); localStorage.removeItem('demoSession'); },
};

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const headers = new Headers(options?.headers);
  headers.set('Content-Type', 'application/json');
  if (session.token) headers.set('Authorization', `Bearer ${session.token}`);
  const response = await fetch(`${gameConfig.apiBaseUrl}${path}`, { ...options, headers });
  const body = await response.json().catch(() => null);
  if (!response.ok || body?.success === false) {
    if (response.status === 401) session.clear();
    throw new Error(body?.error?.message || `API ${response.status}: ${response.statusText}`);
  }
  return (body?.data ?? body) as T;
}

const mock = gameConfig.useMocks;

export const api = {
  async getServerStatus() { if (mock) { await sleep(); return serverStatus; } return request<typeof serverStatus>('/server/status'); },
  async getNews() { if (mock) { await sleep(); return news; } return request<typeof news>('/news'); },
  async getRankings() { if (mock) { await sleep(); return rankings; } return request<typeof rankings>('/rankings/players'); },
  async getMonsters() { if (mock) { await sleep(); return monsters; } return request<typeof monsters>('/database/monsters'); },
  async getItems(q = '') { if (mock) { await sleep(); return items; } return request<typeof items>(`/database/items?q=${encodeURIComponent(q)}`); },
  async getShopProducts() { if (mock) { await sleep(); return shop; } return request<typeof shop>('/shop/products'); },
  async login(emailOrUsername: string, password: string) {
    if (mock) {
      await sleep(300);
      localStorage.setItem('demoSession', '1');
      return { user: { username: emailOrUsername.split('@')[0] || 'Player', email: emailOrUsername }, accessToken: 'mock-token' };
    }
    const result = await request<{ accessToken: string; user: { username: string; email: string } }>('/auth/login', {
      method: 'POST', body: JSON.stringify({ emailOrUsername, password }),
    });
    session.set(result.accessToken);
    return result;
  },
  async register(username: string, email: string, password: string) {
    if (mock) { await sleep(300); return { ok: true }; }
    return request('/auth/register', { method: 'POST', body: JSON.stringify({ username, email, password }) });
  },
  async logout() { try { if (!mock) await request('/auth/logout', { method: 'POST' }); } finally { session.clear(); } },
  getAccount() { return request<{ username: string; email: string; status: string }>('/account/me'); },
  getCharacters() {
    return request<{ id: number; name: string; level: number; className: string; gold: number; map: string; playTime: number }[]>('/characters');
  },
};