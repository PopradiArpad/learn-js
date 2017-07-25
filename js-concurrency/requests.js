'use strict';

function onLoad(e) {
  //'this' is set to request
  console.log('load',JSON.parse(this.responseText));
}

function onAbort() {
  //'this' is set to request
  console.warn('request aborted..');
}

let request = new XMLHttpRequest();

//XMLHttpRequest has the EventTarget interface
request.addEventListener('load',onLoad);
request.addEventListener('abort',onAbort);

request.open('get','api.json');
request.send();
request.abort();
