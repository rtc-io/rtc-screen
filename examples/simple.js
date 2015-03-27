var screen = require('..');
var attachmedia = require('attachmediastream');

screen(function(err, stream) {
  if (err) {
    return console.error('Could not capture media: ', err);
  }
  
  document.body.appendChild(attachmedia(stream));
});