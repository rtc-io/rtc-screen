# rtc-screen

Please can I just have a media stream of the screen please?


[![NPM](https://nodei.co/npm/rtc-screen.png)](https://nodei.co/npm/rtc-screen/)

[![bitHound Score](https://www.bithound.io/github/rtc-io/rtc-desktop/badges/score.svg)](https://www.bithound.io/github/rtc-io/rtc-desktop) 

## Example Usage

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
