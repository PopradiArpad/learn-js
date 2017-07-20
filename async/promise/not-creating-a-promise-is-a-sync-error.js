'use strict';

//Error at creating the first promise of a process line
//unlike to creating a rejected promise
//is a synchronous error

new Promise(null).then(null, e => {
  console.log('never called');
});
