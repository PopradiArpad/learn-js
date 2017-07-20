'use strict';

//Make a function that promisify a callback-based function
//that
//* doesn't use 'this'
//* gives back only one value like a promise

function promisify(fn) {
  //it must return a function
  //to let defer the execution
  return function() {
    //we need the arguments to feed fn when the time comes
    let args = Array.from(arguments);

    //we must return a Promise
    //because this is a promisification
    return new Promise(function(resolve, reject) {
      //call the callback-based function and let be notified
      //when it's finished
      //'this' belongs to the function call,
      //therefore it must be set explicitly.
      fn.call(null, ...args, (err, value) => {
        if (err) {
          reject(err);
        } else {
          resolve(value);
        }
      });
    });
  };
}

function asyncAddOk(n1, n2, cb) {
  setTimeout(() => {
    cb(null, n1 + n2);
  }, 100);
}

function asyncAddError(n1, n2, cb) {
  setTimeout(() => {
    cb(`err adding ${n1} and ${n2}`);
  }, 100);
}

let promisifiedAsyncAddOk = promisify(asyncAddOk);
promisifiedAsyncAddOk(1, 2).then(result => {
  console.log(`result: ${result}`);
});

let promisifiedAsyncAddError = promisify(asyncAddError);
promisifiedAsyncAddError(1, 2).catch(err => {
  console.log(`err: ${err}`);
});
