'use strict';
const _ = require('lodash');

//Set is to determine existence in O(1)
let s = new Set(
  [1,1,2,2,3]
)
//it's unique
console.assert(_.isEqual([...s],[1,2,3]));
console.assert(s.size === 3);
//has
console.assert(s.has(1));
//delete
s.delete(1);
console.assert(s.has(1) === false);
//add
s.add(4).add(5);
console.assert(s.has(5));
//clear()
s.clear();
console.assert(s.size === 0);

//Iterators of Set
//================

let o = {id:1};
s = new Set([1,1,1,2,2,3,3,o,o])
//
for(let e of s){
  console.log(e);
}
for(let e of s.entries()){
  console.log(`entries ${e}`);
}
for(let e of s.values()){
  console.log(`values ${e}`);
}
for(let e of s.keys()){
  console.log(`keys ${e}`);
}
