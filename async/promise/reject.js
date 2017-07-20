'use strict';

let p1 = new Promise(function(resolve, reject) {
  reject(42);
});

let p2 = Promise.reject(42);

//p1 and p2 are equivalent

//Rejected promises must be handled
//unless it's a programming error.
p1.then(null,()=>{});
p2.then(null,()=>{});
