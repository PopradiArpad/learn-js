var _ = require('lodash');

// DO NOT MIX 'this' WITH LEXICAL SCOPE!!!

/*
  'this' in non-arrow function is always local and dynamic
  There is a call primitive in the form Function#call(thisValue,..otherArgs)
  What is the this in the syntactic sugar versions?
    * No this specified:
      * in strict mode undefined
      * in non-strict mode global/window
    * as method call on an object
      the object
    *
*/

//Top level scope in Node.js and in the browser
//---------------------------------------------
//in Node.js and ES6 the top level scope is the module level scope (each module has an own scope)
//and 'this' in a module simply refers to that.
//
//In the browser ES6 is mostly implemented but modules not,so
//there are no modules, the top level scope is the global scope (window)

console.assert(_.isEqual(this,{}));

//The call primitive
//All other calling mechanism are only a syntactic sugar to this.
function concatThisAndArgument(arg) {
  return this+arg;
}
console.assert(concatThisAndArgument.call("hello ","world")==="hello world");




//The 'this' in strict mode
//-------------------------
function implicitThisInStrictMode() {
  'use strict';
  // this.definedInFunStrict=22;
  return this;
}

// If no 'this' is defined than it's undefined.
console.assert(implicitThisInStrictMode()===undefined);
// The 'this' is the thing itself, without forcing it to an object
console.assert(implicitThisInStrictMode.call(2)===2);

//The 'this' in non-strict mode
//-----------------------------
function implicitThisInNonStrictMode() {
  this.definedInFunNonStrict=11;
  return this;
}

//If 'this' is not defined it's the global object (global in Node.js, window in the browser)
// WHAT A BIG CONTRAST!
// IN NON-STRICT MODE AN UNDEFINED 'this' MEANS THE GLOBAL SCOPE (NOTHING MEANS EVERYTHING)
console.assert(_.isEqual(implicitThisInNonStrictMode(),global));
console.assert(definedInFunNonStrict===11);
//The 'this' in non-strict mode is forced to be an object
var boxed2 = implicitThisInNonStrictMode.call(2);
console.assert(boxed2!==2);
console.assert(! _.isEqual(boxed2,global));
var boxedHi = implicitThisInNonStrictMode.call("Hi!");
console.assert(boxedHi!=="Hi!");
console.assert("Hi!"==="Hi!");



// //Calling a function without explicitly defined this subsitues different this values
// //in browser and in node.
// var obj = {
// 	id: "awesome",
// 	cool: function coolFn() {
// 		console.log( this.id );
// 	}
// };
// var id = "not awesome";
// obj.cool(); // awesome
// setTimeout( obj.cool, 100 ); // 'not awesome' in browser because 'this''s value is window, undefined in node because 'this' points to the Timeout module(constructor?)


//The arrow function is a syntactic sugar to
// 1,making anonymous function
// 2,function call with 'bind(this)'
let o = {
  v:2,
  f() {
    return this.v;
  },
  callFViaArrowFunction(){
    return (()=>this.f())();
  }
}
console.assert(o.f()===2);
console.assert(o.callFViaArrowFunction()===2);
console.assert(function() {
                  return this.f();
                }.bind(o)()===2);

//      Binding 'this'
//-----------------------
/*
  4 rules depending on the call-site at runtime.
  In decreasing precedence.

  4, new binding
     let obj = new someFunc();
     'this' is set to a newly created empty object.
  3, explicit binding
     1, foo.call(obj,...args);
     2, foo.apply(obj,...args);
     3, let anotherFunc = foo.bind(obj)
        set 'this' to obj and the the anotherFunc(arg) call doesnt change that.
  2, implicit binding:
     obj.foo()
     'this' is set to obj.
     Both . and () are needed!!
     obj.foo is only the foo function not a call to it, therefore no 'this' is bound!
  1, simple function call: default binding.
    foo()
    'this' is set
      in strict mode: to undefined. it sounds logical: it's really not defined
      in non-strict mode: to the global value (in browser window, in node global). it sounds a not-well-thought shortcut for small programms.
*/


//Hard binding is explicit defining the binded 'this' in the case of a call without explicit 'this'
function foo(arg) {
  //console.log(this.a+arg);
  return this.a+arg;
}

function bind(f,obj) {
  return function() {
    return f.apply(obj,arguments);
  }
}

o={
  a:42
}
o1={
  a:8
}
let a=2;
let bar = bind(foo,o);
console.assert(bar(42)===84);
//ES5 Function#bind does the same
let hardBoundFoo = foo.bind(o);
console.assert(hardBoundFoo(42)===84);
//bind is hard: later bind can't change the 'this' bound!
console.assert(hardBoundFoo.bind(o1)(42)===84);
  //This is true for the lexical bound 'this' of the arrow functions too!
//in ES6 its name is
console.assert(hardBoundFoo.name==='bound foo');


//Many library's functions, and indeed many new JS built-in functions use a parameter
//to define the 'this' value to apply
// console.log([1,2,3].forEach(foo,o));


//explicitly binding to null or undefined brings back to default binding
global.a = 11;
console.assert(foo.bind(null)(42)===53);
delete global.a;
