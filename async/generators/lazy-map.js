'use strict';

function* g2(){
  yield 1;
  yield 2;
}
function* g1(){
  yield g2();
}
for (let item of g1()) {
  console.log(item);
}
console.log('-----------------');



//Create a generator that iterates over an iterable
//and applies an iteratee on each element
//like Array#map but lazy

function* lazyMap(iterable, iteratee) {
  for (let item of iterable) {
    yield iteratee(item);
  }
}

for (let mapped of lazyMap([1, 2, 3], x => x + 1)) {
  console.log(mapped);
}
console.log('-----------------');
for (let mapped of lazyMap(lazyMap([1, 2, 3], x => x + 1), x => x * x)) {
  console.log(mapped);
}

// if (!Array.prototype.lazyMap) {
//   Array.prototype.lazyMap = function* lazyMap(iteratee) {
//     for (let item of this) {
//       yield iteratee(item);
//     }
//   };
// }
//
// for (let mapped of [1, 2, 3].lazyMap(x => x + 1)) {
//   console.log(mapped);
// }

//Create a function that chain up iteratees lazily
console.log('-----------------');

//That is a function, it's not lazy
function chainedLazyMaps(...iteratees) {
  //it returns a generator
  return function* chained(iterable) {
    for (let iteratee of iteratees) {
      iterable = lazyMap(iterable, iteratee);
    }

    yield* iterable;
  };
}

let composed = chainedLazyMaps(x => x + 1, x => x * x, x => x - 2);
for (let mapped of composed([1, 2, 3])) {
  console.log(mapped);
}
