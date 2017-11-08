(function() {
  setTimeout(function() {
    var a = document.createElement("a");
    a.target = "_blank";
    a.innerHTML = "Click me!";
    a.href = "evil-page.html";
    a.className = "link";
    document.querySelector(".content").appendChild(a);
  }, 2000);
})();
