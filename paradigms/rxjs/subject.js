'use strict';

const Rx = require('rxjs/Rx');
const _ = require('lodash');

/*
Subject is an Observable with multicasted subscription.
*/
const subject = new Rx.Subject();

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

subject.subscribe(observer1);
subject.subscribe(observer2);

subject.next(1);

//Subject is an observer too
Rx.Observable.of('a','b','c').subscribe(subject);
