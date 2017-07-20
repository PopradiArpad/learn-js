'use strict';
const _ = require('lodash');

//Just 64 bit floating point
console.assert(42 === 42.0);

//Binary representations
//ES6
console.assert(0b11 === 3);
//from string
console.assert(parseInt('11',2) === 3);

//From string
	//parseInt is tolerant.......
console.assert(parseInt('42px') === 42);
	//coercion not
console.assert(Number.isNaN(+'42px'));


//At fractional value leading 0 is optional
console.assert(.42 === 0.42);

//Exponential form is allowed
let n1 = 5e10;
console.assert(n1.toFixed() === '50000000000');
console.assert(5e10 === 5E10);


console.assert(n1.toExponential() === '5e+10');


let n2 = 123.1234567;

//how many digits for the fractional to see?
console.assert(n2.toFixed(0) === '123');
console.assert(n2.toFixed(1) === '123.1');
console.assert(n2.toFixed(2) === '123.12');

//how many significant digitsto see?
console.assert(n2.toPrecision(1) === '1e+2');
console.assert(n2.toPrecision(2) === '1.2e+2');

//
function numbersCloseEnoughToEqual(n1,n2) {
	return Math.abs( n1 - n2 ) < Number.EPSILON;
}

var a = 0.1 + 0.2;
var b = 0.3;

console.assert(numbersCloseEnoughToEqual( a, b ) === true);
console.assert(numbersCloseEnoughToEqual( 0.0000001, 0.0000002 ) === false);

console.log(Math.pow(2,64));
console.log(Number.MAX_SAFE_INTEGER);
console.log(Math.pow(2,64)-Number.MAX_SAFE_INTEGER);
console.log(Number.MAX_VALUE);
console.assert(Number.isInteger(42));
console.assert(Number.isSafeInteger(42));



//NaN
//The result of an operation that except number(s) but get something other
//Some of the most brutals errors in the JavaScript type system are concentrated in it
console.assert(NaN !== NaN);
let nan = 1/"q";
console.assert(nan.toString() === 'NaN');
console.assert(typeof nan === 'number');
console.assert(isNaN(nan));
console.assert(isNaN('nan'));//not a number... hehe
	//ES6: some inteligent rescue:
console.assert(Number.isNaN(nan));
console.assert(! Number.isNaN('nan'));


//Infinity
//There are 2 ones
console.assert(Infinity === Infinity);
console.assert(-Infinity === -Infinity);


//Zeros
//There are 2 ones

//SOME BITWISE OPERATOR WORKS ONLY ON 32 BITS!!!!!!!!!!!
//E.g or |
let n3 =
console.log(~0b1);
