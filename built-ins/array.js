'use strict';
const _ = require('lodash');

//Array likes are objects with 'length' and indexed properties
//=============================================================

//Creating arrays
//================

//ES2015 Array.from
//-----------------
//.. an array-like
let o = {
  0: 'x',
  1: 'a',
  2: 'b',
  length: 3
};
console.assert(_.isEqual(Array.from(o), ['x', 'a', 'b']));
//.. an iterable
console.assert(_.isEqual(Array.from('xab'), ['x', 'a', 'b']));
//with ES6 spread operator
console.assert(_.isEqual([...'xab'], ['x', 'a', 'b']));
//with a map function
//Array.from :: array-like or iterable, map function, [thisArgs]
console.assert(_.isEqual(Array.from('xab', v => v + '_'), ['x_', 'a_', 'b_']));

//ES2015 Array.of
//fixes the design error of Array(number)
//-----------------------------------------
console.assert(_.isEqual(Array(2), [undefined, undefined]));
console.assert(_.isEqual(Array.of(1, 2, 3), [1, 2, 3]));

//Deleting items
//---------------
//The delete operator works on a property,
//it doesn't do what we mostly want in case of arrays.
let a1 = [1, 2, 3];
delete a1[1];
console.assert(_.isEqual(a1, [1, undefined, 3]));
//splice is to the rescue
//It's destructive!
let a2 = [1, 2, 3, 4];
a2.splice(1, 2);
console.assert(_.isEqual(a2, [1, 4]));
//splice changes the array from the element
//defined in the first argument
//It can delete and add too.
let a3 = [1, 2, 3, 4];
a3.splice(1, 2, 12, 13);
console.assert(_.isEqual(a3, [1, 12, 13, 4]));


//Getting a subarray
//------------------
console.assert(_.isEqual([0,1,2,3,4].slice(1,3),[1,2]));

// Both arrays and strings have
//=============================
let a = ['f', 'o', 'o'];
let s = 'foo';
//indexing
console.assert(a[1] === 'o');
console.assert(s[1] === 'o');
//length
console.assert(a.length === 3);
console.assert(s.length === 3);
//indexOf
console.assert(a.indexOf('o') === 1);
console.assert(s.indexOf('o') === 1);
//concat
console.assert(
  _.isEqual(a.concat(['b', 'a', 'r']), ['f', 'o', 'o', 'b', 'a', 'r'])
);
console.assert(s.concat('bar') === 'foobar');

//but string is a primitive type:
//it will be coerced in object syntax and that functions give a new string back instead of modifing the specified one

//Borrowing non-mutable Array functions for String creation!!!
console.assert(s.join === undefined);
console.assert(Array.prototype.join.call(s, '_') === 'f_o_o'); //WORKS, I ASSUME BECAUSE INDEXING AND .length WORK THE SAME WAY!!
//more readable
console.assert([...s].join('_') === 'f_o_o');

//iterable
let it = a[Symbol.iterator]();
console.log(it.next());
