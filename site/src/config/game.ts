export const gameConfig = {
  name: 'GAME PROJECT - K/G',
  shortName: 'K/G',
  tagline: 'Forge your legend beyond the horizon.',
  description:
    'A persistent online world of exploration, guild warfare, rare loot and dangerous creatures.',
  version: '0.1.0 Alpha',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  useMocks: String(import.meta.env.VITE_USE_MOCKS ?? 'true').toLowerCase() === 'true',
  downloadUrl:
    import.meta.env.VITE_GAME_DOWNLOAD_URL || 'https://example.com/download/game-installer.exe',
  discordUrl: import.meta.env.VITE_DISCORD_URL || '#',
};
