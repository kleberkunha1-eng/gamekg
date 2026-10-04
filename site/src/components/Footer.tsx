import { gameConfig } from '../config/game';

export function Footer() {
  return <footer className="footer"><div className="container footer__grid">
    <div><div className="brand brand--footer"><span className="brand__mark">K/G</span><span><b>{gameConfig.shortName}</b><small>ONLINE</small></span></div><p>{gameConfig.description}</p></div>
    <div><h4>Game</h4><a href="/download">Download</a><a href="/ranking">Ranking</a><a href="/database">Database</a></div>
    <div><h4>Account</h4><a href="/login">Login</a><a href="/register">Register</a><a href="/account">Dashboard</a></div>
    <div><h4>Legal</h4><a href="#">Terms</a><a href="#">Privacy</a><a href="#">Rules</a></div>
  </div><div className="container footer__bottom">© 2026 {gameConfig.name}. All rights reserved.</div></footer>;
}
