

//arguments (should be sometime in the future) a keyword
//arguments = 32;

//In strict mode the arguments will be not reassigned
function noReassign(a) {
  'use strict';
  a = 42;
  console.assert(a===42);
  console.assert(arguments[0]===4);
}

var p = 4;
noReassign(p);
console.assert(p===4);

//In non-strict mode the arguments will be reassigned
function reassign(a) {
  a = 42;
  console.assert(a===42);
  console.assert(arguments[0]===42);
}

var p1 = 4;
reassign(p1);
console.assert(p1===4);


function copyArguments() {
             //reset the 'this' of the current slice call
             //make the call
             //it's like
             //arguments.slice()
  var args = [].slice.call(arguments);
  //a variant:
  // var args = Array.from(arguments);

  console.log(`args ${args}`);
}

copyArguments(1,2,'bla');
copyArguments([1,2,'bla']);
