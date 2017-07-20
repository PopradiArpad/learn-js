'use strict';
let resolveP1
let p1 = new Promise(function(resolve){
  resolveP1 = resolve;
});

Promise.reject('RejectionError')
  .then(
    () => {
      console.log('never gets here');
    },
    e => {
      console.log(`caught ${e}`);
      // return 42;
      resolveP1(21);
      console.log('p1 resolved');
      throw 'RejectionError2'; //the result of the first 'then' promise
    }
  )
  .then(
    v => {
      console.log(`value ${v}`);
    },
    e => {
      console.log(`caught again ${e}`);
    }
  );
console.log('Promise.reject defined');

p1.then(()=>{
  console.log('p1 resolved : onFulfill');
})
