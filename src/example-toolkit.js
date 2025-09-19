/**
 * Example Toolkit - Demonstrates how to create a new toolkit in a separate file
 * 
 * To use this toolkit:
 * 1. Import this file in your HTML: <script type="module" src="src/example-toolkit.js"></script>
 * 2. Or import it in your JavaScript: import './example-toolkit.js';
 */

// This toolkit will automatically register itself when imported
(function() {
    // Wait for CRMMonster to be available
    function initializeToolkit() {
        if (!window.crmMonster) {
            // Try again in 100ms if CRMMonster isn't loaded yet
            setTimeout(initializeToolkit, 100);
            return;
        }
        
        // Create the toolkit
        class ExampleToolkit {
            constructor(crm) {
                this.crm = crm;
            }
            
            getInfo() {
                return {
                    id: 'example',
                    name: 'Example Toolkit',
                    description: 'Example toolkit loaded from a separate file',
                    icon: 'fas fa-flask'
                };
            }
            
            getTools() {
                return {
                    'example-tool-one': {
                        title: 'Example Tool One',
                        content: this.getToolOneContent(),
                        onExecute: () => this.runToolOne()
                    },
                    'example-tool-two': {
                        title: 'Example Tool Two',
                        content: this.getToolTwoContent(),
                        onExecute: () => this.runToolTwo()
                    }
                };
            }
            
            getToolOneContent() {
                return `
                    <div class="tool-form">
                        <div class="message info">
                            <i class="fas fa-info-circle"></i>
                            This is Example Tool One from the dynamically loaded toolkit.
                        </div>
                        <div class="form-group">
                            <label class="form-label">Sample Input</label>
                            <input type="text" class="form-control" placeholder="Enter sample value">
                        </div>
                        <button class="btn--primary btn--full-width" onclick="window.crmMonster.executeCurrentTool()">
                            <i class="fas fa-play"></i> Run Example Tool One
                        </button>
                    </div>
                `;
            }
            
            getToolTwoContent() {
                return `
                    <div class="tool-form">
                        <div class="message success">
                            <i class="fas fa-check-circle"></i>
                            This is Example Tool Two from the dynamically loaded toolkit.
                        </div>
                        <div class="form-group">
                            <label class="form-label">Select an Option</label>
                            <select class="form-control">
                                <option>Option A</option>
                                <option>Option B</option>
                                <option>Option C</option>
                            </select>
                        </div>
                        <button class="btn--primary btn--full-width" onclick="window.crmMonster.executeCurrentTool()">
                            <i class="fas fa-play"></i> Run Example Tool Two
                        </button>
                    </div>
                `;
            }
            
            runToolOne() {
                this.crm.isProcessing = true;
                this.crm.showProgressModal('Running Example Tool One', 'Processing your request...');
                
                let progress = 0;
                const interval = setInterval(() => {
                    progress += Math.random() * 20;
                    this.crm.updateProgress(progress);
                    
                    if (progress >= 100) {
                        clearInterval(interval);
                        setTimeout(() => {
                            this.crm.showSuccessModal('Example Tool One Complete!', 'Your operation completed successfully.');
                            this.crm.addActivity('Example operation', 'Example Tool One executed', 'success');
                            this.crm.isProcessing = false;
                        }, 500);
                    }
                }, 250);
            }
            
            runToolTwo() {
                this.crm.isProcessing = true;
                this.crm.showProgressModal('Running Example Tool Two', 'Processing your request...');
                
                let progress = 0;
                const interval = setInterval(() => {
                    progress += Math.random() * 25;
                    this.crm.updateProgress(progress);
                    
                    if (progress >= 100) {
                        clearInterval(interval);
                        setTimeout(() => {
                            this.crm.showSuccessModal('Example Tool Two Complete!', 'Your operation completed successfully.');
                            this.crm.addActivity('Example operation', 'Example Tool Two executed', 'info');
                            this.crm.isProcessing = false;
                        }, 500);
                    }
                }, 200);
            }
        }
        
        // Register the toolkit with CRMMonster
        // The Toolkit base class will be automatically applied
        window.crmMonster.registerToolkit('example', new ExampleToolkit(window.crmMonster));
        console.log('Example Toolkit registered successfully!');
    }
    
    // Start initialization
    initializeToolkit();
})();