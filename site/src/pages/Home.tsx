import { ArrowRight, Crown, Database as DatabaseIcon, Download as DownloadIcon, Shield, ShoppingBag, Swords, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gameConfig } from '../config/game';
import { api } from '../services/api';
import { useApi } from '../hooks';
import type { NewsItem, RankingEntry, ServerStatus } from '../types';

export function Home() {
  const serverStatus = useApi<ServerStatus>(() => api.getServerStatus() as Promise<ServerStatus>, { status: 'offline', playersOnline: 0, onlineRecord: 0, serverTime: '', version: '', expRate: '', dropRate: '' });
  const news = useApi<NewsItem[]>(() => api.getNews() as Promise<NewsItem[]>, []);
  const rankings = useApi<RankingEntry[]>(() => api.getRankings() as Promise<RankingEntry[]>, []);
  const monsters = useApi<any[]>(() => api.getMonsters() as Promise<any[]>, []);
  return <>
    <section className="hero">
      <div className="hero__orb hero__orb--one"/><div className="hero__orb hero__orb--two"/>
      <div className="container hero__grid">
        <div className="hero__copy"><div className="eyebrow">A NEW ONLINE WORLD</div><h1>{gameConfig.tagline}</h1><p>{gameConfig.description}</p>
          <div className="hero-actions"><Link className="button" to="/register">Create account <ArrowRight size={17}/></Link><Link className="button button--ghost" to="/download"><DownloadIcon size={17}/> Download client</Link></div>
          <div className="hero__meta"><span><strong>{serverStatus.playersOnline}</strong> online now</span><span><strong>{serverStatus.onlineRecord}</strong> record</span><span><strong>{gameConfig.version}</strong> build</span></div>
        </div>
        <div className="hero-card"><div className="hero-card__badge"><Crown/> WORLD BOSS</div><div className="hero-card__art"><div className="silhouette silhouette--left"/><div className="silhouette silhouette--right"/><div className="silhouette silhouette--center"/></div><h3>Obsidian Colossus</h3><p>Blackglass Citadel · Level 60</p><div className="boss-health"><span style={{width:'68%'}}/></div><small>World event begins every 4 hours</small></div>
      </div>
    </section>

    <section className="quick-links"><div className="container quick-links__grid">
      <Link to="/ranking"><Crown/><span><b>Rankings</b><small>Top players & guilds</small></span></Link>
      <Link to="/database"><DatabaseIcon/><span><b>Game Database</b><small>Items, monsters & drops</small></span></Link>
      <Link to="/shop"><ShoppingBag/><span><b>Item Shop</b><small>Cosmetics & utilities</small></span></Link>
      <Link to="/download"><DownloadIcon/><span><b>Download</b><small>Get the latest client</small></span></Link>
    </div></section>

    <section className="section"><div className="container"><div className="section-heading"><div><div className="eyebrow">LATEST TRANSMISSIONS</div><h2>News & events</h2></div><Link to="/news">View all <ArrowRight size={16}/></Link></div>
      <div className="news-grid">{news.slice(0,3).map((n,i)=><article className={i===0?'news-card news-card--featured':'news-card'} key={n.id}><span className="tag">{n.category}</span><h3>{n.title}</h3><p>{n.excerpt}</p><small>{n.date}</small></article>)}</div>
    </div></section>

    <section className="section section--dark"><div className="container split-grid"><div><div className="eyebrow">THE WORLD</div><h2>Fight. Explore. Rise.</h2><p className="lead">Designed for progression, social play and long-term competition. The portal is already structured to read live data from the same backend used by your Unity client.</p><div className="feature-list"><div><Swords/><span><b>Action combat</b><small>Server-validated combat and progression.</small></span></div><div><Users/><span><b>Guild warfare</b><small>Rankings, territories and seasonal goals.</small></span></div><div><Shield/><span><b>Persistent economy</b><small>Items, currencies and transactions through the API.</small></span></div></div></div>
      <div className="monster-showcase">{monsters.slice(0,3).map((m:any)=><article key={m.id}><img src={m.image} alt={m.name}/><div><span className="tag">{m.rarity}</span><h3>{m.name}</h3><p>Lv. {m.level} · {m.location}</p></div></article>)}</div>
    </div></section>

    <section className="section"><div className="container ranking-preview"><div className="section-heading"><div><div className="eyebrow">HALL OF LEGENDS</div><h2>Top adventurers</h2></div><Link to="/ranking">Full ranking <ArrowRight size={16}/></Link></div>
      <div className="table-wrap"><table><thead><tr><th>#</th><th>Player</th><th>Level</th><th>Class</th><th>Guild</th><th>Power</th></tr></thead><tbody>{rankings.slice(0,5).map(p=><tr key={p.rank}><td><span className="rank-badge">{p.rank}</span></td><td><strong>{p.name}</strong></td><td>{p.level}</td><td>{p.className}</td><td>{p.guild}</td><td>{p.power.toLocaleString()}</td></tr>)}</tbody></table></div>
    </div></section>
  </>;
}
