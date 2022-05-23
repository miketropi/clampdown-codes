/**
 * Admin
 */
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { AdminAppProvider } from './context/AppAdminContext';
import AppAdmin from './components/AppAdmin';

import './scss/admin.scss';

;((w, $) => {

  const Ready = () => {
    const container = document.querySelector('#CLAMPDOWN_CODES_APP');
    if(!container) return;

    const root = ReactDOM.createRoot(container);
    root.render(<AdminAppProvider>
      <AppAdmin />
    </AdminAppProvider>);
  }

  $(Ready) 

})(window, jQuery) 