'use strict';

//Does bind copy or reference the function?
let f1 = function() {
  return `f1-1`;
}

let f1bound = f1.bind({});

f1 = function() {
  return `f1-2`;
}

//Bind makes a copy
console.assert(f1() === `f1-2`);
console.assert(f1bound() === `f1-1`);
