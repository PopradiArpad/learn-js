'use strict';

function promiseOk(value) {
  return Promise.resolve(value);
  // return new Promise(function(resolve, reject) {
  //   resolve(value);
  //   // setTimeout(()=>resolve(value),100);
  // });
}

function promiseError(value) {
  return Promise.reject(42);
  // return new Promise(function(resolve, reject) {
  //   reject(`Error`);
  //   // setTimeout(()=>resolve(value),100);
  // });
}

function* main() {
  // yield Promise.resolve(42);

  throw 'exception';

  yield Promise.reject('bumm');
}

try {
  let it = main();
  let p = it.next().value;
  p.then(
    value => {
      console.log(`value: ${value}`);
    },
    err => {
      console.log(`rejected promise: ${err}`);
    }
  );
} catch (e) {
  console.log(`caught exception: ${e}`);
} finally {
}


//With async await
