'use strict';

//eval (should be sometime in the future) a keyword 
eval = 32;


var x = 17;
var evalX = eval("var x = 42; x;");
console.assert(evalX === 42);
console.assert(x === 17);
