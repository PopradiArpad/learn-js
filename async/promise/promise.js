'use strict';
const { promisify } = require('util');

//Promises
//==============

//Let be observed by any number of observer.

//Remark about promisify
//It wraps and use a CPS style function
const resolveLater = promisify((v, cb) => {
  setTimeout(() => cb(null, 42 + v), 100);
});

let p = resolveLater(1);
p.then(v => console.log(`resolved 1 ${v}`));
p.then(v => console.log(`resolved 2 ${v}`));
