import type { ReactNode } from 'react';
export function PageHero({ eyebrow, title, text, actions }: { eyebrow: string; title: string; text: string; actions?: ReactNode }) {
  return <section className="page-hero"><div className="container"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{text}</p>{actions && <div className="hero-actions">{actions}</div>}</div></section>;
}
