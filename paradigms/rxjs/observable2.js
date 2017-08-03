'use strict';

const Rx = require('rxjs/Rx');
const _ = require('lodash');

/*
Observable is like a promise iterator.

BUT UNLIKE AT PROMISES EACH SUBSCRIBE STARTS A NEW OBSERVATION SEQUENCE!
*/

const observable = Rx.Observable.create(function(observer) {
  console.log(`start observation: let observe synchronously`);
  observer.next(1);
  observer.next(2);
  observer.next(3);
  console.log(`start timer`);
  setTimeout(()=>{
    console.log(`let observe asynchronously`);
    observer.next(4);
    observer.complete(4);
  },2000);
});

const observer1 = {
  next(v){
    console.log(`observer1 next: ${v}`);
  },
  error(v){
    console.log(`observer1 error: ${v}`);
  },
  complete(v){
    console.log(`observer1 complete: ${v}`);
  }
}

observable.subscribe(observer1);

setTimeout(()=>{
  const observer2 = {
    next(v){
      console.log(`observer2 next: ${v}`);
    },
    error(v){
      console.log(`observer2 error: ${v}`);
    },
    complete(v){
      console.log(`observer2 complete: ${v}`);
    }
  };

  observable.subscribe(observer2);

},1000);
