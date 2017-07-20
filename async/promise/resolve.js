'use strict';

//Promise.resolve wraps
//a non-promise into promise
let p1 = new Promise(function(resolve) {
  resolve(42);
});
//is the same as
let p2 = Promise.resolve(42);

//1. IT MAKES FROM A NOT WELL-DEFINED THENABLE A REAL, TRUSTABLE PROMISE
let pNotWellDefined = {
  then(resolve) {
    console.log('resolving a thenable');
    resolve(42);         //the fullfillment must happen asynchronously not like this
    throw 'evil laughs'; //a Promise let set only once
  }
};

Promise.resolve(pNotWellDefined)
  .then(v => console.log('later: 42'))
  .catch(() => console.log('never called like a real promise'));
console.log('now: this must be before 42');

//doesn't wrap a promise but give it back
let p3 = Promise.resolve(p1);
console.assert(p3 === p1);

//2. IT RESOLVES A REJECTED PROMISE INTO A REJECTED PROMISE
//WHICH MUST BE HANDLED IN A PROMISE PROCESSING CHAIN UNLESS IT TERMINATES THE PROGRAM
//Promise.resolve only channels a rejected promise into a processing pipe but can not hide the rejection.

//SO Promise.resolve means make a resolved Promise, either a fullfilled one or a rejected one.
