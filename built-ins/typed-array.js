'use strict';
const _ = require('lodash');

//Typed Arrays are views on buffers
let ab = new ArrayBuffer(32);
console.assert(ab.byteLength === 32);
let a1 = new Uint16Array(ab);
console.assert(a1.length === 16);
let f1 = new Float32Array(ab);
console.assert(f1.length === 8);

let a = new Uint8Array(3);

a[0]=10;
a[1]=20;
a[2]=30;
a[3]=40;
console.assert(a[3] === undefined);
