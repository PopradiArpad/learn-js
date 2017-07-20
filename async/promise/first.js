'use strict';

function delayFulfill(time, value) {
  return new Promise(function(resolve) {
    setTimeout(() => resolve(value), time);
  });
}

function delayReject(time, value) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => reject(value), time);
  });
}

function first(prs) {
  return new Promise(function(resolve, reject) {
    prs.map(pr => Promise.resolve(pr).then(resolve, reject));
  });
}

first([]).then(v => {
  console.log(`
    Never comes.
    Never unresolved promise means no async execution.
    Pending promise doesn't keep the program alive.
    Only pending I/O action like setTimeout keep the program alive.`);
});

first([
  delayFulfill(20, 2),
  delayFulfill(10, 1),
  delayFulfill(30, 3)
]).then(v => {
  console.log(v);
  console.assert(v === 1);
});

first([
  delayReject(20, 2),
  delayReject(10, 1),
  delayReject(30, 3)
]).then(null, v => {
  console.log(v);
  console.assert(v === 1);
});
