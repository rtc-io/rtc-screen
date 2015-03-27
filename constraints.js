var extend = require('cog/extend-existing');

module.exports = function(opts, baseConstraints) {
  var mandatoryDefaults = {
    chromeMediaSource: 'screen',
    maxWidth: screen.width,
    maxHeight: screen.height,
    minFrameRate: 1,
    maxFrameRate: 5
  };
  
  if (baseConstraints) {
    extend(baseConstraints.video.mandatory, opts);
    return baseConstraints;
  }
  
  return {
    audio: false,
    video: {
      mandatory: extend(mandatoryDefaults, opts),
      optional: []
    }
  };
};