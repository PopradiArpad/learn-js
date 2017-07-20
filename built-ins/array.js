'use strict';
const _ = require('lodash');

//Array likes are objects with 'length' and indexed properties
//=============================================================
  //like this object
let o = {
  0:'x',
  1:'a',
  2:'b',
  length:3
}
  //ES6 Array.from
console.assert(_.isEqual(Array.from(o),['x','a','b']));
  //like a string
console.assert(_.isEqual(Array.from('xab'),['x','a','b']));
    //ES6 spread operator
console.assert(_.isEqual([...'xab'],['x','a','b']));


// Array.from
console.assert(_.isEqual(Array.from('xab',v=>v+'_'),['x_','a_','b_']));



// Both arrays and strings have
//=============================
let a = ['f','o','o'];
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
console.assert(_.isEqual(a.concat(['b','a','r']),['f','o','o','b','a','r']));
console.assert(s.concat('bar') === 'foobar');


//but string is a primitive type:
//it will be coerced in object syntax and that functions give a new string back instead of modifing the specified one

//Borrowing non-mutable Array functions for String creation!!!
console.assert(s.join === undefined);
console.assert(Array.prototype.join.call(s,'_') === 'f_o_o');//WORKS, I ASSUME BECAUSE INDEXING AND .length WORK THE SAME WAY!!
  //more readable
console.assert([...s].join('_') === 'f_o_o');


//iterable
let it = a[Symbol.iterator]();
console.log(it.next());
