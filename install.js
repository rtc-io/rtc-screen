var crel = require('crel');

module.exports = function(opts) {
  var link = document.querySelector('link[rel="chrome-webstore-item"]');
  var firstChild = document.body.childNodes[0];
  
  function createInstallBar() {
    var anchor;
    var bar = crel('div', { class: 'rtc-extension-installer' }, [
      'A chrome extension is required for screen-sharing, please ',
      anchor = crel('a', { href: '#' }, 'click here to install')
    ]);
    
    anchor.addEventListener('click', function() {
      chrome.webstore.install();
      bar.parentNode.removeChild(bar);

      return false;
    });
    
    return bar;
  }
  
  function getExtensionUrl() {
    return 'https://chrome.google.com/webstore/detail/' +
      ((opts || {}).extensionId || 'einjngigaajacmojcohefgmnhhdnllic');
  }
  
  if (! link) {
    document.head.appendChild(crel('link', {
      rel: 'chrome-webstore-item',
      href: getExtensionUrl()
    }));
  }
  
  if (firstChild) {
    document.body.insertBefore(createInstallBar(), firstChild);
  }
  else {
    document.body.appendChild(createInstallBar());
  }
};