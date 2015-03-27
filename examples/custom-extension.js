var attachmedia = require('attachmediastream');
var screen = require('..');

var opts = {
  extensionId: 'einjngigaajacmojcohefgmnhhdnllic',
  chromeExtension: 'rtc.io screenshare'
};

screen(opts, function(err, stream) {
  if (err) {
    return console.error('Could not capture media: ', err);
  }
  
  document.body.appendChild(attachmedia(stream));
});