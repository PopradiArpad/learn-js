'use strict';
const _ = require('lodash');

// These operators have sense only within
// a structure. See that structure too of you look at the operator!!

//rest operator
//The rest operator gathers structure elements in one named structure.
//===================================================================

//rest of function parameters
//----------------------------
//gathers the rest of the unassigned parameters
//of a function into an array.
function rest1(a, b, ...rest) {
  console.assert(a === 1);
  console.assert(b === 2);
  //the rest is an array
  console.assert(_.isEqual(rest, [3, 4]));
}

rest1(1, 2, 3, 4);

//rest of object properties (in object destruction)
//--------------------------------------------------
//.babelrc
// {
//   "plugins":["babel-plugin-transform-object-rest-spread"],
// }
//node -r babel-register -r babel-polyfill spread_rest.js
var {x,y,...z} = {x:1,y:2,a:3,b:4}
//the rest is an object
console.assert(_.isEqual(z, {a:3,b:4} ));


//spread operator
//The spread operator flattens a nested structure.
//===================================================

//spread any iterable
//------------------
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

//spread object properties
//------------------------
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

console.assert(_.isEqual(
  {
    example1: { ...state.example1, value: 'newvalue',value2: 2 }
  },
  {
    example1: {value: 'newvalue',value2: 2 }
  }
));
