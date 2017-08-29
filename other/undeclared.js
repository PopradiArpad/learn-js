// 'use strict';

//ReferenceError is a compile-time error:
//can not be caught with try..catch
//This doesn't work
// try {
//   let x = y;
// } catch (e) {
//   console.log(e);
// }

//But this function definition works!
function f() {
  let x = y;
};

//Only try it not call without a catch...
//It would be a ReferenceError of course.
// f();


console.assert(typeof a === 'undefined');//should be 'undeclared'

//assignment to undeclared identifier
// * is allowed in non-strict mode
// * declares a property on the global/window object!
b = 1;
console.assert(global.b === 1);

var c = 2;
console.assert(global.c === undefined);

function withUndeclared1() {
  d = 1;
  console.assert(global.d === 1);
}

withUndeclared1();

function withUndeclaredInStrictMode() {
  'use strict';

  //In strict mode this is uncaughtable ReferenceError error
  // e = 1;
  // console.assert(global.e === 1);
}

withUndeclaredInStrictMode();
