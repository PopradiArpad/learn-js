'use strict';
const _ = require('lodash');

//Arrow functions
///==============

//has no name
const af1 = () => this;

//it's not possible to use them in
// * recursion
// * bind/call/apply because 'this' is lexically scoped
let o1 = { a: 1 };
console.assert(af1.bind(o1)() !== o1);

//The value of 'this' in an arrow function
//fixed to the value of 'this' in its surrounding creator scope
//instead of being set dynamically at call-site.
let o2 = {
  mkAf() {
    return () => this;
  },
  myA: [1, 2, 3],
  addZipped(a) {
    //'this' here is set by the 4 'this' setting rules
    //dynamically
    return a.map((v, i) => {
      //'this' here is fixed to 'this' in the surrounding scope
      return v + this.myA[i];
    });
  }
  //This wouldn't work
  //because 'this' is set by the map function
  // addZipped2(a){
  //   a.map(function(v,i){
  //     return v+this.myA[i]
  //   })
  // }
};
let af2 = o2.mkAf();
console.assert(af2() === o2);
console.assert(_.isEqual(o2.addZipped([10, 20, 30]), [11, 22, 33]));

let o3 = {
  myA: [4, 5, 6]
};
let af3 = o2.mkAf.call(o3);
console.assert(af3() === o3);
console.assert(_.isEqual(o2.addZipped.call(o3, [10, 20, 30]), [14, 25, 36]));
