# CRM Monster - HubSpot Automation Toolkit

A modular front-end application for HubSpot automation and data management operations.

## Features

- Dashboard with real-time statistics
- Modular toolkit architecture
- Bulk data operations
- Data quality & duplicate management
- Workflow automation
- Reporting & analytics

## Architecture

CRM Monster uses a modular toolkit architecture where each functional area is organized into a "Toolkit" containing related tools. This makes the application easy to extend with new functionality.

### Toolkit Structure

- **Toolkit**: A collection of related tools
- **Tool**: An individual operation or utility

## Adding a New Toolkit

You can easily extend the application with new toolkits:

```javascript
// Create a new toolkit class
class MyCustomToolkit extends Toolkit {
    getInfo() {
        return {
            id: 'my-toolkit',
            name: 'My Custom Toolkit',
            description: 'Custom operations for my business',
            icon: 'fas fa-star' // FontAwesome icon
        };
    }
    
    getTools() {
        return {
            'my-awesome-tool': {
                title: 'My Awesome Tool',
                content: this.getMyToolContent(),
                onExecute: () => this.runMyTool()
            }
        };
    }
    
    getMyToolContent() {
        return `
            <div class="tool-form">
                <div class="form-group">
                    <label class="form-label">Tool Parameter</label>
                    <input type="text" class="form-control" placeholder="Enter value">
                </div>
                <button class="btn--primary btn--full-width" onclick="window.crmMonster.executeCurrentTool()">
                    <i class="fas fa-rocket"></i> Run Tool
                </button>
            </div>
        `;
    }
    
    runMyTool() {
        // Implement your tool logic here
        this.crm.showSuccessModal('Tool Executed!', 'Your custom tool ran successfully.');
    }
}

// Register the toolkit with the application
window.crmMonster.registerToolkit('my-toolkit', new MyCustomToolkit(window.crmMonster));
```

### Alternative Quick Registration

You can also register a toolkit using a configuration object:

```javascript
window.crmMonster.registerToolkit('quick-toolkit', {
    name: 'Quick Toolkit',
    description: 'Quickly added toolkit',
    icon: 'fas fa-bolt',
    tools: {
        'quick-tool': {
            title: 'Quick Tool',
            content: `
                <div class="tool-form">
                    <div class="message info">
                        <i class="fas fa-info-circle"></i>
                        This is a quick tool added via configuration.
                    </div>
                    <button class="btn--primary btn--full-width" onclick="window.crmMonster.executeCurrentTool()">
                        <i class="fas fa-play"></i> Run Quick Tool
                    </button>
                </div>
            `,
            onExecute: function() {
                this.crm.showSuccessModal('Quick Tool', 'Quick tool executed!');
            }
        }
    }
});
```

## UI Integration

To add your toolkit's tools to the UI:

1. Add a navigation item in `index.html`:

```html
<div class="nav-item" data-section="my-section">
    <i class="fas fa-star"></i>
    <span>My Custom Tools</span>
</div>
```

2. Add a section in `index.html`:

```html
<section id="my-section" class="content-section">
    <div class="section-header">
        <h2><i class="fas fa-star"></i> My Custom Tools</h2>
        <p>Custom tools for specific operations</p>
    </div>
    <div class="tools-grid">
        <div class="tool-category">
            <h3><i class="fas fa-bolt"></i> My Tools</h3>
            <div class="tool-buttons">
                <button class="tool-btn" data-tool="my-toolkit:my-awesome-tool">
                    <i class="fas fa-rocket"></i>
                    My Awesome Tool
                </button>
            </div>
        </div>
    </div>
</section>
```

## Development

To start a local development server:

```bash
npm install
npm start
```

Then open http://localhost:3000 in your browser.