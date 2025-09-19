# Copilot / AI agent instructions — CRM Monster

Summary
- Small static single-page admin UI for HubSpot-like operations. No backend code or build system; files are served as static HTML/CSS/JS.

Big picture
- `app.js` contains a single `CRMMonster` class (attached to `window.crmMonster`) that drives the app: navigation, tool modals, simulated operations, and dashboard updates.
- `index.html` defines the layout: sidebar nav items use `data-section` to map to `<section id="..." class="content-section">` blocks.
- `style.css` defines visual tokens and relies on specific utility classes (`.btn--primary`, `.content-section.active`, `.stat-card`, `.tool-btn`, `.action-btn`).

What an AI agent should know (actionable)
- To add a new page/section:
  1. Add a `.nav-item` with `data-section="your-id"` in `index.html`.
  2. Add a `<section id="your-id" class="content-section">` block.
  3. No additional wiring is needed — `CRMMonster.navigateToSection` uses these attributes.

- To add a new tool/button:
  1. Add a button with `class="tool-btn" data-tool="your-tool"` (or `action-btn` for quick actions).
  2. In `app.js` extend `toolConfigs` inside `executeTool()` to include a `{ title, content, onExecute }` entry, and add a `getYourToolContent()` that returns the modal HTML string.
  3. For simulated work follow existing `simulate*` patterns: set `this.isProcessing = true`, call `showProgressModal()`, update progress, then update `hubspotData` and call `updateDashboardStats()`.

- Modal pattern:
  - Modal is `#tool-modal` with `#modal-title` and `#modal-content`. `showModal(title, content, onExecute)` sets `this.currentModal` so buttons inside templates call `window.crmMonster.executeCurrentTool()` to trigger the provided `onExecute`.

- Global state:
  - `this.hubspotData` is the in-memory source of truth for counts (contacts, deals, duplicates, workflows). Update it and call `updateDashboardStats()` to sync UI.
  - `isProcessing` blocks concurrent tool runs — respect and toggle it for any long-running operation.

Dev/run notes
- No npm or build. Run by opening `index.html` in a browser or using a static server for accurate file loading and debugging.
- Quick server (run from repo root):

```powershell
python -m http.server 3000
Start-Process "http://localhost:3000"
```

- Runtime console helpers: `window.crmMonster` is available. Example interactions:
  - `window.crmMonster.executeTool('duplicate-scanner')`
  - `window.crmMonster.hubspotData.contacts += 1; window.crmMonster.updateDashboardStats()`

Conventions & gotchas
- UI is built by template strings in `app.js`. Keep markup class names consistent with `style.css` to avoid visual regressions.
- Do not assume persistence: all data is ephemeral in-memory. If integrating a backend, add a service module and avoid embedding fetch/XHR directly inside the UI class; instead expose methods like `crmMonster.api.<action>()`.
- Accessibility: keyboard `Escape` closes modal (wired in `setupEventListeners`). New modals should preserve focus behavior similarly.

Files to inspect when changing behavior
- `app.js` — main app logic and patterns
- `index.html` — layout and selectors
- `style.css` — tokens and class names relied upon by markup

If you need more
- Tell me whether you want: a) tests added (Jest/Playwright), b) a minimal `package.json` + dev server (Node/serve), or c) a separation of UI and API layers. I will update these instructions accordingly.
