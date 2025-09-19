## Copilot Project Instructions (CRM Monster v4)

Purpose: Enable AI agents to produce safe, minimal, and idiomatic changes quickly within this lightweight React (Create-React-App style) prototype that targets HubSpot APIs.

### 1. Architecture Snapshot
* Entry root: `src/app.jsx` mounts `<App />`; main logic currently lives in `src/index.js` (naming inconsistency: treat `index.js` as the actual App component file; do not introduce a duplicate `App.jsx` unless refactoring explicitly requested).
* Navigation: Hierarchical menu built recursively via `components/MenuItem.jsx` from the in-file `menuData` object inside `index.js`.
* Toolkits: Selecting a Marketing > Forms action routes to `components/FormsToolkit.jsx` (tabbed UI: Bulk vs Manual). Other actions render a placeholder.
* API layer: Inline `makeApiCall` (inside `FormsToolkit.jsx`) centralizes fetch logic (Bearer token header, JSON parsing, 204 handling). No global error boundary, no retry, no rate limit logic—keep additions local unless asked.
* Results rendering: `ResultsDisplay.jsx` prints JSON or state messages; keep responses serializable and small (avoid passing huge raw blobs without pagination if adding new endpoints).
* Styling: Single `src/styles.css` with utility-ish class names; follow existing naming (kebab-ish with semantic nouns: `.action-card`, `.results-pre`). Avoid CSS-in-JS unless specifically requested.
* Example extension pattern: `src/example-toolkit.js` demonstrates a (currently not wired) plugin registration model via `window.crmMonster.registerToolkit`. That global is NOT defined in this repo; treat file as illustrative only—do not rely on `window.crmMonster` unless implementing the host scaffold.

### 2. Runtime & Commands
Two manifests exist:
* `project.json` (acts like `package.json` for CRA) contains the real `dependencies` + scripts (`react-scripts start|build|test|eject`).
* Root `package.json` is minimal (no deps, only placeholder test script). Prefer using `project.json` scripts for local dev.
Recommended commands (PowerShell):
```
npm install         # installs deps from project.json (npm will still read it)
npm run start       # launches dev server (react-scripts)
npm run build       # production build to build/
```
Do NOT invent a custom dev server—`scripts/dev-server.js` is empty stub.

### 3. Conventions & Patterns
* Keep new API interactions inside a toolkit component; replicate the `makeApiCall` pattern (async, try/catch, set loading & error state) rather than sprinkling multiple fetch blocks.
* Shared UX: Use existing loading boolean(s) and `ResultsDisplay` instead of adding spinners elsewhere.
* State grouping: Toolkit uses grouped state primitives; if complexity grows, introduce a reducer locally (not globally) unless asked to globalize.
* Selection logic: Bulk operations rely on `Set` of IDs; follow that idiom for any new multi-select lists.
* Date formatting: Uses `new Date(...).toLocaleDateString()`; stay consistent.
* Conditional UI: Pattern is early-return blocks (`if (!selectedTool) ...` and tab toggles)—extend similarly for new toolkits.
* Error surface: Just strings in `error` state—if you add richer errors, normalize to a simple string before passing to `ResultsDisplay`.

### 4. Safe Change Boundaries
Prioritize minimal, local edits:
* Avoid renaming `index.js` / `app.jsx` without explicit request (possible inversion refactor risk).
* Do not introduce global state managers (Redux/Zustand) or network libs (Axios) unless explicitly requested; stick to native `fetch` for parity.
* No dependency additions without user instruction; current footprint is very small (React + react-scripts).
* If creating additional toolkits, place them under `src/components/` (e.g., `ContactsToolkit.jsx`) and extend `menuData` in `index.js` for entry.

### 5. Extending API Toolkits (Concrete Recipe)
1. Duplicate the structure of `FormsToolkit.jsx` (tabs optional).
2. Implement a localized `makeApiCall` or extract a tiny shared helper inside the same file (avoid premature shared modules).
3. Add actions under the proper category in `menuData` so `handleActionClick` can map the action to the new toolkit (extend its conditional logic carefully—currently only recognizes Forms).
4. Return JSON objects suitable for `JSON.stringify(data, null, 2)` (no circular refs).

### 6. Handling HubSpot API Nuances
* Include `Authorization: Bearer <token>`; token state is held in `App` (`apiToken`). Pass it as prop to any new toolkit components.
* For non-JSON 204 responses, follow existing success pattern (construct a small success object if needed) to keep UI consistent.
* If an endpoint supports pagination, start with a single-page fetch; document follow-up for pagination rather than implementing speculative loops.

### 7. Known Gaps / Leave As-Is Unless Asked
* No test harness / Jest config—do not add tests preemptively.
* No error boundary or toast system.
* Authentication token is plain input field (no secure storage).
* No form validation / schema typing.

### 8. Example Minimal Addition (Pseudocode)
```jsx
// In index.js: extend menuData
Marketing: { Forms: [...], 'Email': ['List Campaigns'] }

// In handleActionClick:
if (action === 'List Campaigns') setSelectedTool('EmailCampaigns');

// New component EmailCampaignsToolkit.jsx:
const EmailCampaignsToolkit = ({ apiToken }) => { /* mirror FormsToolkit skeleton */ };
```

### 9. Collaboration Mode Alignment
If operating in a constrained / plan-first mode (see `.github/chatmodes/safe-builder-mode.chatmode.md`), produce: scope summary → diff preview → await apply. Keep file-touch count low (≤2) for simple feature increments.

### 10. Definition of Done (Practical)
* Feature reachable via menu selection.
* Uses existing loading/error/result display paradigms.
* No unintended changes to unrelated files or styling.
* Builds with `react-scripts build` (no type or syntax errors).

---
Unclear or missing domain-specific rules? Provide feedback and this guide will be refined incrementally.
