import { Activity, Users } from 'lucide-react';
import { api } from '../services/api';
import { useApi } from '../hooks';
import type { ServerStatus } from '../types';

export function ServerStrip() {
  const serverStatus = useApi<ServerStatus>(() => api.getServerStatus() as Promise<ServerStatus>, { status: 'offline', playersOnline: 0, onlineRecord: 0, serverTime: '', version: '', expRate: '-', dropRate: '-' });
  return (
    <div className="server-strip">
      <div className="container server-strip__inner">
        <span className="status-pill"><span className="status-dot" /> Server {serverStatus.status}</span>
        <span><Users size={14} /> {serverStatus.playersOnline} online</span>
        <span><Activity size={14} /> Record {serverStatus.onlineRecord}</span>
        <span className="server-strip__right">EXP {serverStatus.expRate} · DROP {serverStatus.dropRate}</span>
      </div>
    </div>
  );
}