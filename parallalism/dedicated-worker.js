'use strict';

//Importing libs with a special blocking function
importScripts('lodash.min.js');
//there is no require
// const _ = require('lodash.min.js');

console.log('in worker there is console.log');
//'this' is a DedicatedWorkerGlobalScope
//the worker as object
console.log(`in worker 'this':`,this);
// no access to 'window'
console.log(`in worker typeof window === 'undefined': ${typeof window === 'undefined'}`);
console.log('in worker no access to DOM');

// function whatIsThisInDefaultThisRule() {
//   console.log(`'this' in default 'this' rule:`,this);
// }
// whatIsThisInDefaultThisRule();

//The EventTarget API is usable and no object is needed to call it
//on the worker context.
//this.addEventListener('message',(e)=>{
addEventListener('message',(e)=>{
  console.log(`message received: e.data:${e.data}`);
  console.log(`
    The sent/received messages arw serialized and deserialized.
    Only data are posted no JavaScript objects!
    `);
});

postMessage('hello from worker');
