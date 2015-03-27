var attachmedia = require('attachmediastream');
var screen = require('..');

var opts = {
  minFrameRate: 25,
  maxFrameRate: 30,
  maxWidth: 640,
  maxHeight: 480
};

screen(opts, function(err, stream) {
  if (err) {
    return console.error('Could not capture media: ', err);
  }
  
  document.body.appendChild(attachmedia(stream));
});