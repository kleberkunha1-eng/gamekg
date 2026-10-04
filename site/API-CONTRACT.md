# API Contract — Website + Unity

Base path: `/api/v1`

## Authentication strategy

- Website: secure `HttpOnly`, `Secure`, `SameSite` session/refresh cookie. Browser requests use `credentials: include`.
- Unity client: short-lived bearer access token + refresh flow stored using a platform-appropriate secure mechanism.
- Both clients use the same Accounts table and backend authorization rules.

## Standard response

```json
{ "success": true, "data": {} }
```

Error:

```json
{
  "success": false,
  "error": { "code": "INVALID_CREDENTIALS", "message": "Invalid username or password." }
}
```

## Public endpoints

### GET /server/status
Returns status, playersOnline, onlineRecord, serverTime, version, expRate and dropRate.

### GET /news
Paginated news and events.

### GET /rankings/players
Paginated player rankings. Filters may include class, guild and name.

### GET /rankings/pvp
PvP ranking.

### GET /rankings/guilds
Guild ranking.

### GET /database/monsters
Public monster database generated from authoritative game content data.

### GET /database/items
Public item database.

### GET /shop/products
Only active public shop products.

## Auth endpoints

### POST /auth/register
Request: username, email, password.

### POST /auth/login
Request: emailOrUsername, password.

### POST /auth/refresh
Rotates/refreshes the session.

### POST /auth/logout
Revokes session/refresh token.

## Authenticated account endpoints

### GET /account/me
Account identity, status, balances intended for display and public-safe metadata.

### GET /characters
Only characters owned by the authenticated account.

### GET /characters/{id}
Ownership validated server-side.

### GET /characters/{id}/inventory
Read-only website inventory view unless a specific server-authorized action is added.

### GET /account/purchases
Purchase history.

### POST /shop/purchases
Request contains productId and an intended recipient character when needed. Price, balance, stock, eligibility and delivery are reloaded and validated by the backend. Purchase and item delivery must be transactional/idempotent.

## Administrative endpoints

Place under `/admin/*`. Require RBAC and audit logs. Never authorize based only on a client-provided role.

Suggested roles: Player, Moderator, GameMaster, Administrator, SuperAdmin.
