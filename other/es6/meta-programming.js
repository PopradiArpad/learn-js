'use strict';

//If there is a name that will be used
//------------------------------------
function f1() {};
console.assert(f1.name === 'f1');

let f2 = function f3(){};
console.assert(f2.name === 'f3');

//If there is a name to infer that will be used
//---------------------------------------------
let f4 = function(){};
console.assert(f4.name === 'f4');


function checkNameOf(f) {
  console.assert(f.name === '');
}

checkNameOf(function(){});


//toString()
function Type1() {}

let t1 = new Type1();
console.assert(t1.toString() === '[object Object]');
