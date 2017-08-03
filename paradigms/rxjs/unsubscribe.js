'use strict';

const Rx = require('rxjs/Rx');
const _ = require('lodash');

/*
  It's possible to cancel the execution
  of an asynchronou Observable.

  Synchronous Observable runs to completion
  because 'subscribe' runs synchronously to completion
  before returning the subscription object that
  let stop the execution.

  Typical M$...
*/

const observable1 = Rx.Observable.create(function(observer) {
  observer.next(1);
  console.log(`observable 1 is executed`);
  observer.next(2);
  console.log(`observable 2 is executed`);
  observer.next(3);
  console.log(`observable 3 is executed`);
});

const observer1 = {
  next(v) {
    console.log(`observer1 next: ${v}`);
    if (v === 2) {
      console.assert(subscription === undefined);
      //
      // subscription.unsubscribe();
    }
  },
  error(v) {
    console.log(`observer1 error: ${v}`);
  },
  complete(v) {
    console.log(`observer1 complete: ${v}`);
  }
};

var subscription = observable1.subscribe(observer1);
console.assert(subscription !== undefined);
