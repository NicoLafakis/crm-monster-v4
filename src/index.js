import React, { useState } from 'react';
import MenuItem from './components/MenuItem';
import FormsToolkit from './components/FormsToolkit';

// Menu data structured hierarchically.
const menuData = {
    'Marketing': {
        'Forms': ['Bulk Management', 'Manual API Tools'],
        'Marketing Events': ['Create/Update Event', 'Get Event by ID', 'Delete Event', 'Manage Attendee Subscriptions']
    },
    'Automation': {
        'Workflows': ['Get All Workflows', 'Get Workflow by ID', 'Enroll Contact', 'Unenroll Contact'],
        'Timeline Events': ['Create Template', 'Get All Templates', 'Get Template by ID', 'Update Template', 'Delete Template', 'Create Event', 'Get Event Details']
    },
    'CMS': {
        'HubDB': ['Manage Tables', 'Manage Rows', 'Publish Tables'],
        'Domains': ['Get All Domains', 'Get Domain by ID'],
        'URL Redirects': ['Get All Redirects', 'Get Redirect by ID', 'Create Redirect', 'Update Redirect', 'Delete Redirect']
    },
    'Settings & Management': {
        'Webhooks': ['Get All Subscriptions', 'Get Subscription by ID', 'Create Subscription', 'Update Subscription', 'Delete Subscription'],
        'Users': ['Get All Users', 'Get User by ID'],
        'Business Units': ['Get All Business Units', 'Get Business Units by User']
    }
};


// Main App Component
function App() {
    const [apiToken, setApiToken] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [selectedTool, setSelectedTool] = useState(null);

    const handleTokenChange = (e) => {
        const token = e.target.value;
        setApiToken(token);
        setIsConnected(!!token);
    };
    
    const handleActionClick = (action) => {
        // For now, any action within "Forms" will open the FormsToolkit.
        // This logic can be expanded for other tools.
        if (menuData.Marketing.Forms.includes(action)) {
            setSelectedTool('Forms');
        } else {
            setSelectedTool(action); // This will show the "Not Implemented" message.
        }
    };

    const renderContent = () => {
        if (!selectedTool) {
            return (
                <div className="welcome-panel">
                    <h2>Select a Tool</h2>
                    <p>Choose a tool from the navigation panel to begin executing HubSpot API calls.</p>
                </div>
            );
        }
        
        if (selectedTool === 'Forms') {
            return <FormsToolkit apiToken={apiToken} />;
        }
        
        // Placeholder for other toolkits
        return (
             <div className="welcome-panel">
                <h2>Tool Not Implemented</h2>
                <p>The tool for "{selectedTool}" has not been created yet.</p>
            </div>
        );
    };

    return (
        <div className="app-container">
            <header className="header">
                <div className="header-title">
                    <h1 className="title">CRM Monster</h1>
                    <em className="tagline">it eats your API for breakfast</em>
                </div>
                <div className="header-controls">
                    <input
                        type="password"
                        placeholder="HubSpot API Token"
                        value={apiToken}
                        onChange={handleTokenChange}
                        className="api-input"
                    />
                    <div className="connection-indicator">
                        <div className="indicator-dot" style={{ backgroundColor: isConnected ? '#27AE60' : '#E74C3C' }}></div>
                        <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
                    </div>
                    <a href="https://www.harvestroi.com" target="_blank" rel="noopener noreferrer" className="brand">
                        <span className="brand-harvest">harvest</span>
                        <span className="brand-roi">ROI</span>
                    </a>
                </div>
            </header>
            <div className="main-layout">
                <nav className="sidebar">
                    {Object.entries(menuData).map(([key, value]) => (
                        <MenuItem key={key} name={key} items={value} level={0} onActionClick={handleActionClick} />
                    ))}
                </nav>
                <main className="content">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}

export default App;
