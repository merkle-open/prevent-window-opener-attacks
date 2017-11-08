"use strict";
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

export function startProtection(whiteList) {
  // Add event listener to documentElement just before it bubbles up
  document.body.addEventListener("click", function(e) {
    if (whiteList) {
      // Array.prototype.some.call(document.querySelectorAll('#Syntax:firstChild'), (element) => element === e.target)
    }
    document.documentElement.addEventListener(
      "click",
      preventWindowOpenerAttacks
    );
  });
}

export function patchWindowOpen() {
  var originalWindowOpen = window.open;
  window.open = function(url, target) {
    var result = originalWindowOpen.apply(this, arguments);
    if (result && target === "_blank") {
      result.opener = null;
    }
    return result;
  };
}
