'use strict';
const _ = require('lodash');

//Destructuring of objects
//========================

//as opposit of object literal
const o1 = {o1p1:1,o1p2:2};

const {o1p1,o1p2} = o1;
console.assert(o1p1 === 1);
console.assert(o1p2 === 2);

//on other names than the properties
const {o1p1:p1 ,o1p2: p2} = o1;
console.assert(p1 === 1);
console.assert(p2 === 2);

//Destructuring of arrays
//========================
