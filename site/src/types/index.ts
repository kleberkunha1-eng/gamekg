export type ServerStatus = {
  status: 'online' | 'offline' | 'maintenance';
  playersOnline: number;
  onlineRecord: number;
  serverTime: string;
  version: string;
  expRate: string;
  dropRate: string;
};

export type NewsItem = {
  id: number;
  category: 'News' | 'Event' | 'Maintenance' | 'Update';
  title: string;
  excerpt: string;
  date: string;
};

export type RankingEntry = {
  rank: number;
  name: string;
  level: number;
  className: string;
  guild: string;
  power: number;
};

export type Monster = {
  id: number;
  name: string;
  level: number;
  rarity: 'Normal' | 'Uncommon' | 'Rare' | 'Elite' | 'Boss';
  type: string;
  hp: number;
  damage: number;
  defense: number;
  location: string;
  drops: string[];
  image: string;
};

export type Item = {
  id: number;
  name: string;
  type: string;
  rarity: string;
  level: number;
  description: string;
  image: string;
};

export type ShopProduct = {
  id: number;
  name: string;
  category: string;
  price: number;
  currency: 'Gems' | 'Credits';
  description: string;
  image: string;
  featured?: boolean;
};
