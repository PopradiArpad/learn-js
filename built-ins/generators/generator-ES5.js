'use strict';

//Make a function that's repeated call returns the next value of a subsequence.

//With explicit factory function
//--------------------------------
//we need an own scope to store the state -> we need a function
// function mkFibonacci() {
//   let fnm1 = 1;
//   let fnm2 = 1;
//   let n = 0;
//
//   return function() {
//     n++;
//     switch (n) {
//       case 1:
//       case 2:
//         return 1;
//       default:
//         let fn = fnm2 + fnm1;
//         fnm2 = fnm1;
//         fnm1 = fn;
//         return fn;
//     }
//   };
// }
// const f = mkFibonacci();
//

//With the immediately invoked function expression
//--------------------------------
const f = function mkFibonacci() {
  let fnm1 = 1;
  let fnm2 = 1;
  let n = 0;

  return function fibonacci() {
    n++;
    switch (n) {
      case 1:
      case 2:
        return 1;
      default:
        let fn = fnm2 + fnm1;
        fnm2 = fnm1;
        fnm1 = fn;
        return fn;
    }
  };
}();

console.assert(f() === 1);
console.assert(f() === 1);
console.assert(f() === 2);
console.assert(f() === 3);
console.assert(f() === 5);
console.assert(f() === 8);
console.assert(f() === 13);


//with ES2015 after all
//----------------------
const fibonacci = {
  //the generator function
  [Symbol.iterator]: function* fibonacci() {
    yield 1;
    yield 1;

    let fnm1 = 1;
    let fnm2 = 1;

    while (true) {
      let fn = fnm2 + fnm1;
      fnm2 = fnm1;
      fnm1 = fn;
      yield fn;
    }
  }
}

//Each iterator is an iterables i.e it has a generator function
//in this case that returns back the iterator.
let it = fibonacci[Symbol.iterator]();
console.assert(it[Symbol.iterator]() === it);

// for (let f of fibonacci[Symbol.iterator]()) {
for (let f of fibonacci) {
  console.log(f);
  if (f > 500) {
    break;
  }
}
