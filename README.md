# CRM Monster (v4)

Short guide to running and developing locally.

## Quick start — current static app

This repository contains a static, vanilla-JS single-page app (the original UI) and a small Vite + React scaffold under `web/` for a gradual migration.

To run the current static app (no additional installs required):

```powershell
npm start
# open http://localhost:3000
```

Notes:
- `npm start` runs a tiny Node static server (`scripts/dev-server.js`) that serves files from the repo root and provides SPA fallback.
- To change the port in PowerShell: `$env:PORT = 4000; npm start`

## React scaffold (Vite)

A minimal Vite + React scaffold is available under `web/`. It is intentionally not installed automatically to avoid adding dependencies to the root.

To run the React scaffold:

```powershell
cd web
npm install
npm run dev
# open the URL printed by Vite (usually http://localhost:5173)
```

Files created under `web/`:
- `web/package.json` — dev scripts and dependencies for React + Vite
- `web/index.html`, `web/src/main.jsx`, `web/src/App.jsx`, `web/src/index.css`

This scaffold is the recommended starting point to migrate components incrementally.

## ApiService and authentication

The app uses a small `ApiService` wrapper at `src/api-service.js`. It is attached to `window.apiService` for the legacy UI and can be imported or adapted for the React app.

- Default behavior: if `baseUrl` is omitted when constructing `ApiService`, it defaults to `https://api.hubapi.com`.
- If you need to use a proxy or relative requests, instantiate `ApiService` with `baseUrl: ''` (the constructor honors an explicit empty string).

To configure an Authorization header for testing (do NOT commit tokens), open developer tools in your browser and run:

```javascript
// In browser console
window.apiService.headers['Authorization'] = 'Bearer <YOUR_TOKEN>'
```

Or modify instantiation in `src/api-service.js` (not recommended for secrets).

## Migration plan (high level)

1. Convert small pieces of UI to React components under `web/src` (start with stat cards and simple panels).
2. Export or rework `ApiService` for ES module imports and use React Context to provide the service to components.
3. Add linting, tests, and CI (recommended before large refactors).

If you want I can create a step-by-step migration plan and begin converting one component per change.

## Troubleshooting

- If `npm start` reports an error, ensure you have Node.js installed (v14+ recommended).
- If the React scaffold `npm install` fails, ensure your npm/node are up-to-date and run the command from the `web/` folder.
- CORS: calling HubSpot APIs directly from a local dev server may hit CORS restrictions or require proper OAuth scopes. Use a server-side proxy in production.

## Development conveniences

- A `.gitignore` has been added to ignore `node_modules/` and `web/node_modules/`.
- If you'd like, I can add an `ApiService` ES module export and update the React scaffold to import it directly.

---

If you'd like, tell me which component you want migrated first and I will prepare a Plan Card and a concrete diff to convert it to React.
