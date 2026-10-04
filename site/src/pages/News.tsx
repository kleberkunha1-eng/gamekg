import { api } from '../services/api';
import { useApi } from '../hooks';
import type { NewsItem } from '../types';
import { PageHero } from '../components/PageHero';
export function News(){const news=useApi<NewsItem[]>(()=>api.getNews() as Promise<NewsItem[]>,[]); return <><PageHero eyebrow="CHRONICLE" title="News & Events" text="Updates, events, maintenance notes and important announcements."/><section className="section"><div className="container news-list">{news.map(n=><article key={n.id}><div><span className="tag">{n.category}</span><small>{n.date}</small></div><h2>{n.title}</h2><p>{n.excerpt}</p><button className="text-button">Read article →</button></article>)}</div></section></>}
