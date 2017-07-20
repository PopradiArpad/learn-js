'use strict';

function delay(time, value) {
  return new Promise(function(resolve) {
    setTimeout(() => resolve(value), time);
  });
}

Promise.race([delay(30, 'ho'), delay(20, 'hu'), delay(10, 'he')]).then(v => {
  console.log(`resolved with ${v}`);
  console.assert(v === 'he');
});

Promise.race([]).then(v => {
  throw `
  Promise.race([]) never resolves:
  there is no first of nobody.
  `;
})
