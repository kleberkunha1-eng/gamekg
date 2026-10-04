import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate();
  async function submit(e: FormEvent) {
    e.preventDefault(); setError('');
    try { await api.register(username, email, password); nav('/login'); }
    catch (err) { setError(err instanceof Error ? err.message : 'Registration failed'); }
  }
  return <section className="auth-section"><form className="auth-card" onSubmit={submit}>
    <div className="eyebrow">JOIN THE WORLD</div><h1>Create account</h1><p>One account for the website and the game.</p>
    <label>Username<input value={username} onChange={e => setUsername(e.target.value)} required minLength={3} maxLength={32} pattern="[a-zA-Z0-9_]+" title="Letters, numbers and _" autoComplete="username" /></label>
    <label>Email<input type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" /></label>
    <label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} autoComplete="new-password" /></label>
    {error && <div className="error">{error}</div>}
    <button className="button" type="submit">Create account</button>
    <small>Already registered? <Link to="/login">Login</Link></small>
  </form></section>;
}