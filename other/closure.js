'use strict';
const _ = require('lodash');

/*
A CLOSURE IS A SCOPE KEPT ACCESSIBLE EVEN AFTER ITS CREATOR FUNCTION CALL IS FINISHED.

TO CREATE A CLOSURE A FUNCTION CALL IS NEEDED, WHERE THE FUNCTION F
  * HAS SOME LOCAL IDENTIFIER
  * CREATES A LOCAL FUNCTION f
    * THAT USE SOME LOCAL IDENTIFIERS OF F
    * THAT IS ATTACHED _SOMEHOW_ TO AN OBJECT OUTSIDE
*/

//Each function call creates a new scope, embedded into the
//currently one according to the lexical scoping rules (or simple lexical scoping)
function F() {
};

let f = F();//A scope-call it F():scope- is created and destroyed

function F1(a) {
  return {
    b:a
  }
};

let f1_1 = F1(1);//A scope -call it F1(1):scope- is created and destroyed:
                 //the 'a' identifier is not visible outside that scope, only its value was used.
console.assert(_.isEqual(f1_1,{b:1}));//{b:1} no hint to 'a'

//To make closure from a scope
//the function must return something that can use a local identifier at a later time
//,a code block that can be used later and then uses the local identifier
//A function is a named code block and a kind of promise: I do something if you call me, until I do not something, only exists.
function F2(a) {
  return function(){
    return a;
  }
}

let f2_1 = F2(1);//A scope -call it F2(1):scope- is created and not destroyed:
                 //the 'a' identifier can be used outside that scope
                 //-> the scope must be kept accessible: it has become a closure.
                 //The 'a' identifier can not be visible but can be used.
                 //The verb 'visible' is used in lexical scoping means.
                 //The verb 'used' is used in common sense means: the value of 'a' has an effect.
console.assert(f2_1.toString() ===
`function (){
    return a;
  }`);
//'a' in F2(1):scope has an effect
console.assert(f2_1() === 1);

//The closure is closed to the function call not to the function
let f2_2 = F2(2);
console.assert(f2_2() === 2);
console.assert(f2_1() === 1);
//Here we have one function object (and its prototype object :) and two closures.
//The closures are not directly accessable by the application, they are objects in the Engine, which runs our application.

function F3(o,a){
  o.f = function(){
    return a;
  }
}
let o3_1 = {};
F3(o3_1,1);
console.assert(o3_1.f() === 1);




//'let' creates a new block scoped variable
//in each cycle assigned to the value from the last cycle.
//This syntax cheats.
// for (let i=1; i<=5; i++) {
//   	setTimeout( function timer(){
//   		console.log( i );
//   	}, i*1000 );
// }



/*
Modules are (some) private data and (some) public functions together.

They are created in an interaction between lexical scopes and closures.
*/
function Module1(){
  let s = "hi";

  return {
    getHi() {
      return s;
    },

    setHi(s1) {
      s=s1;
    }
  };
};

let module1 = Module1();
console.assert(module1.getHi()==="hi");
module1.setHi("HI");
console.assert(module1.getHi()==="HI");
let module1_other = Module1();
console.assert(module1_other.getHi()==="hi");


//Turn it to a singleton
//by adding the Immediately Invoked Function Expression pattern
let singletonModule = (function SingletonModule1(){
  let s = "hi";

  return {
    getHi() {
      return s;
    },

    setHi(s1) {
      s=s1;
    }
  };
}());

console.assert(singletonModule.getHi()==="hi");
singletonModule.setHi("HI");
console.assert(singletonModule.getHi()==="HI");

//Referencing the returned object in the inner scope allows
//to change the API!
let changableSingletonModule = (function ChangableSingletonModule1(){
  let s = "hi";

  function getHi() {
    return s;
  };

  function setHi(s1) {
    s=s1;
  };

  function addSetHi() {
    publicAPI.setHi = setHi;
  };

  function rmSetHi() {
    delete publicAPI.setHi;
  };

  var publicAPI = {
    getHi,
    addSetHi,
    rmSetHi
  };

  return publicAPI;
}());

console.assert(changableSingletonModule.getHi()==="hi");
console.assert(changableSingletonModule.setHi===undefined);
changableSingletonModule.addSetHi();
console.assert(changableSingletonModule.setHi!==undefined);
changableSingletonModule.setHi("HI");
console.assert(changableSingletonModule.getHi()==="HI");
changableSingletonModule.rmSetHi();
console.assert(changableSingletonModule.setHi===undefined);

//ES6 modules are singleton and unchangeable.
//Each file treated a module and the API components are checked for existence
//Non existing component causes error.
//No code example.

//A constructor function does the same
//The API functions/methods can be attached to 'this'.
function Module2(){
  let s = "hi";

  this.getHi = function getHi() {
      //throw new Error(); Visible task trace: Module2.getHi
      return s;
    };

  this.setHi = function setHi(s1) {
      s=s1;
    };
};
let module2 = new Module2();

console.assert(module2.getHi()==="hi");
module2.setHi("HI");
console.assert(module2.getHi()==="HI");

//A constructor function does the same
//The API functions/methods can be attached to 'this'.
function Module3(){
  let s = "hi";

  this.getHi = () => {
      //throw new Error(); This too has a visible task trace: Module3.getHi
      return s;
    };

  this.setHi = (s1) => {
      s=s1;
    };
};
let module3 = new Module3();

console.assert(module3.getHi()==="hi");
module3.setHi("HI");
console.assert(module3.getHi()==="HI");
