# GAME PROJECT - K/G - Game Portal

A complete responsive frontend prepared to connect to a Unity game's backend API.

## Included pages

- Home
- News & Events
- Player Rankings
- Game Database (Monsters + Items)
- Item Shop
- Download
- Login / Register
- Account Dashboard
- Admin Dashboard

## Start locally

```bash
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:5173`.

## Mock mode

The default `.env.example` sets `VITE_USE_MOCKS=true`. This lets the full website work visually before the real API exists.

When the backend is ready:

```env
VITE_API_BASE_URL=https://api.yourgame.com/api/v1
VITE_USE_MOCKS=false
```

## Core API routes expected

- `POST /auth/login`
- `POST /auth/register`
- `POST /auth/refresh`
- `GET /account/me`
- `GET /server/status`
- `GET /news`
- `GET /rankings/players`
- `GET /rankings/pvp`
- `GET /rankings/guilds`
- `GET /database/monsters`
- `GET /database/items`
- `GET /shop/products`
- `POST /shop/purchases`
- `GET /characters`
- `GET /characters/{id}/inventory`

## Unity integration rule

Unity must never access the SQL database directly. The intended path is:

`Unity Client -> HTTPS Backend API -> Database`

The website uses the same API and same account system.

## Rename the game

Edit only `src/config/game.ts` and the `<title>` in `index.html`.

## Important production tasks

The frontend intentionally contains no database credentials, payment secrets or admin secrets. Authentication/authorization, purchase validation, currencies, inventory changes and all gameplay-critical actions must be validated by the backend/game server.
