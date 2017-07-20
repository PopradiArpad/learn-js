'use strict';
const _ = require('lodash');


//Maps allow to use non string(able) keys

//The automatically stringification can cause unexpected keys on an object
//=======================================================================
let x = { id: 1 };
let y = { id: 2 };
let o = {};
o[x] = 'hi';
o[y] = 'hello';
// console.log(x.toString());
console.assert(o[x] === 'hello'); //because x.toString() is the same as y.toString(): [object Object]

//Map
//===
let m = new Map();
  //No bracket syntax only set/get
m.set(x, 'hi');
m.set(y, 'hello');
console.assert(m.get(x) === 'hi');
console.assert(m.get(y) === 'hello');

  //Does the map have a key?
console.assert(m.has(y));

  //no length but size
console.assert(m.size === 2);

  //iterable: the default iterator is of 'entries'
for(let it of m){
  console.log("m ",it);
}

    //the same more verbose
let it = m[Symbol.iterator]();
do{
  let itn = it.next();

  if (itn.done) {
    break;
  }
  console.log("m ",itn.value);
}while(true);

  //entries
for(let e of m.entries()){
  console.log(`e ${e}`);
}
console.log(Array.from(m.entries()));

  //values
for(let v of m.values()){
  console.log(`v ${v}`);
}

  //keys
console.log(`keys ${[...m.keys()]}`);


  //no delete operator but delete method
m.delete(x);
console.assert(m.get(x) === undefined);

  //remove all items
m.clear();
console.assert(m.size === 0);










//WeakMap should be called WeakKeyMap
//dont keep the key object alive. They allow the keys to be GC-collected. But the value is kept alive!
let wm = new WeakMap();
let x1 = {id:1};
let y1 = {id:2};
let z1 = {id:3};
let w1 = {id:4};

wm.set(x1,z1).set(y1,w1);
console.log(wm.get(x1));
console.log(wm.get(y1));
x1=null; //{id:1} is GC-eligible
//No values, entries, keys methods! to not introduce dependency on the GC state.
console.assert(wm.entries === undefined);
console.assert(wm.keys === undefined);
console.assert(wm.values === undefined);
