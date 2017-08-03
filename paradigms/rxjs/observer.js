'use strict';

const Rx = require('rxjs/Rx');
const _ = require('lodash');

/*
Observer is a consumer of values.

It's an object with possible
next, error, complete methods.
*/
const observer = {
  next(v){
    console.log(`next: ${v}`);
  },
  error(v){
    console.log(`error: ${v}`);
  },
  complete(v){
    console.log(`complete: ${v}`);
  }
}

const observable = Rx.Observable.of(1,2,3);

/*
The observer will be attached to the observable
through subscribe

THE 'SUBSCRIBE' LET EXECUTE THE OBSERVABLE!
THIS IS DIFFERENT TO PROMISES!
A CREATED PROMISE STARTS AT CREATION,
A CREATED OBSERVER STARTS _ONLY_ AT THE FIRST SUBSCRIBE!
*/
observable.subscribe(observer);

//without subscribe this doesn't start
// observable.map(v=>{console.log(v);return v});
