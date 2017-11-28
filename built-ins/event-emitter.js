'use strict';
const EventEmitter = require('events').EventEmitter;
const assert = require('assert');

/*
  To deliver different kind of events to multiple observer.
*/
/*
  Naturally synchronous and delivers in order of registering.
*/
const eventEmitter = new EventEmitter();
eventEmitter.on('bla', () => console.log('bla 1'));
eventEmitter.on('bla', () => console.log('bla 2'));

console.log('before emit');
eventEmitter.emit('bla');
console.log('after emit');

/*
  Passing arguments and this.
*/
//For functions
eventEmitter.on('args', function(a1, a2) {
  assert(a1 === 1);
  assert(a2 === 2);
  assert(this === eventEmitter);
});
//For arrow functions
eventEmitter.on('args', (a1, a2) => {
  assert(a1 === 1);
  assert(a2 === 2);
  assert.deepEqual(this, {});
});
eventEmitter.emit('args', 1, 2);

/*
  Error events are treated special in Node.js.
  Emitted 'error' without at least one registered listener throws an exception.
*/
eventEmitter.emit('non-existing');
assert.throws(() => {
  eventEmitter.emit('error');
}, Error);

/*
  Difference to callbacks:
*/
