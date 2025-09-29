CRM Monster v4 (React + TypeScript + Tailwind)

Quick start

Requirements
- Node.js 18+ (LTS recommended)
- npm (or pnpm/yarn)

Install

```powershell
cd c:\programming\harvestroi\crm-monster-v4
npm install
```

Run dev server

```powershell
npm run dev
```

Build

```powershell
npm run build
```

Project layout
- `index.html` - app entry
- `src/` - React + TypeScript source files
- `style.css` - global styles and design tokens

Class naming conventions (searchable selectors)
- app-: top-level layout and global containers (e.g. `app-sidebar`, `app-modal`, `app-notifications`)
- tool-: tool-specific UI (e.g. `tool-button--bulk-import`, `tool-dedupe`, `tool-automation`)
- progressbar-: progress bar wrapper and fill (`progressbar`, `progressbar__fill`)
- notification-: notification items (`notification-item`, `notification-item--error`)
- tool-runner: runner UI containers (`tool-runner`, `tool-runner__status`)

Notes
- Modal currently renders inline from `AppContext` provider; if you need a portal/focus-trap I can add that next.
- If `npm run dev` fails, ensure you're running it from the repository root and that `node_modules` is present.

Troubleshooting
- If you see an ETARGET related to `tailwindcss` during `npm install`, open `package.json` and pin `tailwindcss` to a published 3.x version (e.g. `^3.4.24`).

Contact
- Created and updated by an automated assistant during migration from a vanilla JS app. If you want further changes, tell me which area to focus on next.
