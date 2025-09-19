// Minimal loader for CRMMonster. All application logic resides in `src/crm-monster.js`.
import CRMMonster from './src/crm-monster.js';

function initCRMMonster() {
  if (!window.crmMonster) {
    window.crmMonster = new CRMMonster();
  }
  window.CRMMonster = CRMMonster; // expose constructor for console usage
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCRMMonster, { once: true });
} else {
  initCRMMonster();
}

// Note: If additional one-time startup diagnostics are needed, create a separate
// module and import it here to keep this file focused purely on bootstrapping.