# CRM Monster v4 - AI Coding Agent Instructions

## Project Overview
CRM Monster is a single-page web application (SPA) for HubSpot CRM automation and data management. Built as a vanilla JavaScript application with no build system - it's a static site that can be opened directly in browsers or served via any static file server.

## Architecture & Core Patterns

### Single-Class Architecture
- **Main Controller**: `CRMMonster` class in `app.js` handles all application logic
- **Event-Driven**: Uses dataset attributes (`data-section`, `data-tool`, `data-action`) for declarative UI binding
- **Modal-Based Workflows**: All tool interactions happen through a centralized modal system
- **Simulated Operations**: All HubSpot operations are mocked with progress bars and realistic delays

### CSS Design System
- **CSS Custom Properties**: Extensive use of CSS variables for theming (`:root` defines 80+ design tokens)
- **Brand Colors**: 5-color palette (`--brand-navy`, `--brand-green`, `--brand-light-gray`, `--brand-salmon`, `--brand-orange`)
- **Auto Dark Mode**: Uses `@media (prefers-color-scheme: dark)` + manual `[data-color-scheme]` overrides
- **Component Classes**: BEM-like naming (`.btn--primary`, `.tool-btn`, `.stat-card`)

### Grid-Based Layout
```css
body {
  display: grid;
  grid-template-areas: 
    "header header"
    "sidebar main";
  grid-template-columns: 280px 1fr;
}
```

## Key Development Workflows

### Running the Application
```bash
# No build system - serve files directly
npx serve .
# OR open index.html directly in browser
# OR use VS Code Live Server extension
```

### CSS Architecture
- **Style Priority**: Brand colors override design system defaults in `:root`
- **Responsive Breakpoints**: Mobile-first with sidebar collapse at 768px
- **Utility Classes**: Limited set (`.flex`, `.gap-16`, `.btn--full-width`)

### JavaScript Patterns
- **Tool Registration**: Add tools to `toolConfigs` object in `executeTool()` method
- **Modal Content**: Each tool defines HTML template via `get[ToolName]Content()` methods
- **Progress Simulation**: All operations use `showProgressModal()` → `updateProgress()` → `showSuccessModal()` flow
- **State Updates**: Dashboard stats updated via `updateDashboardStats()` after operations

## Component Integration Points

### Adding New Tools
1. Add button with `data-tool="tool-name"` attribute
2. Create `getToolNameContent()` method returning HTML string
3. Add entry to `toolConfigs` object with title, content, and onExecute function
4. Implement `simulateToolName()` method for progress/completion handling

### Navigation Sections
- Sections use `data-section` attributes linked to DOM IDs
- Active states managed by toggling `.active` class
- New sections: Add nav item + corresponding section element

### Modal System
- Single modal (`#tool-modal`) handles all tool interactions
- Content injected via `showModal(title, content, onExecute)`
- Always call `this.closeModal()` after operations complete

## Critical Files & Dependencies

### Core Files
- `index.html` - Main page structure and navigation
- `app.js` - All application logic (single 1000+ line file)
- `style.css` - Complete design system (1500+ lines with CSS custom properties)

### External Dependencies
- **Font Awesome 6.4.0** (CDN) - All icons
- **FKGroteskNeue Font** (CDN) - Primary typography
- **No JavaScript frameworks** - Pure vanilla JS

### Data Flow
```javascript
User Click → Event Listener → executeTool() → showModal() → 
simulate[Operation]() → showProgressModal() → showSuccessModal()
```

## Common Patterns & Conventions

### Event Handling
```javascript
// Standard pattern for all interactive elements
document.querySelectorAll('.tool-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const tool = e.currentTarget.dataset.tool;
        this.executeTool(tool);
    });
});
```

### Mock API Responses
- All operations return realistic fake data
- Progress bars simulate processing time (200-400ms intervals)
- Success messages include specific metrics and affected record counts

### CSS Custom Property Usage
```css
/* Always use design tokens, never hardcoded values */
background-color: var(--brand-green);    /* ✓ Correct */
background-color: #0B9444;               /* ✗ Avoid */
```

## Development Guidelines

- **No Build Step**: Keep it simple - no webpack, no npm scripts beyond serving files
- **Single File Modules**: Avoid file splitting; keep related code together
- **Progressive Enhancement**: UI should work even if JavaScript fails to load
- **Mobile Responsive**: Always test grid layout collapse at 768px breakpoint
- **Consistent Simulation**: All tools should follow the same progress → success pattern

## Debugging & Testing

### Development Tools
- Browser DevTools for CSS grid inspection
- Console logging enabled throughout (`console.log` statements preserved)
- Network tab shows only CDN font/icon requests (no API calls)

### Common Issues
- Modal not appearing: Check `#tool-modal` element exists and `.hidden` class is removed
- Grid layout breaking: Verify CSS grid template areas match HTML structure
- Tool execution failing: Ensure `data-*` attributes match JavaScript selectors

## Safe Builder Mode Integration

This project includes a custom chat mode (`.github/chatmodes/safe-builder-mode.chatmode.md`) that enforces:
- Plan-first development with explicit previews
- Single-task execution with change budgets
- Manual approval before applying changes
- Complete audit trail of all modifications

When making changes, respect the modal's safety constraints and always provide clear diffs before implementation.