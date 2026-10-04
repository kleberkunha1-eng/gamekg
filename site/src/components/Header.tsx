import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { gameConfig } from '../config/game';

const links = [
  ['/', 'Home'], ['/news', 'News'], ['/ranking', 'Ranking'], ['/database', 'Database'],
  ['/shop', 'Item Shop'], ['/download', 'Download'], ['/account', 'Account'],
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="container header__inner">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand__mark">K/G</span>
          <span><b>{gameConfig.shortName}</b><small>ONLINE</small></span>
        </NavLink>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X/> : <Menu/>}</button>
        <nav className={open ? 'nav nav--open' : 'nav'}>
          {links.map(([to,label]) => <NavLink key={to} to={to} onClick={() => setOpen(false)}>{label}</NavLink>)}
          <NavLink className="button button--small" to="/login" onClick={() => setOpen(false)}>Play now</NavLink>
        </nav>
      </div>
    </header>
  );
}
