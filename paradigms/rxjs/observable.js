'use strict';

const Rx = require('rxjs/Rx');
const _ = require('lodash');

let source = ['1', '1', 'foo', '2', '3', '5', 'bar', '8', '13'];

console.log(`
  Future Observable data is worked up asynchronous.
  `);
Rx.Observable
  .interval(100)
  .take(9)
  .map(i => source[i])
  .map(x => parseInt(x))
  .filter(x => !isNaN(x))
  .reduce((x, y) => x + y, 0)
  .subscribe(x => console.log(x));

console.log(`
  Available Observable data is worked up synchronous!
  UNLEASHEANG ZALGO?
  `);
Rx.Observable.of(1, 2, 3).subscribe(x => console.log('first', x));
console.log('second');

console.log(`
  Subscription represents the execution of an Observable.
  No Subscription no execution.
  `);
Rx.Observable
  .interval(100)
  .take(9)
  .map(i => source[i])
  .map(x => {console.log(x);return parseInt(x);})
  .filter(x => !isNaN(x))
  .reduce((x, y) => x + y, 0)
  // .subscribe(x => console.log(x));
