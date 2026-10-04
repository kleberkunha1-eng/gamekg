import type { Item, Monster, NewsItem, RankingEntry, ServerStatus, ShopProduct } from '../types';

export const serverStatus: ServerStatus = {
  status: 'online',
  playersOnline: 347,
  onlineRecord: 1284,
  serverTime: '18:42',
  version: '0.9.0 Alpha',
  expRate: '10x',
  dropRate: '5x',
};

export const news: NewsItem[] = [
  { id: 1, category: 'Update', title: 'Alpha Season: The First Tide', excerpt: 'New zones, elite enemies and the first guild progression season are now available.', date: '2026-10-04' },
  { id: 2, category: 'Event', title: 'Double Drop Weekend', excerpt: 'Rare materials have an increased drop chance across all elite zones this weekend.', date: '2026-10-03' },
  { id: 3, category: 'News', title: 'Founders Program Open', excerpt: 'Reserve your founder title and help shape the next stage of development.', date: '2026-09-28' },
  { id: 4, category: 'Maintenance', title: 'Server Maintenance Notes', excerpt: 'Database optimizations, combat fixes and improvements to matchmaking.', date: '2026-09-25' },
];

export const rankings: RankingEntry[] = [
  { rank: 1, name: 'Astra', level: 80, className: 'Vanguard', guild: 'Eclipse', power: 18420 },
  { rank: 2, name: 'Kael', level: 80, className: 'Ranger', guild: 'Northwind', power: 17980 },
  { rank: 3, name: 'Mira', level: 79, className: 'Arcanist', guild: 'Eclipse', power: 17310 },
  { rank: 4, name: 'Drex', level: 77, className: 'Berserker', guild: 'Iron Pact', power: 16840 },
  { rank: 5, name: 'Nyra', level: 76, className: 'Warden', guild: 'Northwind', power: 16505 },
  { rank: 6, name: 'Sol', level: 75, className: 'Assassin', guild: 'Noctis', power: 15920 },
  { rank: 7, name: 'Vela', level: 74, className: 'Cleric', guild: 'Dawn', power: 15455 },
  { rank: 8, name: 'Rook', level: 73, className: 'Guardian', guild: 'Iron Pact', power: 15140 },
];

const mobSvg = (label: string, accent: string) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 320"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0b1728"/><stop offset="1" stop-color="${accent}"/></linearGradient></defs><rect width="500" height="320" rx="28" fill="url(#g)"/><circle cx="250" cy="128" r="72" fill="#e8c99a" opacity=".9"/><path d="M140 286c20-76 70-112 110-112s90 36 110 112" fill="#111927"/><text x="250" y="300" text-anchor="middle" font-family="Arial" font-size="28" fill="white">${label}</text></svg>`)}`;

const itemSvg = (label: string, accent: string) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320"><defs><radialGradient id="r"><stop stop-color="${accent}"/><stop offset="1" stop-color="#07111e"/></radialGradient></defs><rect width="320" height="320" rx="34" fill="url(#r)"/><path d="M160 50l55 74-55 145-55-145z" fill="white" opacity=".8"/><text x="160" y="295" text-anchor="middle" font-family="Arial" font-size="24" fill="white">${label}</text></svg>`)}`;

export const monsters: Monster[] = [
  { id: 1, name: 'Ashfang Raider', level: 25, rarity: 'Elite', type: 'Melee', hp: 4200, damage: 310, defense: 140, location: 'Ashen Coast', drops: ['Raider Emblem', 'Iron Fang', 'Gold'], image: mobSvg('Ashfang Raider', '#7a2d2d') },
  { id: 2, name: 'Tidecaller Siren', level: 31, rarity: 'Rare', type: 'Magic', hp: 3850, damage: 420, defense: 95, location: 'Siren Shoals', drops: ['Tidal Pearl', 'Siren Silk'], image: mobSvg('Tidecaller Siren', '#144c76') },
  { id: 3, name: 'Obsidian Colossus', level: 60, rarity: 'Boss', type: 'Tank', hp: 125000, damage: 1680, defense: 940, location: 'Blackglass Citadel', drops: ['Obsidian Core', 'Colossus Plate', 'Ancient Sigil'], image: mobSvg('Obsidian Colossus', '#4d365f') },
  { id: 4, name: 'Dune Stalker', level: 18, rarity: 'Uncommon', type: 'Assassin', hp: 2200, damage: 245, defense: 70, location: 'Sunscar Desert', drops: ['Stalker Claw', 'Desert Hide'], image: mobSvg('Dune Stalker', '#7c5c2c') },
];

export const items: Item[] = [
  { id: 1, name: 'Stormglass Blade', type: 'Weapon', rarity: 'Epic', level: 45, description: 'A charged blade forged from crystallized stormglass.', image: itemSvg('Blade', '#245d8c') },
  { id: 2, name: 'Emberguard Mantle', type: 'Armor', rarity: 'Rare', level: 32, description: 'Heavy mantle that resists heat and frontal damage.', image: itemSvg('Mantle', '#7a2c24') },
  { id: 3, name: 'Wayfinder Compass', type: 'Accessory', rarity: 'Legendary', level: 1, description: 'An ancient compass that reacts to hidden routes and relics.', image: itemSvg('Compass', '#8c6b25') },
  { id: 4, name: 'Greater Recovery Tonic', type: 'Consumable', rarity: 'Uncommon', level: 12, description: 'Restores health over a short duration.', image: itemSvg('Tonic', '#276d4c') },
];

export const shop: ShopProduct[] = [
  { id: 1, name: 'Founder Armor Set', category: 'Costumes', price: 1200, currency: 'Gems', description: 'Account-bound cosmetic armor set for founders.', image: itemSvg('Founder Set', '#6b5326'), featured: true },
  { id: 2, name: 'Silverwing Mount', category: 'Mounts', price: 1800, currency: 'Gems', description: 'A swift silver-feathered mount.', image: itemSvg('Mount', '#3b506d'), featured: true },
  { id: 3, name: 'Explorer Bundle', category: 'Bundles', price: 750, currency: 'Gems', description: 'Storage expansion, cosmetic flare and travel consumables.', image: itemSvg('Bundle', '#4e3a72') },
  { id: 4, name: 'Inventory Expansion', category: 'Utility', price: 450, currency: 'Gems', description: 'Permanently unlocks additional inventory slots.', image: itemSvg('Slots', '#245f57') },
];
