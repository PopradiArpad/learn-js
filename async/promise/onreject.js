'use strict';

//An undefined unreject is a throw

//In the 'then' p must be set locally
let p = Promise.resolve(42).then(
  () => {}
  // e => {
  //   throw e;  //without throw, p would be resolve to undefined instead rejected with e.
  // }
);
