'use strict';

function wrong() {
  return //automatic semicolon comes here
  {
    a: 1;
  }
}
console.assert(wrong() === undefined);

function right() {
  return {
    a: 1
  };
}
