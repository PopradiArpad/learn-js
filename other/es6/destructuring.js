'use strict';
const _ = require('lodash');

//Destructuring
//=============
//is a structured assignment operation
//with optional declaration

//declaration is a statement
//---------------------------
var v;
//assignment is an expression
//---------------------------
console.assert((v = 1) === 1);
console.assert(v === 1);

//declaration can have an assignment
var v2 = 1;
//is two actions
//var v2; compile-time, hoisted
//v2 = 1; run-time

// Assignment from a structure without destructuring syntax
//---------------------------------------------------------

//from array
function foo() {
  return [1, 2];
}
let tmp1 = foo(),
  x1 = tmp1[0],
  y1 = tmp1[1];
console.assert(x1 === 1);
console.assert(y1 === 2);

//from object
function bar() {
  return { a: 1, b: 2 };
}
let tmp2 = bar(),
  z1 = tmp2.a,
  w1 = tmp2.b;
console.assert(z1 === 1);
console.assert(w1 === 2);

//Destructuring
//-------------------------
let source = { a: 1, b: 2, c: 3 };

//THE LEFTHAND SIDE OF A DESTRUCTURING ASSIGNMENT
//IS A _PATTERN_ FOR DECOMPOSING THE RIGHTHAND SIDE
//INTO SEPARATE VARIABLE ASSIGNMENTS.
//Pattern matching like in Haskell but only for arrays and objects
//and withe JS specific declaration and assignment rules and syntax.
let { a: ax } = source;
//is the same as
//let ax;
//ax = source.a; the inverted order of the assignment
//so the destructuring assignment's left side follows the
//structure of the right side
//not the syntactical order of assignment
console.assert(ax === 1);

//declaring with the same name in the current scope
var { a } = source;
//is the same as
// var { a:a } = source;
console.assert(a === 1);

let { b } = source;
console.assert(b === 2);

const { c } = source;
console.assert(c === 3);

//declaring with different name in the current scope
const { a: aa, c: cc } = source;
console.assert(aa === 1);
console.assert(cc === 3);

//with different name in the current scope
let target1 = {};
//surrounding braces are needed!
//because otherwise the curly braces would be taken to be
//a block statement
({ a: target1.a } = source);
console.assert(target1.a === 1);

//destructuring without declaration
let ad;
({ a: ad } = source);
console.assert(ad === 1);

//In the destructuring part any valid assignment is allowed
//---------------------------------------------------------

//computed property expression is allowed too
let pName = 'b';
({ [pName]: target1[pName] } = source);
console.assert(target1.b === 2);

//map object to an array
let a1 = [];
({ a: a1[0], b: a1[1] } = source);
console.assert(a1[0] === 1);
console.assert(a1[1] === 2);

//map array to an object
let target2 = {};
// ({0:target2.a, 1:target2.b} = [1,2,3]);
[target2.a, target2.b] = [1, 2, 3];
console.assert(target2.a === 1);
console.assert(target2.b === 2);

//swap two variables!
//--------------------
let x = 10;
let y = 20;

[y, x] = [x, y];
console.assert(x === 20);
console.assert(y === 10);

//swapping object properties doesn't work!!
//without a temporary collection the
//temporary storage is missing!
let o1 = { a: 1, b: 2 };
({ a: o1.b, b: o1.a } = o1);
//this was the same as
//o1.b = o1.a; //o1.b = 1
//o1.a = o1.b; //o1.a = 1 too
//in that order
console.assert(o1.a === 1);
console.assert(o1.b === 1);

//the destructuring allows to use a value
//form the righthand side to be used more times
//Clear, because the structure is a pattern not an object.
let { a: a3_1, a: a3_2 } = source;
console.assert(a3_1 === 1);
console.assert(a3_2 === 1);

//Destructuring allows to use nested structures
let source3 = { a: { A: [1, 2, 3, 4, 5] } };

let { a: { A: a4 } } = source3;
console.assert(_.isEqual(a4, [1, 2, 3, 4, 5]));

let { a: { A: [a5] } } = source3;
console.assert(a5 === 1);

let { a: { A: [, , a7,,a8,a9] } } = source3;
console.assert(a7 === 3);
console.assert(a8 === 5);
//unaccessible value is undefined
console.assert(a9 === undefined);

//The result of the destructuring assignment is the righthand site
//as by normal assignment too.
let a6, b6;
let da = ({ a: a6, b: b6 } = source);
console.assert(da === source);
