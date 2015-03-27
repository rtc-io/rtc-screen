var crel = require('crel');
var defaults = require('cog/defaults');
var getUserMedia = require('getusermedia');
var constraints = require('./constraints');
var install = require('./install');

/**
  # rtc-screen
  
  Please can I just have a media stream of the screen please?
  
  ## Example Usage
  
  Displayed below is an example that will attempt work nicely in both an
  [atom-shell](https://github.com/atom/atom-shell) based app and also in a
  standard web application (HTTPS hosted).
  
  At present it makes use of the
  [rtc.io screensharing extension](https://github.com/rtc-io/rtc-screenshare-extension)
  so will expect to be run from an `*.rtc.io` domain (which you can fake
  easier enough when running a demo on your local machine).
  
  <<< examples/simple.js
  
  ## Using a Custom Extension
  
  To make this work with a custom extension, call the `screen` function with
  some initialization opts as shown in the example below:
  
  <<< examples/custom-extension.js
  
  ## Inline Installation
  
  While the [`rtc-screenshare`](https://github.com/rtc-io/rtc-screenshare)
  package leaves you to deal with inline installation in your own way, the
  `rtc-screen` package takes a more opinionated approach and creates the
  required DOM elements to make this process happen within the DOM.
  
  To customize the look and feel of these elements, provide css rules for
  `.rtc-extension-installer` and if desired set an `installerContainer` option
  in the options.
  
  ## Reference

  ### `screen(opts?, callback)`
  
  Share my screen. Stat. Initialization options if provided can be the
  following:
  
  - `extensionId` - the chrome webstore id for the extension that you want to
    install when using the inline installation functionality of the extension.
  
  - `maxWidth` - the max width that you wish to capture at, which
     defaults to `screen.width`
  
  - `maxHeight` - the max height that you wish to capture at, which
     defaults to `screen.height`
  
  - `minFrameRate` - the min frame rate (per second) that you wish to capture
    at, which defaults to `1`.
  
  - `maxFrameRate` - the max frame rate (per second) that you with to capture
    at, which defaults to `5`.

  - `chromeExtension` - the name of the chrome extension that will any extension
    specific messaging will be targeting (default: `rtc.io screenshare`)
  
  - `installerContainer` - the DOM element that the installation prompt elements
    will be inserted into (first child).

**/
module.exports = function(opts, callback) {
  var screenshare;

  function useExtension() {
    var customErr;
    
    screenshare.available(function(err, version) {
      if (err) {
        screenshare.on('activate', useExtension);
        return install(opts);
      }
      
      screenshare.request(function(err, c) {
        if (err) {
          return callback(err);
        }
        
        getUserMedia(constraints(opts, c), callback);
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
  getUserMedia(constraints(opts), function(err, stream) {
    if (err) {
      return useExtension();
    }
    
    callback(null, stream);
  });
};