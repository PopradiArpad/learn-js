'use strict';
const _ = require('lodash');

//Promise.all wraps all its array item in Promise.resolve
Promise.all([
  20,
  22,
  {
    then(onFulfill) {
      onFulfill(23);
    }
  }
]).then(vs => {
  console.log(vs);
  console.assert(_.isEqual(vs, [20, 22, 23]));
});

Promise.all([]).then(v => {
  console.assert(v.length === 0);
  console.log(`
    Promise.all([]) resolves to empty array:
    there is no content but the container exists.
    `);
});

// Promise.all([20, 22, Promise.reject('bumm')]).then(null, e => {
//   console.log('bumm');
//   console.assert(e === 'bumm');
// });
