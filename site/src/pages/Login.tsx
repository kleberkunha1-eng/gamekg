import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate();
  async function submit(e: FormEvent) {
    e.preventDefault(); setError('');
    try { await api.login(id, password); nav('/account'); }
    catch (err) { setError(err instanceof Error ? err.message : 'Login failed'); }
  }
  return <section className="auth-section"><form className="auth-card" onSubmit={submit}>
    <div className="eyebrow">PLAYER ACCOUNT</div><h1>Welcome back</h1><p>Use the same account you use in the game.</p>
    <label>Username or email<input value={id} onChange={e => setId(e.target.value)} required autoComplete="username" /></label>
    <label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" /></label>
    {error && <div className="error">{error}</div>}
    <button className="button" type="submit">Login</button>
    <small>New player? <Link to="/register">Create account</Link></small>
  </form></section>;
}