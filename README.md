# rtc-screen

Please can I just have a media stream of the screen please?


[![NPM](https://nodei.co/npm/rtc-screen.png)](https://nodei.co/npm/rtc-screen/)

[![bitHound Score](https://www.bithound.io/github/rtc-io/rtc-screen/badges/score.svg)](https://www.bithound.io/github/rtc-io/rtc-screen) 

## Example Usage

Displayed below is an example that will attempt work nicely in both an
[atom-shell](https://github.com/atom/atom-shell) based app and also in a
standard web application (HTTPS hosted).

At present it makes use of the
[rtc.io screensharing extension](https://github.com/rtc-io/rtc-screenshare-extension)
so will expect to be run from an `*.rtc.io` domain (which you can fake
easier enough when running a demo on your local machine).

```js
var screen = require('rtc-screen');
var attachmedia = require('attachmediastream');

screen(function(err, stream) {
  if (err) {
    return console.error('Could not capture media: ', err);
  }
  
  document.body.appendChild(attachmedia(stream));
});
```

## Using a Custom Extension

To make this work with a custom extension, call the `screen` function with
some initialization opts as shown in the example below:

```js
var attachmedia = require('attachmediastream');
var screen = require('rtc-screen');

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
```

## Tweaking Width, Height, Frame Rate, etc

```js
var attachmedia = require('attachmediastream');
var screen = require('rtc-screen');

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
```

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

## License(s)

### Apache 2.0

Copyright 2015 Damon Oehlman <damon.oehlman@nicta.com.au>

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
