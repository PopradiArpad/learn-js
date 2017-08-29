'use strict';

/*
  Immediately Invoked Function Expression
*/

(function iife1() {
  console.log("iife1");
})();

(function iife2() {
  console.log("iife2");
}());

var guess = (function g() {
  var secret = 42;

  return function f(password) {
         return secret === password ? 'right' : 'wrong';
         };
})();

console.log(guess(22));
