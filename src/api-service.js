// Simple ApiService - small wrapper to centralize API calls for CRM Monster
// Attach to `window.apiService` so the existing UI (which expects globals) can access it.
class ApiService {
  constructor(options = {}) {
    // Default to HubSpot's public API host. If caller explicitly provides
    // a `baseUrl` (including an empty string) we honor it. Only use the
    // HubSpot default when `baseUrl` is not provided at all.
    this.baseUrl = Object.prototype.hasOwnProperty.call(options, 'baseUrl')
      ? options.baseUrl
      : 'https://api.hubapi.com';
    this.headers = options.headers || {};
  }

  // Low-level fetch wrapper that returns parsed JSON and throws on non-2xx.
  async request(path, { method = 'GET', body = null, headers = {} } = {}) {
    const url = this.baseUrl ? `${this.baseUrl}${path}` : path;
    const opts = {
      method,
      headers: Object.assign({ 'Content-Type': 'application/json' }, this.headers, headers),
    };
    if (body != null) opts.body = typeof body === 'string' ? body : JSON.stringify(body);

    const res = await fetch(url, opts);
    const text = await res.text();
    try {
      const data = text ? JSON.parse(text) : null;
      if (!res.ok) {
        const err = new Error(`API Error: ${res.status} ${res.statusText}`);
        err.status = res.status;
        err.body = data;
        throw err;
      }
      return data;
    } catch (err) {
      // rethrow JSON parse errors or API errors
      throw err;
    }
  }

  // Example helper used by UI for a test call. Consumers can expand these methods.
  async testEndpoint(path = '/crm/v3/objects/contacts') {
    return this.request(path, { method: 'GET' });
  }

  // Common HubSpot helpers (read-only helpers shown here). These wrap
  // HubSpot CRM v3 endpoints. Auth (Bearer token) must be provided via
  // `window.apiService.headers['Authorization'] = 'Bearer <TOKEN>'` or by
  // instantiating ApiService with headers.
  async getContacts(query = '') {
    const path = query ? `/crm/v3/objects/contacts?${query}` : '/crm/v3/objects/contacts';
    return this.request(path, { method: 'GET' });
  }

  async getContactById(id) {
    if (!id) throw new Error('getContactById requires an id');
    return this.request(`/crm/v3/objects/contacts/${encodeURIComponent(id)}`, { method: 'GET' });
  }

  async getCompanies(query = '') {
    const path = query ? `/crm/v3/objects/companies?${query}` : '/crm/v3/objects/companies';
    return this.request(path, { method: 'GET' });
  }

  async getDeals(query = '') {
    const path = query ? `/crm/v3/objects/deals?${query}` : '/crm/v3/objects/deals';
    return this.request(path, { method: 'GET' });
  }

  async getProperties(objectType = 'contacts') {
    // Example: /crm/v3/properties/contacts
    return this.request(`/crm/v3/properties/${encodeURIComponent(objectType)}`, { method: 'GET' });
  }

  async getWorkflows() {
    // HubSpot automation workflows endpoint
    return this.request('/automation/v4/workflows', { method: 'GET' });
  }

  async searchContacts(body = { filterGroups: [], sorts: [], properties: [], limit: 10, after: 0 }) {
    // POST /crm/v3/objects/contacts/search
    return this.request('/crm/v3/objects/contacts/search', { method: 'POST', body });
  }

  // Placeholder: add other API helpers (getContacts, createContact, mergeContacts) here.
}

// Expose a default instance on window for backwards compatibility with the app.
// If you want to change baseUrl/headers in different environments, modify this instantiation.
window.apiService = new ApiService({
  baseUrl: '', // <-- set to real API base URL if integrating (or leave blank for proxying)
  headers: {
    // For example: 'Authorization': 'Bearer <TOKEN>' will be used for all requests.
  }
});

// Example (do NOT commit tokens):
// After loading the app in your browser console you can set:
// window.apiService.headers['Authorization'] = 'Bearer <YOUR_TOKEN>'
// This keeps secrets out of the repo and enables live API calls during testing.

// Export for module-aware consumers (optional, not used by non-module app.js).
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ApiService;
}
