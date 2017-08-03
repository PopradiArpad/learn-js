'use strict';

function* alternate(...args) {
  while (true) {
    for (let v of args) {
      yield v;
    }
  }
}

let generator = alternate(1,2,3);

for (let i = 0; i < 10; i++) {
  console.log(generator.next().value);
}
