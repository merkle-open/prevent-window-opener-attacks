'use strict';

function preventWindowOpenerAttacks(clickEvent) {
  document.documentElement.removeEventListener(
    'click',
    preventWindowOpenerAttacks
  );
  // Stop if any other javascript prevented the event
  if (clickEvent.defaultPrevented) {
    return;
  }
  // Stop if the clicked element is not an "A" element
  if (!clickEvent.target || clickEvent.target.nodeName !== 'A') {
    return;
  }
  // Stop if the clicked a element is not set to target = _blank
  if (clickEvent.target.target !== '_blank') {
    return;
  }

  clickEvent.preventDefault();
  // noreferrer will automatically set window.opener to null if supported by the browser
  const win = window.open(clickEvent.target.href, '_blank', 'noreferrer');
  // Ensure that window.opener is set to null in every browser
  if (win) {
    win.opener = null;
  }
}

export function startProtection() {
  // Add event listener to documentElement just before it bubbles up
  document.body.addEventListener('click', function (e) {
    // Ensure that previous events are cleaned up even if the event did not bubble
    document.documentElement.removeEventListener(
      'click',
      preventWindowOpenerAttacks
    );
    // Wait for the current event to bubble to the documentElement
    document.documentElement.addEventListener(
      'click',
      preventWindowOpenerAttacks
    );
  });
}

export function patchWindowOpen() {
  const originalWindowOpen = window.open;
  window.open = function (url, target) {
    const result = originalWindowOpen.apply(this, arguments);
    if (result && target === '_blank') {
      result.opener = null;
    }
    return result;
  };
}
