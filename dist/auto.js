(function () {
'use strict';

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

// Execute callback as soon as dom is ready
function onReady(callback) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback);
  } else {
    callback();
  }
}

// Apply patches to work around javascript window.open vulnarabilities
patchWindowOpen();

// Wait until document body exists
// and start click protection
onReady(startProtection);

}());
