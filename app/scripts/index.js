/* eslint-disable global-require */

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from 'scripts/components/App';

global.FB.init({
  appId: '1725542020997523',
  // appId : '1725062444378814',
  xfbml: true,
  version: 'v2.6',
});

// Render the root component (<Routes />) intially, wrapped by the
// new <AppContainer>
ReactDOM.render(
  <AppContainer><App fb={window.FB} /></AppContainer>,
  document.getElementById('app')
);

// If hot reloading is enabled in Webpack...
if (module.hot) {
  // Accept any hot reloads affecting `scripts/routes.js` (including
  // any components it requires and renders etc.)
  module.hot.accept('scripts/components/App', () => {
    // Re-import the updated component
    const HotApp = require('scripts/components/App').default;

    // Render the updated component (state will be preserved!)
    ReactDOM.render(
      <AppContainer><HotApp fb={window.FB} /></AppContainer>,
      document.getElementById('app')
    );
  });
}
