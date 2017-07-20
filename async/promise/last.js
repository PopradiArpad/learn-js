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

function last(prs) {
  return new Promise(function(resolve, reject) {
    let resolvedCount = 0;
    prs.map(pr =>
      Promise.resolve(pr).then(
        v => {
          resolvedCount++;
          if (resolvedCount === prs.length) {
            resolve(v);
          }
        },
        err => {
          resolvedCount++;
          if (resolvedCount === prs.length) {
            reject(err);
          }
        }
      )
    );
  });
}

last([
  delayFulfill(20, 2),
  delayFulfill(10, 1),
  delayFulfill(30, 3)
]).then(v => {
  console.log(v);
  console.assert(v === 3);
});

last([
  delayReject(20, 2),
  delayReject(10, 1),
  delayReject(30, 3)
]).then(null, v => {
  console.log(v);
  console.assert(v === 3);
});
