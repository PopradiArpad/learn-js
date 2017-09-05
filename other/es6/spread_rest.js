'use strict';
const _ = require('lodash');

//rest operator
//-------------
//gathers the rest of the unassigned parameters
//of a function into an array.
function rest1(a, b, ...rest) {
  console.assert(a === 1);
  console.assert(b === 2);
  console.assert(_.isEqual(rest, [3, 4]));
}

rest1(1, 2, 3, 4);

//spread operator
//-------------------
//spreads out any iterable
//(object with the standard iterator ([Symbol.iterator]))
let a1 = [2, 3];
console.assert(_.isEqual([1, ...a1, 4], [1, 2, 3, 4]));

//strings can be spreaded out
let s1 = 'Vörösmarty';
console.assert(_.isEqual(['_', ...s1, '_'], ['_','V','ö','r','ö','s','m','a','r','t','y','_']));

//generators can be spreaded out
function* g1(){
  yield 1;
  yield 2;
}
console.assert(_.isEqual(['_', ...g1(), '_'], ['_',1,2,'_']));

//In function call it spreads the iterables into parameters
rest1(...[1,2,3,4]);

//----------------------------
//.babelrc
// {
//   "plugins":["babel-plugin-transform-object-rest-spread"],
// }
//node -r babel-register -r babel-polyfill spread_rest.js
var state = {
  example1: {
    value: 'count()',
    value2: 1
  }
};

console.log({example1: { value: 'count()', value: 'newvalue' } });
console.log({example1: { ...state.example1, value: 'newvalue',value2: 2 } });
