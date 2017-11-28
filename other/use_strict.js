//This must be the first statement
'use strict';
/*
  Strict mode is defined in ECMAScript5.

  Through the changes by 'use strict' in the JS code you can learn a lot of about JS most
  basic features:
    * assignments
      to non-existing,const/non-writable values silently failed.
    * objects
      * can be extensible and not extensible
    * object properties
      * can be getter only
      * can be non-writable
    * functions
      * with duplicated arguments was allowed.
    * primitive values
      * , setting properties to them was silently ignored
    * eval
      * 's last value during the expression will be the return value of the eval expression.
      * without strict mode eval evaluates in the surrounding scope causing (re)definitons of variables there.
      * without strict mode eval is overwritable but really it should be a keyword
*/


//Failing assignments
//--------------------

// //to undefined variable
//zu = 3;
//
// //to constants
//   //to global constant
// Infinity = 5;
// console.log(Infinity);
//
//   //to non-writable property
// var o = {};
// Object.defineProperty(o,'x',{value:42,writable:false});
// o.x = 23;
// console.log(o.x);
//
// //to a getter only property
// var o2 = { get x(){return 422;}};
// o2.x = 11;
// console.log(o2.x);
//
// //to a property of a non-extensible object
// var fixed = {};
// Object.preventExtensions(fixed);
// console.log(Object.isExtensible(fixed));
// fixed.newProp = 42;
// console.log(fixed);
//
// function err(a,a,b) {
//
// }
//
// var x = 015;
//
// var x = 17;
// var evalX = eval("var x = 42; x;");
// console.assert(evalX === 42);
// console.assert(x === 17);


/*
  Silently ignored absurd operations throw error.

  They are absurd so can not be executed, but that means they are useless, so
      either remove them
      or fix regarding the intention
*/
//
// var x = 42;
// delete x;
// console.assert(x===42);
