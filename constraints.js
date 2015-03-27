module.exports = function(sourceId, opts) {
  var mandatory = {
    chromeMediaSource: sourceId ? 'desktop' : 'screen',
    maxWidth: (opts || {}).maxWidth || screen.width,
    maxHeight: (opts || {}).maxHeight || screen.height,
    minFrameRate: (opts || {}).minFrameRate || 1,
    maxFrameRate: (opts || {}).maxFrameRate || 5
  };
  
  if (sourceId) {
    mandatory.chromeMediaSourceId = sourceId;
  }
  
  return {
    audio: false,
    video: {
      mandatory: mandatory,
      optional: []
    }
  };
};