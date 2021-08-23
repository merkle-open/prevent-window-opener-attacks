import { patchWindowOpen, startProtection } from './lib';

// Execute callback as soon as dom is ready
function onReady(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
}

// Apply patches to work around javascript window.open vulnarabilities
patchWindowOpen();

// Wait until document body exists
// and start click protection
onReady(startProtection);
