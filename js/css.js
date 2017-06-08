(function() {
  // TODO: define css
  var css = 'body { width: 200px !important; }';

  var style       = document.createElement('style');
  style.innerHTML = css;

  document.head.appendChild(style);
})();
