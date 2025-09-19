import React, { useState, useEffect, useCallback } from 'react';
import ResultsDisplay from './ResultsDisplay';

// Main FormsToolkit Component
const FormsToolkit = ({ apiToken }) => {
    const [activeTab, setActiveTab] = useState('bulk');
    const [allForms, setAllForms] = useState([]);
    const [loadingForms, setLoadingForms] = useState(false);
    const [selectedFormIds, setSelectedFormIds] = useState(new Set());

    // State for the Manual Tools Tab
    const [manualFormId, setManualFormId] = useState('');
    const [formPayload, setFormPayload] = useState('{\n  "name": "New Example Form",\n  "submitText": "Submit",\n  "fields": []\n}');
    
    // Generic API states
    const [responseData, setResponseData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Centralized API call handler
    const makeApiCall = useCallback(async (endpoint, method = 'GET', body = null, isInitialLoad = false) => {
        const targetLoader = isInitialLoad ? setLoadingForms : setLoading;
        targetLoader(true);
        setError(null);
        setResponseData(null);
        
        if (!apiToken) {
            setError("API Token is not set.");
            targetLoader(false);
            return null;
        }

        try {
            // In a real app, this URL should be proxied to avoid CORS issues.
            const response = await fetch(`https://api.hubapi.com${endpoint}`, {
                method,
                headers: { 'Authorization': `Bearer ${apiToken}`, 'Content-Type': 'application/json' },
                body: body ? JSON.stringify(body) : null
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            
            if (response.status === 204) {
                 const successMsg = { status: 'Success', message: `Operation successful for endpoint: ${endpoint}` };
                 if(!isInitialLoad) setResponseData(successMsg);
                 return successMsg;
            } 
            
            const data = await response.json();
            if(!isInitialLoad) setResponseData(data);
            return data;

        } catch (e) {
            setError(e.message);
            return null;
        } finally {
            targetLoader(false);
        }
    }, [apiToken]);
    
    const fetchAllForms = useCallback(() => {
        makeApiCall('/marketing/v3/forms', 'GET', null, true).then(data => {
            if (data && data.results) {
                setAllForms(data.results);
            }
        });
    }, [makeApiCall]);

    // Fetch all forms on component mount
    useEffect(() => {
        if (apiToken) {
            fetchAllForms();
        }
    }, [apiToken, fetchAllForms]);

    const handleSelectForm = (formId) => {
        const newSelection = new Set(selectedFormIds);
        if (newSelection.has(formId)) {
            newSelection.delete(formId);
        } else {
            newSelection.add(formId);
        }
        setSelectedFormIds(newSelection);
    };
    
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedFormIds(new Set(allForms.map(f => f.id)));
        } else {
            setSelectedFormIds(new Set());
        }
    };
    
    const handleExportDefinitions = () => {
        const selectedData = allForms.filter(form => selectedFormIds.has(form.id));
        setResponseData(selectedData);
        setError(null);
    };

    const handleExportSubmissions = async () => {
        setLoading(true);
        setError(null);
        const submissionsPromises = Array.from(selectedFormIds).map(id => 
            makeApiCall(`/marketing/v3/forms/${id}/submissions`)
        );
        const results = await Promise.all(submissionsPromises);
        setResponseData(results.reduce((acc, curr, index) => {
            const formId = Array.from(selectedFormIds)[index];
            acc[formId] = curr;
            return acc;
        }, {}));
        setLoading(false);
    };
    
    const handleBulkArchive = async () => {
        setLoading(true);
        setError(null);
        const archivePromises = Array.from(selectedFormIds).map(id =>
            makeApiCall(`/marketing/v3/forms/${id}`, 'DELETE')
        );
        await Promise.all(archivePromises);
        setLoading(false);
        setSelectedFormIds(new Set());
        fetchAllForms(); // Refresh the list after archiving
    };

    const renderBulkManager = () => (
        <>
            <div className="action-card">
                <h3>Bulk Actions</h3>
                <p>{selectedFormIds.size} form(s) selected.</p>
                <div className="button-group">
                    <button className="button" onClick={handleExportDefinitions} disabled={selectedFormIds.size === 0}>Export Definitions</button>
                    <button className="button" onClick={handleExportSubmissions} disabled={selectedFormIds.size === 0}>Export Submissions</button>
                    <button className="button delete-button" onClick={handleBulkArchive} disabled={selectedFormIds.size === 0}>Archive Selected</button>
                </div>
            </div>
            <div className="action-card" style={{maxHeight: '50vh', overflowY: 'auto'}}>
                 <table className="table">
                    <thead>
                        <tr>
                            <th className="th"><input type="checkbox" onChange={handleSelectAll} checked={selectedFormIds.size === allForms.length && allForms.length > 0} /></th>
                            <th className="th">Form Name</th>
                            <th className="th">Form ID</th>
                            <th className="th">Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loadingForms ? (<tr><td colSpan="4">Loading forms...</td></tr>) : allForms.map(form => (
                            <tr key={form.id}>
                                <td className="td"><input type="checkbox" checked={selectedFormIds.has(form.id)} onChange={() => handleSelectForm(form.id)} /></td>
                                <td className="td">{form.name}</td>
                                <td className="td"><code>{form.id}</code></td>
                                <td className="td">{new Date(form.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );

    const renderManualTools = () => (
        <>
            <div className="action-card">
                <h3>Actions by Form ID</h3>
                <input type="text" value={manualFormId} onChange={e => setManualFormId(e.target.value)} placeholder="Enter Form GUID" className="text-input" />
                <div className="button-group">
                    <button className="button" onClick={() => makeApiCall(`/marketing/v3/forms/${manualFormId}`)} disabled={!manualFormId}>Get by ID</button>
                    <button className="button" onClick={() => makeApiCall(`/marketing/v3/forms/${manualFormId}/submissions`)} disabled={!manualFormId}>Get Submissions</button>
                </div>
            </div>
            <div className="action-card">
                <h3>Create Form</h3>
                <textarea className="textarea" value={formPayload} onChange={e => setFormPayload(e.target.value)} rows="10" />
                <div className="button-group">
                    <button className="button" onClick={() => makeApiCall('/marketing/v3/forms', 'POST', JSON.parse(formPayload))}>Create Form</button>
                </div>
            </div>
        </>
    );

    return (
        <div className="toolkit-container">
            <div className="controls">
                <h2 className="toolkit-title">Forms API Toolkit</h2>
                <div className="tabs">
                    <button onClick={() => setActiveTab('bulk')} className={activeTab === 'bulk' ? 'active-tab' : 'tab'}>Bulk Management</button>
                    <button onClick={() => setActiveTab('manual')} className={activeTab === 'manual' ? 'active-tab' : 'tab'}>Manual API Tools</button>
                </div>
                {activeTab === 'bulk' ? renderBulkManager() : renderManualTools()}
            </div>
            <div className="results">
                <h3 className="results-title">API Response</h3>
                <ResultsDisplay data={responseData} loading={loading} error={error} />
            </div>
        </div>
    );
};

export default FormsToolkit;
