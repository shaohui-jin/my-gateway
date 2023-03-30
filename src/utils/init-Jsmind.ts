import jsMind from 'jsmind/js/jsmind.js';
import 'jsmind/style/jsmind.css';

Object.defineProperty(window, 'jsMind', {
  value: jsMind,
  configurable: false,
  writable: false,
});
