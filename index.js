var crel = require('crel');
var defaults = require('cog/defaults');
var getUserMedia = require('getusermedia');
var constraints = require('./constraints');
var install = require('./install');

/**
  # rtc-screen
  
  Please can I just have a media stream of the screen please?
  
  ## Example Usage
  
  <<< examples/simple.js
  
**/
module.exports = function(opts, callback) {
  var screenshare;

  function useExtension() {
    var customErr;
    
    console.log('captured use extension call');

    screenshare.available(function(err, version) {
      if (err) {
        screenshare.on('activate', useExtension);
        return install(opts);
      }
      
      console.log('making screenshare request');
      screenshare.request(function(err, c) {
        console.log('back', arguments);
        if (err) {
          return callback(err);
        }
        
        console.log(c);
        getUserMedia(c, callback);
      });
    });
  }
  
  if (typeof opts == 'function') {
    callback = opts;
    opts = {};
  }
  
  // interface with screensharing extensions
  screenshare = require('rtc-screenshare')(defaults(opts, {
    chromeExtension: 'rtc.io screenshare'
  }));
  
  // attempt extension free capture
  getUserMedia(constraints(null, opts), function(err, stream) {
    if (err) {
      return useExtension();
    }
    
    callback(null, stream);
  });
};