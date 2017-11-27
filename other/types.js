'use strict';
const _ = require('lodash');
//The JavaScript identifiers (aka variables) dont have types, but the values do!

//The 7 primary types in JS ES6
/*
  primitive types: are pure data, have no methods, are copied by assignment but NOT immutable (the identifier can point to another value)
1. string
2. number
3. boolean
4. symbol
5. null
6. undefined
  the object type
7. object                   object is only one type but with different assignment and equality rules than the non-object-types
*/

//'typeof's specification is full with inconsistence and bugs
//===========================================================
console.assert(typeof ""==="string");
console.assert(typeof 0 ==="number");
console.assert(typeof true==="boolean");
console.assert(typeof Symbol()==="symbol");
console.assert(typeof null==="object");//BUG IN THE JS SPEC!!!!! null is a primitive type on its own!
console.assert(typeof undefined==="undefined");
console.assert(typeof {}==="object");
//------------------------------------------
console.assert(typeof function f(){} ==="function");//ANOTHER BUG IN THE JS SPEC!!!!! 'function' is not a primitive type on its own! It's always an object!
console.assert(typeof [] ==="object");//BUT 'array' IS NOT HANDLE SO: INCONSISTENCE! double facepalm....
console.assert(typeof notDeclared === 'undefined');//THIS SHOULD THROW A ReferenceError!!!!!
                                                   //BUT DOESNT BECAUSE IT ACTS LIKE THE NON-EXISTING isdeclared OPERATOR,WHICH RETURN VALUE IN THIS CASE SHOULD BE false
// console.log(notDeclared); //LIKE THIS!!!!

//Truely values
//==============
let o = {}
console.log(!! o);

//Object detection (an array is an object)
function isObject(val){
  return (
    typeof val === 'object' &&
    !! val && // to filter null, because typeof null is 'object'
  );
}

//Functions
//==============
/*
  A function is a 'callable object': it has a [[Call]] internal property.
*/
function f1(a,b){}
console.assert(typeof f1 ==="function");
console.assert(f1.length === 2);
console.assert(f1.name === 'f1');//ES6

//The 'global' / 'window' variable
console.log(Object.getOwnPropertyNames(global));


//void
//It turns undefined whatever value is after that
console.assert(void 42 === undefined);
