// Indonesia in Numbers — entry point.
// Renders the page for the current hash route and re-renders whenever
// the visitor follows a link inside the site.

import { render } from './views.js';

window.addEventListener('hashchange', render);
render();
