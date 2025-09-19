// CRMMonster module (ES module) — exports CRMMonster class

/**
 * Base Toolkit class that all toolkits should extend
 */
class Toolkit {
    constructor(crmInstance) {
        this.crm = crmInstance;
    }
    
    /**
     * Get all tools provided by this toolkit
     * @returns {Object} Map of tool ID to tool configuration
     */
    getTools() {
        return {};
    }
    
    /**
     * Get information about this toolkit
     * @returns {Object} Toolkit metadata
     */
    getInfo() {
        return {
            id: 'base',
            name: 'Base Toolkit',
            description: 'Base toolkit class',
            icon: 'fas fa-toolbox'
        };
    }
}

/**
 * Contacts Toolkit - Tools for managing HubSpot contacts
 */
class ContactsToolkit extends Toolkit {
    getInfo() {
        return {
            id: 'contacts',
            name: 'Contacts Management',
            description: 'Tools for managing HubSpot contacts',
            icon: 'fas fa-users'
        };
    }
    
    getTools() {
        return {
            'bulk-contact-import': {
                title: 'Bulk Contact Import',
                content: this.getBulkImportContent(),
                onExecute: () => this.simulateBulkImport()
            },
            'bulk-contact-update': {
                title: 'Mass Update Contact Properties',
                content: this.getMassUpdateContent(),
                onExecute: () => this.simulateMassUpdate()
            },
            'contact-merge': {
                title: 'Merge Duplicate Contacts',
                content: this.getMergeContent(),
                onExecute: () => this.simulateMerge()
            }
        };
    }
    
    getBulkImportContent() {
        return `
            <div class="tool-form">
                <div class="form-group">
                    <label class="form-label">Import Type</label>
                    <select class="form-control">
                        <option>Contacts</option>
                        <option>Companies</option>
                        <option>Deals</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">CSV File</label>
                    <div class="file-upload" onclick="document.getElementById('csvFile').click()">
                        <i class="fas fa-cloud-upload-alt" style="font-size: 2rem; color: var(--brand-green); margin-bottom: 8px;"></i>
                        <p>Click to upload or drag and drop your CSV file</p>
                        <small>Supports CSV files up to 10MB</small>
                    </div>
                    <input type="file" id="csvFile" accept=".csv" style="display: none;">
                </div>
                <div class="form-group">
                    <label class="form-label">
                        <input type="checkbox" checked> Skip duplicates
                    </label>
                </div>
                <div class="form-group">
                    <label class="form-label">
                        <input type="checkbox"> Send notification email when complete
                    </label>
                </div>
                <button class="btn--primary btn--full-width" onclick="window.crmMonster.executeCurrentTool()">
                    <i class="fas fa-upload"></i> Start Import
                </button>
            </div>
        `;
    }
    
    getMassUpdateContent() {
        return `
            <div class="tool-form">
                <div class="form-group">
                    <label class="form-label">Select Records</label>
                    <select class="form-control">
                        <option>All contacts in "Marketing Qualified" list</option>
                        <option>Contacts created this month</option>
                        <option>Contacts without phone numbers</option>
                        <option>Custom filter...</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Property to Update</label>
                    <select class="form-control">
                        <option>Lead Status</option>
                        <option>Lifecycle Stage</option>
                        <option>Lead Source</option>
                        <option>Owner</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">New Value</label>
                    <input type="text" class="form-control" placeholder="Enter new value">
                </div>
                    <div class="message warning">
                    <i class="fas fa-exclamation-triangle"></i>
                    This will update the selected records. This action cannot be undone.
                </div>
                <button class="btn--primary btn--full-width" onclick="window.crmMonster.executeCurrentTool()">
                    <i class="fas fa-edit"></i> Update Records
                </button>
            </div>
        `;
    }
    
    getMergeContent() {
        return `
            <div class="tool-form">
                <div class="message info">
                    <i class="fas fa-info-circle"></i>
                    Found 47 potential duplicate contacts based on email and name matching.
                </div>
                <div class="form-group">
                    <label class="form-label">Merge Strategy</label>
                    <select class="form-control">
                        <option>Keep most recent record</option>
                        <option>Keep record with most data</option>
                        <option>Manual review required</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">
                        <input type="checkbox" checked> Preserve all activity history
                    </label>
                </div>
                <div class="form-group">
                    <label class="form-label">
                        <input type="checkbox"> Create backup before merge
                    </label>
                </div>
                <button class="btn--primary btn--full-width" onclick="window.crmMonster.executeCurrentTool()">
                    <i class="fas fa-compress-alt"></i> Start Merge Process
                </button>
            </div>
        `;
    }
    
    // Simulation methods
    simulateBulkImport() {
        this.crm.isProcessing = true;
        this.crm.showProgressModal('Bulk Import in Progress', 'Importing contacts from CSV file...');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            this.crm.updateProgress(progress);
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    this.crm.hubspotData.contacts += 2847;
                    this.crm.updateDashboardStats();
                    this.crm.showSuccessModal('Import Complete!', `Successfully imported contacts. ${this.crm.hubspotData.contacts.toLocaleString()} total contacts in your database.`);
                    this.crm.addActivity('Bulk import completed', 'Contacts imported', 'success');
                    this.crm.isProcessing = false;
                }, 500);
            }
        }, 300);
    }
    
    simulateMassUpdate() {
        this.crm.isProcessing = true;
        this.crm.showProgressModal('Mass Update in Progress', 'Updating contact properties...');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 20;
            this.crm.updateProgress(progress);
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    this.crm.showSuccessModal('Update Complete!', 'Successfully updated contact records with new property values.');
                    this.crm.addActivity('Mass update completed', 'Contacts updated', 'success');
                    this.crm.isProcessing = false;
                }, 500);
            }
        }, 200);
    }
    
    simulateMerge() {
        this.crm.isProcessing = true;
        this.crm.showProgressModal('Merge in Progress', 'Analyzing and merging duplicate records...');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 12;
            this.crm.updateProgress(progress);
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    this.crm.hubspotData.duplicates = Math.max(0, this.crm.hubspotData.duplicates - 35);
                    this.crm.hubspotData.contacts -= 35;
                    this.crm.updateDashboardStats();
                    this.crm.showSuccessModal('Merge Complete!', 'Successfully merged 35 duplicate contacts. 12 duplicates remain for manual review.');
                    this.crm.addActivity('Duplicate merge completed', '35 contacts merged', 'success');
                    this.crm.isProcessing = false;
                }, 500);
            }
        }, 400);
    }
}

/**
 * Data Quality Toolkit - Tools for data quality and duplicate management
 */
class DataQualityToolkit extends Toolkit {
    getInfo() {
        return {
            id: 'data-quality',
            name: 'Data Quality Management',
            description: 'Tools for maintaining data quality and handling duplicates',
            icon: 'fas fa-clipboard-check'
        };
    }
    
    getTools() {
        return {
            'duplicate-scanner': {
                title: 'Duplicate Scanner',
                content: this.getDuplicateScannerContent(),
                onExecute: () => this.simulateDuplicateScan()
            },
            'quality-audit': {
                title: 'Data Quality Audit',
                content: this.getQualityAuditContent(),
                onExecute: () => this.simulateQualityAudit()
            }
        };
    }
    
    getDuplicateScannerContent() {
        return `
            <div class="tool-form">
                <div class="form-group">
                    <label class="form-label">Object Type</label>
                    <select class="form-control">
                        <option>Contacts</option>
                        <option>Companies</option>
                        <option>Deals</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Matching Criteria</label>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <label><input type="checkbox" checked> Email address</label>
                        <label><input type="checkbox" checked> Full name</label>
                        <label><input type="checkbox"> Phone number</label>
                        <label><input type="checkbox"> Company name</label>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Sensitivity Level</label>
                    <select class="form-control">
                        <option>High (exact matches only)</option>
                        <option selected>Medium (fuzzy matching)</option>
                        <option>Low (broad matching)</option>
                    </select>
                </div>
                <button class="btn--primary btn--full-width" onclick="window.crmMonster.executeCurrentTool()">
                    <i class="fas fa-search"></i> Scan for Duplicates
                </button>
            </div>
        `;
    }
    
    getQualityAuditContent() {
        return `
            <div class="tool-form">
                <div class="form-group">
                    <label class="form-label">Audit Scope</label>
                    <select class="form-control">
                        <option>All data</option>
                        <option>Contacts only</option>
                        <option>Companies only</option>
                        <option>Deals only</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Quality Checks</label>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <label><input type="checkbox" checked> Missing required fields</label>
                        <label><input type="checkbox" checked> Invalid email formats</label>
                        <label><input type="checkbox" checked> Duplicate records</label>
                        <label><input type="checkbox"> Incomplete phone numbers</label>
                        <label><input type="checkbox"> Outdated information</label>
                    </div>
                </div>
                <div class="message info">
                    <i class="fas fa-info-circle"></i>
                    This audit will analyze your selected dataset. Duration depends on your selection.
                </div>
                <button class="btn--primary btn--full-width" onclick="window.crmMonster.executeCurrentTool()">
                    <i class="fas fa-clipboard-check"></i> Start Quality Audit
                </button>
            </div>
        `;
    }
    
    // Simulation methods
    simulateDuplicateScan() {
        this.crm.isProcessing = true;
        this.crm.showProgressModal('Scanning for Duplicates', 'Analyzing contact records for potential duplicates...');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 18;
            this.crm.updateProgress(progress);
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    const newDuplicates = Math.floor(Math.random() * 20) + 30;
                    this.crm.hubspotData.duplicates = newDuplicates;
                    this.crm.updateDashboardStats();
                    this.crm.showSuccessModal('Scan Complete!', `Found ${newDuplicates} potential duplicate contacts. Review and merge recommendations are ready.`);
                    this.crm.addActivity('Duplicate scan completed', `${newDuplicates} duplicates found`, 'warning');
                    this.crm.isProcessing = false;
                }, 500);
            }
        }, 250);
    }
    
    simulateQualityAudit() {
        this.crm.isProcessing = true;
        this.crm.showProgressModal('Data Quality Audit', 'Scanning records for quality issues...');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            this.crm.updateProgress(progress);
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    this.crm.showSuccessModal('Audit Complete!', 'Data quality audit finished. Review identified issues for remediation.');
                    this.crm.addActivity('Quality audit completed', 'Quality audit completed', 'warning');
                    this.crm.isProcessing = false;
                }, 500);
            }
        }, 350);
    }
}

/**
 * Workflows Toolkit - Tools for automation and workflow management
 */
class WorkflowsToolkit extends Toolkit {
    getInfo() {
        return {
            id: 'workflows',
            name: 'Workflows & Automation',
            description: 'Tools for creating and managing automation workflows',
            icon: 'fas fa-robot'
        };
    }
    
    getTools() {
        return {
            'workflow-builder': {
                title: 'Visual Workflow Builder',
                content: this.getWorkflowBuilderContent(),
                onExecute: () => this.simulateWorkflowCreation()
            },
            'api-tester': {
                title: 'HubSpot API Endpoint Tester',
                content: this.getAPITesterContent(),
                onExecute: () => this.performApiTest()
            }
        };
    }
    
    getWorkflowBuilderContent() {
        return `
            <div class="tool-form">
                <div class="form-group">
                    <label class="form-label">Workflow Name</label>
                    <input type="text" class="form-control" placeholder="e.g., Lead Nurturing Sequence">
                </div>
                <div class="form-group">
                    <label class="form-label">Trigger</label>
                    <select class="form-control">
                        <option>Contact created</option>
                        <option>Form submission</option>
                        <option>Property change</option>
                        <option>Deal stage change</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Actions</label>
                    <div class="workflow-actions">
                        <div class="action-item">
                            <i class="fas fa-envelope"></i>
                            <span>Send welcome email</span>
                            <button class="btn--outline btn--sm">Configure</button>
                        </div>
                        <div class="action-item">
                            <i class="fas fa-clock"></i>
                            <span>Wait 3 days</span>
                            <button class="btn--outline btn--sm">Edit</button>
                        </div>
                        <div class="action-item">
                            <i class="fas fa-plus"></i>
                            <span>Add action</span>
                        </div>
                    </div>
                </div>
                <button class="btn--primary btn--full-width" onclick="window.crmMonster.executeCurrentTool()">
                    <i class="fas fa-save"></i> Create Workflow
                </button>
            </div>
        `;
    }
    
    getAPITesterContent() {
        return `
            <div class="tool-form">
                <div class="form-group">
                    <label class="form-label">API Endpoint</label>
                    <select id="api-endpoint" class="form-control">
                        <option>/crm/v3/objects/contacts</option>
                        <option>/crm/v3/objects/companies</option>
                        <option>/crm/v3/objects/deals</option>
                        <option>/crm/v3/properties</option>
                        <option>/automation/v4/workflows</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">HTTP Method</label>
                    <select id="api-method" class="form-control">
                        <option>GET</option>
                        <option>POST</option>
                        <option>PATCH</option>
                        <option>DELETE</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Request Body (JSON)</label>
                    <textarea id="api-body" class="form-control" rows="6" placeholder='{"properties": {}}'></textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">Response</label>
                    <pre id="api-response" class="form-control" style="height: 160px; overflow:auto; background: var(--color-secondary); padding: 8px; border-radius:6px;"></pre>
                </div>
                <button id="api-test-btn" class="btn--primary btn--full-width" onclick="window.crmMonster.executeCurrentTool()">
                    <i class="fas fa-play"></i> Test API Call
                </button>
            </div>
        `;
    }
    
    // Simulation methods
    simulateWorkflowCreation() {
        this.crm.isProcessing = true;
        this.crm.showProgressModal('Creating Workflow', 'Setting up automation triggers and actions...');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 25;
            this.crm.updateProgress(progress);
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    this.crm.hubspotData.workflows += 1;
                    this.crm.updateDashboardStats();
                    this.crm.showSuccessModal('Workflow Created!', 'Your new workflow has been created and activated. It will begin processing contacts immediately.');
                    this.crm.addActivity('Workflow created', 'Lead nurturing sequence activated', 'success');
                    this.crm.isProcessing = false;
                }, 500);
            }
        }, 200);
    }
    
    async performApiTest() {
        const endpointEl = document.getElementById('api-endpoint');
        const methodEl = document.getElementById('api-method');
        const bodyEl = document.getElementById('api-body');
        const responseEl = document.getElementById('api-response');

        if (!endpointEl || !methodEl || !bodyEl || !responseEl) {
            console.error('API tester elements not found in modal');
            return;
        }

        const path = endpointEl.value;
        const method = methodEl.value;
        const bodyText = bodyEl.value.trim();
        let body = null;
        if (bodyText) {
            try {
                body = JSON.parse(bodyText);
            } catch (err) {
                responseEl.textContent = `Invalid JSON: ${err.message}`;
                return;
            }
        }

        responseEl.textContent = 'Running...';

        if (this.crm.api) {
            try {
                const result = await this.crm.api.request(path, { method, body });
                responseEl.textContent = JSON.stringify(result, null, 2);
            } catch (err) {
                responseEl.textContent = `Error: ${err.message}\n${err.body ? JSON.stringify(err.body, null, 2) : ''}`;
            }
        } else {
            responseEl.textContent = `API service not configured.\n\nSet an API key or OAuth token and/or a baseUrl in \`src/api-service.js\` or at runtime: \n` +
                `window.apiService.headers['Authorization'] = 'Bearer <TOKEN>';\n` +
                `// Then re-run the test.`;
        }
    }
}

/**
 * Reports Toolkit - Tools for generating reports and analytics
 */
class ReportsToolkit extends Toolkit {
    getInfo() {
        return {
            id: 'reports',
            name: 'Reports & Analytics',
            description: 'Tools for generating reports and analytics',
            icon: 'fas fa-chart-bar'
        };
    }
    
    getTools() {
        return {
            'custom-report': {
                title: 'Custom Report Builder',
                content: this.getReportBuilderContent(),
                onExecute: () => this.simulateReportGeneration()
            }
        };
    }
    
    getReportBuilderContent() {
        return `
            <div class="tool-form">
                <div class="form-group">
                    <label class="form-label">Report Type</label>
                    <select class="form-control">
                        <option>Contact Report</option>
                        <option>Deal Report</option>
                        <option>Company Report</option>
                        <option>Marketing Report</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Date Range</label>
                    <select class="form-control">
                        <option>Last 30 days</option>
                        <option>Last 90 days</option>
                        <option>This quarter</option>
                        <option>This year</option>
                        <option>Custom range</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Metrics</label>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <label><input type="checkbox" checked> Total count</label>
                        <label><input type="checkbox" checked> Created this period</label>
                        <label><input type="checkbox"> Conversion rate</label>
                        <label><input type="checkbox"> Revenue attribution</label>
                    </div>
                </div>
                <button class="btn--primary btn--full-width" onclick="window.crmMonster.executeCurrentTool()">
                    <i class="fas fa-chart-bar"></i> Generate Report
                </button>
            </div>
        `;
    }
    
    // Simulation methods
    simulateReportGeneration() {
        this.crm.isProcessing = true;
        this.crm.showProgressModal('Generating Report', 'Analyzing data and creating visualizations...');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 22;
            this.crm.updateProgress(progress);
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    this.crm.showSuccessModal('Report Generated!', 'Your custom report has been generated and saved to your reports dashboard. Email notification sent.');
                    this.crm.addActivity('Report generated', 'Contact performance report created', 'info');
                    this.crm.isProcessing = false;
                }, 500);
            }
        }, 300);
    }
}

/**
 * ToolkitManager - Manages registration and execution of toolkits
 */
class ToolkitManager {
    constructor() {
        this.toolkits = new Map();
        this.toolHandlers = new Map();
    }

    /**
     * Register a toolkit with the manager
     * @param {string} id - The unique identifier for this toolkit
     * @param {Toolkit} toolkit - The toolkit instance to register
     */
    registerToolkit(id, toolkit) {
        if (this.toolkits.has(id)) {
            console.warn(`Toolkit with ID "${id}" is already registered. Overwriting existing toolkit.`);
        }
        
        this.toolkits.set(id, toolkit);
        
        // Register each tool from this toolkit
        for (const [toolId, toolConfig] of Object.entries(toolkit.getTools())) {
            const fullyQualifiedToolId = `${id}:${toolId}`;
            this.toolHandlers.set(fullyQualifiedToolId, {
                toolkit: id,
                toolId: toolId,
                config: toolConfig
            });
            
            // For backward compatibility, also register without namespace
            // This allows existing data-tool attributes to continue working
            if (!this.toolHandlers.has(toolId)) {
                this.toolHandlers.set(toolId, {
                    toolkit: id,
                    toolId: toolId,
                    config: toolConfig
                });
            }
        }
        
        console.log(`Registered toolkit "${id}" with ${Object.keys(toolkit.getTools()).length} tools`);
        return this;
    }
    
    /**
     * Get a specific toolkit by ID
     * @param {string} id - The toolkit ID to retrieve
     * @returns {Toolkit|null} The toolkit instance or null if not found
     */
    getToolkit(id) {
        return this.toolkits.get(id) || null;
    }
    
    /**
     * Get all registered toolkits
     * @returns {Map<string, Toolkit>} Map of toolkit ID to toolkit instance
     */
    getAllToolkits() {
        return this.toolkits;
    }
    
    /**
     * Execute a specific tool by its ID
     * @param {string} toolId - The ID of the tool to execute
     * @param {object} context - The execution context (typically the CRMMonster instance)
     * @returns {boolean} Whether the tool was found and executed
     */
    executeTool(toolId, context) {
        const handler = this.toolHandlers.get(toolId);
        if (!handler) {
            console.error(`No handler registered for tool "${toolId}"`);
            return false;
        }
        
        const toolkit = this.toolkits.get(handler.toolkit);
        if (!toolkit) {
            console.error(`Toolkit "${handler.toolkit}" not found for tool "${toolId}"`);
            return false;
        }
        
        try {
            const { title, content, onExecute } = handler.config;
            
            if (typeof context.showModal === 'function') {
                context.showModal(title, content, onExecute.bind(toolkit));
                return true;
            } else {
                console.error('Context does not have a showModal method');
                return false;
            }
        } catch (error) {
            console.error(`Error executing tool "${toolId}":`, error);
            return false;
        }
    }
    
    /**
     * Show a generic tool interface for tools that don't have a specific implementation
     * @param {string} toolName - The name of the tool
     * @param {object} context - The execution context (typically the CRMMonster instance)
     */
    showGenericTool(toolName, context) {
        const title = toolName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        const content = `
            <div class="tool-form">
                <div class="message info">
                    <i class="fas fa-info-circle"></i>
                    This tool is ready to execute ${title} operations on your HubSpot data.
                </div>
                <div class="form-group">
                    <label class="form-label">Operation Parameters</label>
                    <textarea class="form-control" rows="4" placeholder="Configure your operation parameters here..."></textarea>
                </div>
                <button class="btn--primary btn--full-width" onclick="window.crmMonster.simulateGenericOperation('${toolName}')">
                    <i class="fas fa-play"></i> Execute ${title}
                </button>
            </div>
        `;
        context.showModal(title, content);
    }
}

// CRMMonster main class
class CRMMonster {
    constructor() {
        this.currentSection = 'dashboard';
        this.isProcessing = false;
        this.hubspotData = {
            contacts: 0,
            deals: 0,
            companies: 0,
            duplicates: 0,
            workflows: 0
        };

        // Service layer: small, optional integration point.
        this.api = (typeof window !== 'undefined' && window.apiService) ? window.apiService : null;
        this.currentModal = null;
        
        // Create toolkit manager and register toolkits
        this.toolkitManager = new ToolkitManager();
        this.initializeToolkits();
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupTooltips();
        this.simulateRealTimeUpdates();
        
        // Demonstrate registering a toolkit dynamically
        // In a real application, you might load these from config or plugins
        setTimeout(() => {
            // Example: Register the marketing toolkit after a delay
            // to demonstrate dynamic toolkit registration
            if (!this.toolkitManager.getToolkit('marketing')) {
                console.log('Dynamically registering Marketing Toolkit...');
                this.toolkitManager.registerToolkit('marketing', new MarketingToolkit(this));
                
                // Add a notification to show the toolkit was registered
                this.showNotification('Marketing Toolkit loaded and ready to use!', 'success');
            }
        }, 2000);
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.currentTarget.dataset.section;
                if (section) {
                    this.navigateToSection(section);
                }
            });
        });

        // Tool buttons
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const tool = e.currentTarget.dataset.tool;
                if (tool) {
                    this.executeTool(tool);
                }
            });
        });

        // Quick action buttons
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const action = e.currentTarget.dataset.action;
                if (action) {
                    this.executeQuickAction(action);
                }
            });
        });

        // Template buttons
        document.querySelectorAll('.template-card .btn--primary').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const templateName = e.currentTarget.closest('.template-card').querySelector('h4').textContent;
                this.useTemplate(templateName);
            });
        });

        // Modal functionality
        const modal = document.getElementById('tool-modal');
        if (modal) {
            const closeBtn = modal.querySelector('.modal-close');
            
            if (closeBtn) {
                closeBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.closeModal();
                });
            }

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    navigateToSection(sectionId) {
        console.log('Navigating to section:', sectionId);
        
        // Update active nav item
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const navItem = document.querySelector(`[data-section="${sectionId}"]`);
        if (navItem) {
            navItem.classList.add('active');
        }

        // Show/hide sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionId;
        } else {
            console.error('Section not found:', sectionId);
        }
    }

    executeQuickAction(action) {
        console.log('Executing quick action:', action);
        
        const actionMap = {
            'bulk-import': 'bulk-contact-import',
            'merge-duplicates': 'contact-merge',
            'create-workflow': 'workflow-builder',
            'generate-report': 'custom-report'
        };

        const tool = actionMap[action];
        if (tool) {
            this.executeTool(tool);
        } else {
            console.error('Unknown quick action:', action);
        }
    }

    /**
     * Initialize all toolkits and register them with the toolkit manager
     */
    initializeToolkits() {
        // Register the built-in toolkits
        this.toolkitManager.registerToolkit('contacts', new ContactsToolkit(this));
        this.toolkitManager.registerToolkit('data-quality', new DataQualityToolkit(this));
        this.toolkitManager.registerToolkit('workflows', new WorkflowsToolkit(this));
        this.toolkitManager.registerToolkit('reports', new ReportsToolkit(this));
        
        console.log('Registered toolkits:', [...this.toolkitManager.getAllToolkits().keys()]);
    }
    
    /**
     * Execute a tool by name
     * @param {string} toolName - The name/ID of the tool to execute
     */
    executeTool(toolName) {
        console.log('Executing tool:', toolName);
        
        if (this.isProcessing) {
            this.showNotification('Another operation is in progress. Please wait.', 'warning');
            return;
        }

        // Use the toolkit manager to execute the tool
        const executed = this.toolkitManager.executeTool(toolName, this);
        
        if (!executed) {
            this.showGenericTool(toolName);
        }
    }

    getBulkImportContent() {
        return `
            <div class="tool-form">
                <div class="form-group">
                    <label class="form-label">Import Type</label>
                    <select class="form-control">
                        <option>Contacts</option>
                        <option>Companies</option>
                        <option>Deals</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">CSV File</label>
                    <div class="file-upload" onclick="document.getElementById('csvFile').click()">
                        <i class="fas fa-cloud-upload-alt" style="font-size: 2rem; color: var(--brand-green); margin-bottom: 8px;"></i>
                        <p>Click to upload or drag and drop your CSV file</p>
                        <small>Supports CSV files up to 10MB</small>
                    </div>
                    <input type="file" id="csvFile" accept=".csv" style="display: none;">
                </div>
                <div class="form-group">
                    <label class="form-label">
                        <input type="checkbox" checked> Skip duplicates
                    </label>
                </div>
                <div class="form-group">
                    <label class="form-label">
                        <input type="checkbox"> Send notification email when complete
                    </label>
                </div>
                <button class="btn--primary btn--full-width" onclick="window.crmMonster.executeCurrentTool()">
                    <i class="fas fa-upload"></i> Start Import
                </button>
            </div>
        `;
    }

    getMassUpdateContent() {
        return `
            <div class="tool-form">
                <div class="form-group">
                    <label class="form-label">Select Records</label>
                    <select class="form-control">
                        <option>All contacts in "Marketing Qualified" list</option>
                        <option>Contacts created this month</option>
                        <option>Contacts without phone numbers</option>
                        <option>Custom filter...</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Property to Update</label>
                    <select class="form-control">
                        <option>Lead Status</option>
                        <option>Lifecycle Stage</option>
                        <option>Lead Source</option>
                        <option>Owner</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">New Value</label>
                    <input type="text" class="form-control" placeholder="Enter new value">
                </div>
                    <div class="message warning">
                    <i class="fas fa-exclamation-triangle"></i>
                    This will update the selected records. This action cannot be undone.
                </div>
                <button class="btn--primary btn--full-width" onclick="window.crmMonster.executeCurrentTool()">
                    <i class="fas fa-edit"></i> Update Records
                </button>
            </div>
        `;
    }

    getMergeContent() {
        return `
            <div class="tool-form">
                <div class="message info">
                    <i class="fas fa-info-circle"></i>
                    Found 47 potential duplicate contacts based on email and name matching.
                </div>
                <div class="form-group">
                    <label class="form-label">Merge Strategy</label>
                    <select class="form-control">
                        <option>Keep most recent record</option>
                        <option>Keep record with most data</option>
                        <option>Manual review required</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">
                        <input type="checkbox" checked> Preserve all activity history
                    </label>
                </div>
                <div class="form-group">
                    <label class="form-label">
                        <input type="checkbox"> Create backup before merge
                    </label>
                </div>
                <button class="btn--primary btn--full-width" onclick="window.crmMonster.executeCurrentTool()">
                    <i class="fas fa-compress-alt"></i> Start Merge Process
                </button>
            </div>
        `;
    }

    getDuplicateScannerContent() {
        return `
            <div class="tool-form">
                <div class="form-group">
                    <label class="form-label">Object Type</label>
                    <select class="form-control">
                        <option>Contacts</option>
                        <option>Companies</option>
                        <option>Deals</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Matching Criteria</label>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <label><input type="checkbox" checked> Email address</label>
                        <label><input type="checkbox" checked> Full name</label>
                        <label><input type="checkbox"> Phone number</label>
                        <label><input type="checkbox"> Company name</label>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Sensitivity Level</label>
                    <select class="form-control">
                        <option>High (exact matches only)</option>
                        <option selected>Medium (fuzzy matching)</option>
                        <option>Low (broad matching)</option>
                    </select>
                </div>
                <button class="btn--primary btn--full-width" onclick="window.crmMonster.executeCurrentTool()">
                    <i class="fas fa-search"></i> Scan for Duplicates
                </button>
            </div>
        `;
    }

    getWorkflowBuilderContent() {
        return `
            <div class="tool-form">
                <div class="form-group">
                    <label class="form-label">Workflow Name</label>
                    <input type="text" class="form-control" placeholder="e.g., Lead Nurturing Sequence">
                </div>
                <div class="form-group">
                    <label class="form-label">Trigger</label>
                    <select class="form-control">
                        <option>Contact created</option>
                        <option>Form submission</option>
                        <option>Property change</option>
                        <option>Deal stage change</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Actions</label>
                    <div class="workflow-actions">
                        <div class="action-item">
                            <i class="fas fa-envelope"></i>
                            <span>Send welcome email</span>
                            <button class="btn--outline btn--sm">Configure</button>
                        </div>
                        <div class="action-item">
                            <i class="fas fa-clock"></i>
                            <span>Wait 3 days</span>
                            <button class="btn--outline btn--sm">Edit</button>
                        </div>
                        <div class="action-item">
                            <i class="fas fa-plus"></i>
                            <span>Add action</span>
                        </div>
                    </div>
                </div>
                <button class="btn--primary btn--full-width" onclick="window.crmMonster.executeCurrentTool()">
                    <i class="fas fa-save"></i> Create Workflow
                </button>
            </div>
        `;
    }

    getReportBuilderContent() {
        return `
            <div class="tool-form">
                <div class="form-group">
                    <label class="form-label">Report Type</label>
                    <select class="form-control">
                        <option>Contact Report</option>
                        <option>Deal Report</option>
                        <option>Company Report</option>
                        <option>Marketing Report</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Date Range</label>
                    <select class="form-control">
                        <option>Last 30 days</option>
                        <option>Last 90 days</option>
                        <option>This quarter</option>
                        <option>This year</option>
                        <option>Custom range</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Metrics</label>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <label><input type="checkbox" checked> Total count</label>
                        <label><input type="checkbox" checked> Created this period</label>
                        <label><input type="checkbox"> Conversion rate</label>
                        <label><input type="checkbox"> Revenue attribution</label>
                    </div>
                </div>
                <button class="btn--primary btn--full-width" onclick="window.crmMonster.executeCurrentTool()">
                    <i class="fas fa-chart-bar"></i> Generate Report
                </button>
            </div>
        `;
    }

    getQualityAuditContent() {
        return `
            <div class="tool-form">
                <div class="form-group">
                    <label class="form-label">Audit Scope</label>
                    <select class="form-control">
                        <option>All data</option>
                        <option>Contacts only</option>
                        <option>Companies only</option>
                        <option>Deals only</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Quality Checks</label>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <label><input type="checkbox" checked> Missing required fields</label>
                        <label><input type="checkbox" checked> Invalid email formats</label>
                        <label><input type="checkbox" checked> Duplicate records</label>
                        <label><input type="checkbox"> Incomplete phone numbers</label>
                        <label><input type="checkbox"> Outdated information</label>
                    </div>
                </div>
                <div class="message info">
                    <i class="fas fa-info-circle"></i>
                    This audit will analyze your selected dataset. Duration depends on your selection.
                </div>
                <button class="btn--primary btn--full-width" onclick="window.crmMonster.executeCurrentTool()">
                    <i class="fas fa-clipboard-check"></i> Start Quality Audit
                </button>
            </div>
        `;
    }

    getAPITesterContent() {
        return `
            <div class="tool-form">
                <div class="form-group">
                    <label class="form-label">API Endpoint</label>
                    <select id="api-endpoint" class="form-control">
                        <option>/crm/v3/objects/contacts</option>
                        <option>/crm/v3/objects/companies</option>
                        <option>/crm/v3/objects/deals</option>
                        <option>/crm/v3/properties</option>
                        <option>/automation/v4/workflows</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">HTTP Method</label>
                    <select id="api-method" class="form-control">
                        <option>GET</option>
                        <option>POST</option>
                        <option>PATCH</option>
                        <option>DELETE</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Request Body (JSON)</label>
                    <textarea id="api-body" class="form-control" rows="6" placeholder='{"properties": {}}'></textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">Response</label>
                    <pre id="api-response" class="form-control" style="height: 160px; overflow:auto; background: var(--color-secondary); padding: 8px; border-radius:6px;"></pre>
                </div>
                <button id="api-test-btn" class="btn--primary btn--full-width" onclick="window.crmMonster.executeCurrentTool()">
                    <i class="fas fa-play"></i> Test API Call
                </button>
            </div>
        `;
    }

    // performApiTest uses the optional service layer (this.api) if available.
    async performApiTest() {
        const endpointEl = document.getElementById('api-endpoint');
        const methodEl = document.getElementById('api-method');
        const bodyEl = document.getElementById('api-body');
        const responseEl = document.getElementById('api-response');

        if (!endpointEl || !methodEl || !bodyEl || !responseEl) {
            console.error('API tester elements not found in modal');
            return;
        }

        const path = endpointEl.value;
        const method = methodEl.value;
        const bodyText = bodyEl.value.trim();
        let body = null;
        if (bodyText) {
            try {
                body = JSON.parse(bodyText);
            } catch (err) {
                responseEl.textContent = `Invalid JSON: ${err.message}`;
                return;
            }
        }

        responseEl.textContent = 'Running...';

        if (this.api) {
            try {
                const result = await this.api.request(path, { method, body });
                responseEl.textContent = JSON.stringify(result, null, 2);
            } catch (err) {
                responseEl.textContent = `Error: ${err.message}\n${err.body ? JSON.stringify(err.body, null, 2) : ''}`;
            }
        } else {
            responseEl.textContent = `API service not configured.\n\nSet an API key or OAuth token and/or a baseUrl in \`src/api-service.js\` or at runtime: \n` +
                `window.apiService.headers['Authorization'] = 'Bearer <TOKEN>';\n` +
                `// Then re-run the test.`;
        }
    }

    showGenericTool(toolName) {
        this.toolkitManager.showGenericTool(toolName, this);
    }
    
    /**
     * Register a new toolkit with the application
     * This method is exposed to allow third-party code to extend the application
     * with new toolkits
     * 
     * @param {string} id - The unique identifier for this toolkit
     * @param {Toolkit|Object} toolkitOrConfig - Either a Toolkit instance or a configuration object
     * @returns {Toolkit} The registered toolkit instance
     */
    registerToolkit(id, toolkitOrConfig) {
        // If passed a config object instead of a toolkit instance, create a new toolkit
        let toolkit = toolkitOrConfig;
        
        if (!(toolkitOrConfig instanceof Toolkit)) {
            // Create a custom toolkit from a configuration object
            const config = toolkitOrConfig;
            
            class CustomToolkit extends Toolkit {
                getInfo() {
                    return {
                        id: id,
                        name: config.name || id,
                        description: config.description || '',
                        icon: config.icon || 'fas fa-wrench'
                    };
                }
                
                getTools() {
                    return config.tools || {};
                }
            }
            
            toolkit = new CustomToolkit(this);
            
            // Attach any provided methods to the toolkit
            if (config.methods) {
                for (const [methodName, method] of Object.entries(config.methods)) {
                    toolkit[methodName] = method.bind(toolkit);
                }
            }
        }
        
        // Register the toolkit with the manager
        this.toolkitManager.registerToolkit(id, toolkit);
        
        return toolkit;
    }

    useTemplate(templateName) {
        this.showModal(`Using Template: ${templateName}`, `
            <div class="tool-form">
                <div class="message success">
                    <i class="fas fa-check-circle"></i>
                    Template "${templateName}" has been loaded and is ready for customization.
                </div>
                <div class="form-group">
                    <label class="form-label">Workflow Name</label>
                    <input type="text" class="form-control" value="${templateName}">
                </div>
                <div class="form-group">
                    <label class="form-label">Customization Options</label>
                    <textarea class="form-control" rows="4" placeholder="Customize the template parameters..."></textarea>
                </div>
                <button class="btn--primary btn--full-width" onclick="window.crmMonster.simulateTemplateDeployment('${templateName}')">
                    <i class="fas fa-rocket"></i> Deploy Template
                </button>
            </div>
        `, () => this.simulateTemplateDeployment(templateName));
    }

    showModal(title, content, onExecute = null) {
        const modal = document.getElementById('tool-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalContent = document.getElementById('modal-content');

        if (modal && modalTitle && modalContent) {
            modalTitle.textContent = title;
            modalContent.innerHTML = content;
            modal.classList.remove('hidden');

            // Store the execution function for later use
            this.currentModal = { onExecute };
        } else {
            console.error('Modal elements not found');
        }
    }

    closeModal() {
        const modal = document.getElementById('tool-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
        this.currentModal = null;
    }

    executeCurrentTool() {
        if (this.currentModal && this.currentModal.onExecute) {
            this.currentModal.onExecute();
        } else {
            console.error('No current tool to execute');
        }
    }

    // Simulation Functions
    simulateBulkImport() {
        this.isProcessing = true;
        this.showProgressModal('Bulk Import in Progress', 'Importing contacts from CSV file...');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            this.updateProgress(progress);
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    this.hubspotData.contacts += 2847;
                    this.updateDashboardStats();
                    this.showSuccessModal('Import Complete!', `Successfully imported contacts. ${this.hubspotData.contacts.toLocaleString()} total contacts in your database.`);
                    this.addActivity('Bulk import completed', 'Contacts imported', 'success');
                    this.isProcessing = false;
                }, 500);
            }
        }, 300);
    }

    simulateMassUpdate() {
        this.isProcessing = true;
        this.showProgressModal('Mass Update in Progress', 'Updating contact properties...');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 20;
            this.updateProgress(progress);
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    this.showSuccessModal('Update Complete!', 'Successfully updated contact records with new property values.');
                    this.addActivity('Mass update completed', 'Contacts updated', 'success');
                    this.isProcessing = false;
                }, 500);
            }
        }, 200);
    }

    simulateMerge() {
        this.isProcessing = true;
        this.showProgressModal('Merge in Progress', 'Analyzing and merging duplicate records...');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 12;
            this.updateProgress(progress);
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    this.hubspotData.duplicates = Math.max(0, this.hubspotData.duplicates - 35);
                    this.hubspotData.contacts -= 35;
                    this.updateDashboardStats();
                    this.showSuccessModal('Merge Complete!', 'Successfully merged 35 duplicate contacts. 12 duplicates remain for manual review.');
                    this.addActivity('Duplicate merge completed', '35 contacts merged', 'success');
                    this.isProcessing = false;
                }, 500);
            }
        }, 400);
    }

    simulateDuplicateScan() {
        this.isProcessing = true;
        this.showProgressModal('Scanning for Duplicates', 'Analyzing contact records for potential duplicates...');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 18;
            this.updateProgress(progress);
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    const newDuplicates = Math.floor(Math.random() * 20) + 30;
                    this.hubspotData.duplicates = newDuplicates;
                    this.updateDashboardStats();
                    this.showSuccessModal('Scan Complete!', `Found ${newDuplicates} potential duplicate contacts. Review and merge recommendations are ready.`);
                    this.addActivity('Duplicate scan completed', `${newDuplicates} duplicates found`, 'warning');
                    this.isProcessing = false;
                }, 500);
            }
        }, 250);
    }

    simulateWorkflowCreation() {
        this.isProcessing = true;
        this.showProgressModal('Creating Workflow', 'Setting up automation triggers and actions...');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 25;
            this.updateProgress(progress);
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    this.hubspotData.workflows += 1;
                    this.updateDashboardStats();
                    this.showSuccessModal('Workflow Created!', 'Your new workflow has been created and activated. It will begin processing contacts immediately.');
                    this.addActivity('Workflow created', 'Lead nurturing sequence activated', 'success');
                    this.isProcessing = false;
                }, 500);
            }
        }, 200);
    }

    simulateReportGeneration() {
        this.isProcessing = true;
        this.showProgressModal('Generating Report', 'Analyzing data and creating visualizations...');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 22;
            this.updateProgress(progress);
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    this.showSuccessModal('Report Generated!', 'Your custom report has been generated and saved to your reports dashboard. Email notification sent.');
                    this.addActivity('Report generated', 'Contact performance report created', 'info');
                    this.isProcessing = false;
                }, 500);
            }
        }, 300);
    }

    simulateQualityAudit() {
        this.isProcessing = true;
        this.showProgressModal('Data Quality Audit', 'Scanning records for quality issues...');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            this.updateProgress(progress);
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    this.showSuccessModal('Audit Complete!', 'Data quality audit finished. Review identified issues for remediation.');
                    this.addActivity('Quality audit completed', 'Quality audit completed', 'warning');
                    this.isProcessing = false;
                }, 500);
            }
        }, 350);
    }

    simulateAPITest() {
        this.isProcessing = true;
        this.showProgressModal('Testing API Endpoint', 'Sending request to HubSpot API...');

        // If a real ApiService is available, use it; otherwise fall back to simulated response.
        if (this.api) {
            // Try a simple test call to contacts endpoint
            this.api.testEndpoint('/crm/v3/objects/contacts')
                .then((data) => {
                    this.showSuccessModal('API Test Successful!', `
                        <div style="text-align: left;">
                            <p><strong>Status:</strong> 200 OK</p>
                            <p><strong>Response:</strong></p>
                            <pre style="background: #f5f5f5; padding: 10px; border-radius: 4px; font-size: 12px;">${JSON.stringify(data, null, 2)}</pre>
                        </div>
                    `);
                })
                .catch((err) => {
                    this.showSuccessModal('API Test Error', `
                        <div style="text-align: left; color: var(--color-error);">
                            <p><strong>Error:</strong> ${err.message}</p>
                            <pre style="background: #fef2f2; padding: 10px; border-radius: 4px; font-size: 12px;">${err.body ? JSON.stringify(err.body, null, 2) : ''}</pre>
                        </div>
                    `);
                })
                .finally(() => {
                    this.isProcessing = false;
                });
        } else {
            this.showSuccessModal('API Not Configured', `
                <div style="text-align: left; color: var(--color-warning);">
                    <p>The HubSpot API is not configured for live requests.</p>
                    <p>To enable live API calls, set an Authorization header for <code>window.apiService</code>:</p>
                    <pre style="background: #fff7ed; padding: 8px; border-radius:4px;">window.apiService.headers['Authorization'] = 'Bearer &lt;YOUR_TOKEN&gt;';</pre>
                    <p>Or edit <code>src/api-service.js</code> to provide credentials and a baseUrl. No secrets are stored in the repo.</p>
                </div>
            `);
            this.isProcessing = false;
        }
    }

    simulateGenericOperation(toolName) {
        this.isProcessing = true;
        const operationName = toolName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        this.showProgressModal(`${operationName} in Progress`, `Executing ${operationName} operation...`);
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 20;
            this.updateProgress(progress);
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    this.showSuccessModal(`${operationName} Complete!`, `${operationName} operation has been executed successfully.`);
                    this.addActivity(`${operationName} completed`, 'Operation executed successfully', 'success');
                    this.isProcessing = false;
                }, 500);
            }
        }, 250);
    }

    simulateTemplateDeployment(templateName) {
        this.isProcessing = true;
        this.showProgressModal('Deploying Template', `Setting up ${templateName} workflow...`);
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 30;
            this.updateProgress(progress);
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    this.hubspotData.workflows += 1;
                    this.updateDashboardStats();
                    this.showSuccessModal('Template Deployed!', `${templateName} has been successfully deployed and is now active.`);
                    this.addActivity('Template deployed', `${templateName} workflow activated`, 'success');
                    this.isProcessing = false;
                }, 500);
            }
        }, 200);
    }

    showProgressModal(title, message) {
        const content = `
            <div class="loading">
                <div class="spinner"></div>
                <span>${message}</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: 0%"></div>
            </div>
            <div id="progress-text">0%</div>
        `;
        this.showModal(title, content);
    }

    updateProgress(progress) {
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.getElementById('progress-text');
        
        if (progressFill && progressText) {
            const clampedProgress = Math.min(100, progress);
            progressFill.style.width = `${clampedProgress}%`;
            progressText.textContent = `${Math.round(clampedProgress)}%`;
        }
    }

    showSuccessModal(title, message) {
        const content = `
            <div class="message success">
                <i class="fas fa-check-circle"></i>
                ${message}
            </div>
            <button class="btn--primary btn--full-width" onclick="window.crmMonster.closeModal()">
                <i class="fas fa-check"></i> Close
            </button>
        `;
        this.showModal(title, content);
    }

    updateDashboardStats() {
        const statsMap = {
            contacts: this.hubspotData.contacts,
            deals: this.hubspotData.deals,
            duplicates: this.hubspotData.duplicates,
            workflows: this.hubspotData.workflows
        };

        document.querySelectorAll('.stat-card').forEach((card, index) => {
            const h3 = card.querySelector('h3');
            if (h3) {
                const keys = Object.keys(statsMap);
                if (keys[index]) {
                    h3.textContent = statsMap[keys[index]].toLocaleString();
                }
            }
        });
    }

    addActivity(title, description, type) {
        const activityList = document.querySelector('.activity-list');
        if (!activityList) return;

        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="activity-icon ${type}">
                <i class="fas fa-${type === 'success' ? 'check' : type === 'warning' ? 'exclamation' : 'info'}"></i>
            </div>
            <div class="activity-content">
                <p><strong>${title}</strong></p>
                <span>${description}</span>
                <time>Just now</time>
            </div>
        `;

        activityList.insertBefore(activityItem, activityList.firstChild);

        // Keep only the latest 5 activities
        while (activityList.children.length > 5) {
            activityList.removeChild(activityList.lastChild);
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `message ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 2000;
            max-width: 400px;
            animation: slideInRight 0.3s ease-out;
        `;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : type === 'error' ? 'times-circle' : 'info-circle'}"></i>
            ${message}
        `;

        document.body.appendChild(notification);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    setupTooltips() {
        // Add tooltips to various elements
        const tooltipElements = [
            { selector: '.notification-btn', text: 'View notifications and alerts' },
            { selector: '.stat-card', text: 'Click for detailed breakdown' },
            { selector: '.tool-btn', text: 'Click to launch this tool' }
        ];

        tooltipElements.forEach(({ selector, text }) => {
            document.querySelectorAll(selector).forEach(el => {
                el.setAttribute('data-tooltip', text);
                el.classList.add('tooltip');
            });
        });
    }

    simulateRealTimeUpdates() {
        // Simulate real-time data updates every 30 seconds
        setInterval(() => {
            // Randomly update some stats
            if (Math.random() > 0.7) {
                this.hubspotData.contacts += Math.floor(Math.random() * 5);
                this.updateDashboardStats();
            }
            
            if (Math.random() > 0.8) {
                this.hubspotData.deals += Math.floor(Math.random() * 3);
                this.updateDashboardStats();
            }
        }, 30000);
    }
}

// CSS Animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .workflow-actions {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-base);
        padding: var(--space-16);
    }
    
    .action-item {
        display: flex;
        align-items: center;
        gap: var(--space-12);
        padding: var(--space-8) 0;
        border-bottom: 1px solid var(--color-border);
    }
    
    .action-item:last-child {
        border-bottom: none;
    }
    
    .action-item i {
        color: var(--brand-green);
        width: 20px;
    }
    
    .action-item span {
        flex: 1;
    }
`;
document.head.appendChild(style);

/**
 * Example of how to create a new toolkit
 * This can be placed in a separate file and imported
 */
class MarketingToolkit extends Toolkit {
    getInfo() {
        return {
            id: 'marketing',
            name: 'Marketing Tools',
            description: 'Tools for managing marketing campaigns and assets',
            icon: 'fas fa-bullhorn'
        };
    }
    
    getTools() {
        return {
            'campaign-manager': {
                title: 'Campaign Manager',
                content: this.getCampaignManagerContent(),
                onExecute: () => this.simulateCampaignCreation()
            },
            'email-designer': {
                title: 'Email Template Designer',
                content: this.getEmailDesignerContent(),
                onExecute: () => this.simulateEmailDesign()
            }
        };
    }
    
    getCampaignManagerContent() {
        return `
            <div class="tool-form">
                <div class="form-group">
                    <label class="form-label">Campaign Name</label>
                    <input type="text" class="form-control" placeholder="Summer Promotion 2025">
                </div>
                <div class="form-group">
                    <label class="form-label">Campaign Type</label>
                    <select class="form-control">
                        <option>Email Campaign</option>
                        <option>Social Media Campaign</option>
                        <option>Paid Advertising</option>
                        <option>Multi-channel Campaign</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Duration</label>
                    <div style="display: flex; gap: 10px;">
                        <input type="date" class="form-control" style="flex: 1;">
                        <span style="align-self: center;">to</span>
                        <input type="date" class="form-control" style="flex: 1;">
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Target Audience</label>
                    <select class="form-control">
                        <option>All Contacts</option>
                        <option>Marketing Qualified Leads</option>
                        <option>Customer Segment A</option>
                        <option>Customer Segment B</option>
                    </select>
                </div>
                <button class="btn--primary btn--full-width" onclick="window.crmMonster.executeCurrentTool()">
                    <i class="fas fa-rocket"></i> Create Campaign
                </button>
            </div>
        `;
    }
    
    getEmailDesignerContent() {
        return `
            <div class="tool-form">
                <div class="form-group">
                    <label class="form-label">Email Template Name</label>
                    <input type="text" class="form-control" placeholder="Welcome Series - Email 1">
                </div>
                <div class="form-group">
                    <label class="form-label">Template Type</label>
                    <select class="form-control">
                        <option>Newsletter</option>
                        <option>Promotional</option>
                        <option>Welcome Email</option>
                        <option>Transactional</option>
                        <option>Blank</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Subject Line</label>
                    <input type="text" class="form-control" placeholder="Welcome to our community!">
                </div>
                <div class="form-group">
                    <label class="form-label">Preview Text</label>
                    <input type="text" class="form-control" placeholder="Get started with these helpful resources...">
                </div>
                <div class="message info">
                    <i class="fas fa-info-circle"></i>
                    The visual email editor will open after clicking the button below.
                </div>
                <button class="btn--primary btn--full-width" onclick="window.crmMonster.executeCurrentTool()">
                    <i class="fas fa-paint-brush"></i> Design Email
                </button>
            </div>
        `;
    }
    
    // Simulation methods
    simulateCampaignCreation() {
        this.crm.isProcessing = true;
        this.crm.showProgressModal('Creating Campaign', 'Setting up your campaign...');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 20;
            this.crm.updateProgress(progress);
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    this.crm.showSuccessModal('Campaign Created!', 'Your marketing campaign has been created successfully. You can now manage it from the campaigns dashboard.');
                    this.crm.addActivity('Campaign created', 'New marketing campaign created', 'success');
                    this.crm.isProcessing = false;
                }, 500);
            }
        }, 250);
    }
    
    simulateEmailDesign() {
        this.crm.isProcessing = true;
        this.crm.showProgressModal('Opening Email Designer', 'Loading email template editor...');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 25;
            this.crm.updateProgress(progress);
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    this.crm.showSuccessModal('Email Template Created!', 'Your email template has been created and saved to your template library.');
                    this.crm.addActivity('Email template created', 'New email template designed', 'success');
                    this.crm.isProcessing = false;
                }, 500);
            }
        }, 200);
    }
}

/**
 * Example of how to register a new toolkit at runtime:
 *
 * // Create and register a new toolkit
 * window.crmMonster.toolkitManager.registerToolkit(
 *   'marketing', 
 *   new MarketingToolkit(window.crmMonster)
 * );
 *
 * // Then you can use the tool with:
 * window.crmMonster.executeTool('marketing:campaign-manager');
 */

// Export the class as the default export for module consumers
export default CRMMonster;
