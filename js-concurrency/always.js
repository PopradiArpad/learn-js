'use strict';

if (!Promise.prototype.always) {
  Promise.prototype.always = function(fn) {
    this.then(fn, fn);
  };
}

let promise = new Promise(function(resolve, reject) {
  Math.round(Math.random()) ? resolve() : reject();
});

promise.then(() => console.log('resolved'), () => console.log('rejected'));
promise.always(() => console.log('clean up'));
