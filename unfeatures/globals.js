'use strict';

//Creating global variable

//1. forgetting identifier declaration (only in non-strict mode)
function forgettingDeclaringVariablesBeforeUseingDeclaresThemOnTheGlobalObject(){
  i = 1;//ReferenceError in strict mode.
}

// forgettingDeclaringVariablesBeforeUseingDeclaresThemOnTheGlobalObject();
// console.assert(global.i === 1);

//2. declaring outside of a function
//Only in a hosting environment without a module system:
//In Node not, but in browser.
var j = 2;
// console.assert(global.j === 2);

//3. explicitly adding a property to global
//In browser:
global.k = 3;
// console.assert(global.k === 3);
// console.assert(k === 1);
