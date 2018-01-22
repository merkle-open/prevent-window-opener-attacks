(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.preventWindowOpenAttacks = {})));
}(this, (function (exports) { 'use strict';

function preventWindowOpenerAttacks(clickEvent) {
  document.documentElement.removeEventListener(
    "click",
    preventWindowOpenerAttacks
  );
  // Stop if any other javascript prevented the event
  if (clickEvent.defaultPrevented) {
    return;
  }
  // Stop if the clicked element is not an "A" element
  if (!clickEvent.target || clickEvent.target.nodeName !== "A") {
    return;
  }
  // Stop if the clicked a element is not set to target = _blank
  if (clickEvent.target.target !== "_blank") {
    return;
  }

  clickEvent.preventDefault();
  var win = window.open(clickEvent.target.href, "_blank");
  if (win) {
    win.opener = null;
  }
}

function startProtection(whiteList) {
  // Add event listener to documentElement just before it bubbles up
  document.body.addEventListener("click", function(e) {
    // Ensure that previous events are cleaned up even if the event did not bubble
    document.documentElement.removeEventListener(
      "click",
      preventWindowOpenerAttacks
    );
    // Wait for the current event to bubble to the documentElement
    document.documentElement.addEventListener(
      "click",
      preventWindowOpenerAttacks
    );
  });
}

function patchWindowOpen() {
  var originalWindowOpen = window.open;
  window.open = function(url, target) {
    var result = originalWindowOpen.apply(this, arguments);
    if (result && target === "_blank") {
      result.opener = null;
    }
    return result;
  };
}

exports.startProtection = startProtection;
exports.patchWindowOpen = patchWindowOpen;

Object.defineProperty(exports, '__esModule', { value: true });

})));
