'use strict';

function sum(...args){
  return args.reduce((a,v)=>a+v,0);
}

console.assert(sum(1,2,3,4) === 10);

//Partial application of a function takes the function with
//n parameter and some parameters and
//returns a function with less then n parameters
Function.prototype.partialApply = function partialApply(...rest1) {
  let fn = this;
  return function(...rest2){
    return fn.apply(null,rest1.concat(rest2));
  }
}

//With arrow function
Function.prototype.partialApply = function partialApply(...rest1) {
  return (...rest2) => this.apply(null,rest1.concat(rest2));
}

let sum1_2 = sum.partialApply(1,2);
console.assert(sum1_2(3,4) === 10);
