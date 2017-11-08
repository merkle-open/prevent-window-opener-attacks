"use strict";

function PreventWindowOpenerAttacks(options) {
  document.addEventListener("DOMContentLoaded", function() {
    function handleClick(e) {
      document.documentElement.removeEventListener("click", handleClick);
      // TODO: Check if rel exists
      if (
        !e.defaultPrevented &&
        e.target &&
        e.target.nodeName == "A" &&
        e.target.target === "_blank"
      ) {
        e.preventDefault();
        const win = window.open(e.target.href, "_blank");
        if (win) {
          win.opener = null;
        }
      }
    }
    document.body.addEventListener("click", e => {
      document.documentElement.addEventListener("click", handleClick);
    });
  });
}

module.exports = PreventWindowOpenerAttacks;
