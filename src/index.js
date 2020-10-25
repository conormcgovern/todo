import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import netlifyIdentity from 'netlify-identity-widget';

import loadTheme from './loadTheme';

loadTheme();
window.netlifyIdentity = netlifyIdentity;
netlifyIdentity.init();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
