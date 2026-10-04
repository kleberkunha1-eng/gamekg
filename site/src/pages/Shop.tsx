import { ShoppingCart } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { api } from '../services/api';
import { useApi } from '../hooks';
import type { ShopProduct } from '../types';

export function Shop() {
  const shop = useApi<ShopProduct[]>(() => api.getShopProducts() as Promise<ShopProduct[]>, []);
  return <><PageHero eyebrow="MARKET" title="Item Shop" text="Purchases are validated by the server and delivered to your account." />
    <section className="section"><div className="container">
      {shop.length === 0 && <div className="shop-banner"><div><span className="tag">COMING SOON</span><h2>Item Shop</h2><p>The shop is not open yet.</p></div></div>}
      <div className="catalog-grid">{shop.map(p => <article className="catalog-card shop-card" key={p.id}><img src={p.image} alt={p.name} /><div className="catalog-card__body">{p.featured && <span className="tag">Featured</span>}<h3>{p.name}</h3><p>{p.description}</p><div className="shop-card__bottom"><strong>{p.price.toLocaleString()} {p.currency}</strong><button className="icon-button" aria-label={`Buy ${p.name}`}><ShoppingCart size={18} /></button></div></div></article>)}</div>
    </div></section></>;
}