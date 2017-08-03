'use strict';

const Rx = require('rxjs/Rx');
const _ = require('lodash');

/*
Unify (asynchronous) events and collections
as _observable sequences_
in one functional syntax.

Let the data sequence detach from the time:
handle available and future values with the same syntax
like at Promises.

Events are
  like arrays (linear ordered)
  like promises (asynchronous)
*/
let source = ['1', '1', 'foo', '2', '3', '5', 'bar', '8', '13'];

console.log(`Working with array`);
let result1 = source
  .map(x => parseInt(x))
  .filter(x => !isNaN(x))
  .reduce((x, y) => x + y, 0);
console.log(result1);

console.log(`Working with Observable`);
Rx.Observable
  .of(...source)
  .map(x => parseInt(x))
  .filter(x => !isNaN(x))
  .reduce((x, y) => x + y, 0)
  .subscribe(x => console.log(x));
