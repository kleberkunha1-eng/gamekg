import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { News } from './pages/News';
import { Ranking } from './pages/Ranking';
import { Database } from './pages/Database';
import { Shop } from './pages/Shop';
import { Download } from './pages/Download';
import { Account } from './pages/Account';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { NotFound } from './pages/NotFound';

export default function App() {
  return <Layout><Routes>
    <Route path="/" element={<Home/>}/><Route path="/news" element={<News/>}/><Route path="/ranking" element={<Ranking/>}/>
    <Route path="/database" element={<Database/>}/><Route path="/shop" element={<Shop/>}/><Route path="/download" element={<Download/>}/>
    <Route path="/account" element={<Account/>}/><Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/>
    <Route path="*" element={<NotFound/>}/>
  </Routes></Layout>;
}
