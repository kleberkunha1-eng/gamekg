import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { api, session } from '../services/api';

type Character = Awaited<ReturnType<typeof api.getCharacters>>[number];

export function Account() {
  const nav = useNavigate();
  const [me, setMe] = useState<{ username: string; email: string; status: string } | null>(null);
  const [chars, setChars] = useState<Character[]>([]);
  const logged = Boolean(session.token);

  useEffect(() => {
    if (!logged) return;
    api.getAccount().then(setMe).catch(() => nav('/login'));
    api.getCharacters().then(setChars).catch(() => { });
  }, [logged, nav]);

  if (!logged) return <><PageHero eyebrow="ACCOUNT" title="Your command center" text="Login to see your characters and account details." /><section className="section"><div className="container centered-panel"><h2>You are not logged in</h2><Link className="button" to="/login">Login</Link></div></section></>;

  async function logout() { await api.logout(); nav('/login'); }

  return <><PageHero eyebrow="ACCOUNT" title={`Welcome back, ${me?.username ?? ''}`} text="Your characters and account details." />
    <section className="section"><div className="container account-grid">
      <div className="panel"><span className="tag">CHARACTERS</span>
        {chars.length === 0 && <p>No characters yet. Download the client and create your first one.</p>}
        {chars.map(c => <div className="download-row" key={c.id}><span><b>{c.name}</b> · {c.className}</span><b>Lv {c.level} · {c.gold.toLocaleString()} gold</b></div>)}
      </div>
      <div className="panel"><h2>Account</h2>
        <div className="download-row"><span>Status</span><b>{me?.status ?? '-'}</b></div>
        <div className="download-row"><span>Email</span><b>{me?.email ?? '-'}</b></div>
        <button className="button" onClick={logout}>Logout</button>
      </div></div></section></>;
}