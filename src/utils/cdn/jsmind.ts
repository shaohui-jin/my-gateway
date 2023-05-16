import jsMind from 'jsmind/js/jsmind.js';
//cdn.jsdelivr.net/npm/jsmind/js/jsmind.screenshot.js

import 'jsmind/style/jsmind.css';

Object.defineProperty(window, 'jsMind', {
  value: jsMind,
  configurable: false,
  writable: false,
});
