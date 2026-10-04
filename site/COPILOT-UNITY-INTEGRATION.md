# Prompt for Copilot — Connect this website to the Unity project

Use this repository as the official frontend portal for the current Unity game.

## Goal

Analyze the existing Unity project and implement a shared backend so the website and Unity client use the same account, character, inventory, ranking, shop and server-status data.

### Required architecture

Website -> HTTPS REST API -> Database
Unity Client -> HTTPS REST API -> Database / authoritative game server

Never connect the browser or Unity directly to SQL.

## First actions

1. Inspect the Unity project before changing files.
2. Identify existing Player, Character, Health, Inventory, Item, Equipment, Currency, Level, Guild, Combat, Save and Networking systems.
3. Inspect this frontend's `src/services/api.ts`, `src/types/index.ts`, `.env.example` and pages.
4. Propose DTO mapping between Unity models and API models.
5. Do not create duplicate gameplay systems when an existing system can be adapted.

## API contract expected by this frontend

Base URL: `/api/v1`

### Auth
- POST `/auth/register`
- POST `/auth/login`
- POST `/auth/refresh`
- POST `/auth/logout`

### Account
- GET `/account/me`
- GET `/account/purchases`

### Characters
- GET `/characters`
- GET `/characters/{id}`
- GET `/characters/{id}/inventory`

### Public game data
- GET `/server/status`
- GET `/news`
- GET `/rankings/players`
- GET `/rankings/pvp`
- GET `/rankings/guilds`
- GET `/database/monsters`
- GET `/database/items`

### Shop
- GET `/shop/products`
- POST `/shop/purchases`

## Security requirements

- Password hashing server-side only.
- Access + refresh token architecture or equivalent secure session model.
- Never put database credentials or private API secrets in Unity or frontend code.
- Validate account ownership for character/inventory endpoints.
- Premium currency, gold, XP, level, inventory grants, damage, purchases and bans are server authoritative.
- Add rate limiting to authentication.
- Add RBAC for Admin/GameMaster routes.
- Add audit logs for privileged modifications.
- Use HTTPS in production.

## Unity client structure

Create a centralized API layer instead of scattering UnityWebRequest calls:

GameApiClient
- AuthService
- AccountService
- CharacterService
- InventoryService
- RankingService
- ShopService
- ServerStatusService

Use serializable DTOs and environment-specific base URLs.

## Website integration

This website currently runs with `VITE_USE_MOCKS=true`.

After API implementation:

1. Create `.env` from `.env.example`.
2. Set `VITE_API_BASE_URL`.
3. Change `VITE_USE_MOCKS=false`.
4. Match JSON DTOs to the TypeScript types in `src/types/index.ts`.
5. Replace remaining mock account/dashboard values with live endpoint calls.
6. Protect `/admin` with real authenticated RBAC.
7. Replace placeholder download URL with the launcher/game installer URL.

## Response format

Before coding, report:
- Existing Unity architecture
- Existing reusable systems
- Backend technology recommendation
- Database schema proposal
- API endpoint plan
- Exact files to create and modify

Then implement incrementally, compiling/testing after each major stage.
