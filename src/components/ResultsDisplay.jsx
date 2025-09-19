import React from 'react';

// A generic component to display API call results
const ResultsDisplay = ({ data, loading, error }) => {
    if (loading) return <div className="loader">Loading...</div>;
    if (error) return <pre className="results-pre" style={{ color: '#E74C3C' }}>Error: {error}</pre>;
    if (!data) return <div className="no-results">No data. Run a query to see results.</div>;
    return <pre className="results-pre">{JSON.stringify(data, null, 2)}</pre>;
};

export default ResultsDisplay;
