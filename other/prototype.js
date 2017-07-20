'use strict';
const _ = require('lodash');

//Prototype is an internal property of JS object
//denoted in the specification as [[Prototype]]
//The [[Get]] and [[Put]] mechanisms use [[Prototype]]

//Empty object literal creates an object. Its [[Prototype]] is Object.prototype
let emptyO = {};
console.assert(Object.getPrototypeOf(emptyO) === Object.prototype);
//[[Prototype]] is hidden
console.assert(Object.getOwnPropertyNames(emptyO).length === 0);
console.assert(Object.getOwnPropertySymbols(emptyO).length === 0);
//This is a hack access from old JS. Do not use it!
console.assert(emptyO.__proto__ === Object.prototype);


let o1 = {
  a:1,
  get accessorProperty() {console.log(`get accessorProperty this.a:${this.a}`);return 3;},
  set accessorProperty(v) {this.ap=v;},
}
console.log(Object.getOwnPropertyNames(o1));
console.log(Object.getOwnPropertyDescriptor(o1,'accessorProperty'));
//Create an object linked to the specified object as prototype.
//   o1
//   ^
//   |
//   o2
let o2 = Object.create(o1);

//Getting [[GET]]
//===============
//finds the value of the most lower propeprty with the specified name in the prototype chain
console.assert(o2.a===1);
//Getting an accessor property just resolves into the call of the 'get' function
//on the specified object
o2.accessorProperty;

//Setting  [[PUT]]
//=================
//First look up for the property in the prototype chain
//  if the first found property a data property {
//    if it's writable {
//      set/change on the SPECIFIED object (not where it's found!) SO IF SET, SET ALWAYS SHADOWED
//    } else {
//      Error in strict mode/ignored in non-strict mode. No setting anywhere!
//    }
//  } else if the first found property is a  accessor property {
//    execute its set function on the specified object. 'this' is set by normal 'this' rules
//  }
//

//property higher in the prototype chain
o2.a = 2;
console.assert(o2.a===2);
console.assert(o1.a===1);

console.assert(o1.accessorProperty===3);
console.assert(o2.accessorProperty===3);
//The assignment in case of a accessor property is only a shorter syntax for a funcion call
//The 'this' value will be set according the 'this' rules
o1.accessorProperty = 33;
console.assert(o1.ap===33);
o2.accessorProperty = 333;
console.assert(o2.ap===333);


//The 'in' operator detect the properties along the prototype chain too
//REGARDLESS OF ENUMERABILITY
console.assert('a' in o2);

//for..in goes through the prototype chain
//iterating through all enumerable property names
for(let p in o2) {
  console.log(p);
}

//But for..of needs [Symbol.iterator] function specified
//on the object prototype.
//WITHOUT THAT THIS DOESN'T WORK
// for(let v of o2) {
//   console.log(v);
// }



//Construcing
//===========

  //Each function can serve as a constructor
  //----------------------------------------
function Thing(){
  this.n=1;
}
  //Declaring a function object means declaring two objects!
    //The 'prototype' property of a function
    //---------------------------
      //is not the same as the [[Prototype]] property, which is hidden
console.assert(Thing.prototype !== Object.getPrototypeOf(Thing));
console.assert(Object.getPrototypeOf(Thing) === Function.prototype);
      //is an non-enumerable property: obviously an infrastructural property
console.assert(Object.getOwnPropertyDescriptor(Thing,'prototype').enumerable === false);
      //points to an object
console.assert(typeof Thing.prototype === 'object');
      //that has only one property: 'constructor'
console.assert(_.isEqual(Object.getOwnPropertyNames(Thing.prototype),['constructor']));
      //which is an non-enumerable property: obviously an infrastructural property
console.assert(Object.getOwnPropertyDescriptor(Thing.prototype,'constructor').enumerable === false);
      //and points to the function back: having the constructor-prototype relation two way is very handy by analysis
console.assert(Thing.prototype.constructor === Thing);

//Each function has a name in ES6
console.assert(Thing.name === 'Thing');
//The function's string represantation is its code
console.assert(Thing.toString() ===
`function Thing(){
  this.n=1;
}`);

let o3 = new Thing();
//'new'
  //creaties a new object
console.assert(typeof o3 === 'object');
  //set the prototype of the created object to the prototype of the creator function
console.assert(Object.getPrototypeOf(o3) === Thing.prototype);
console.assert(Thing.prototype.isPrototypeOf(o3));
console.assert(o3 instanceof Thing);
  //set 'this' to the newly created object
console.assert(o3.n === 1);
//the prototype property is HIDDEN
console.assert(o3.prototype === undefined);
//constructor can return something,
//in that case the by new constructed object will be discarded
function ParasiticConstructor(){
  return {a:1};
}
let o4 = new ParasiticConstructor();
console.assert(o4.a === 1);


//The 'constructor' property is a writable property of a function's prototype
function F1(){};
F1.prototype = {};
let o5 = new F1();
console.assert(o5.constructor === Object);


//Inheritence
//============

function Base(){
  this.b=1;
}

Base.prototype.getB = function getB(){
  return this.b;
}

function Derived(){
  Base.call(this);
  this.d=2;
}

Derived.prototype.getD = function getD(){
  return this.d;
}

Object.setPrototypeOf(Derived.prototype, Base.prototype);

let derived = new Derived();

//The instanceof operator checks whether the in the [[Prototype]] chain of the first arguments
//the second one's prototype occurs. The second argument must be a Callable.
//This syntax forces the for JavaScript unlucky class semantics upon.
console.assert(derived instanceof Derived);
console.assert(derived instanceof Base);
console.assert(derived instanceof Object);
//Object.prototype.isPrototypeOf should be called isInPrototypeChainOf
console.assert(Derived.prototype.isPrototypeOf(derived) === true);
console.assert(Base.prototype.isPrototypeOf(derived) === true);
console.assert(Base.prototype.getB.name === 'getB');
console.assert(_.isEqual(Object.getOwnPropertyNames(derived), ['b','d']));
console.assert(derived.getD() === 2);
console.assert(derived.getB() === 1);
console.assert(derived.nowhereDefined === undefined);










// helper utility to see if `o1` is
// related to (delegates to) `o2`
function isRelatedTo(o1, o2) {
	function F(){};
	F.prototype = o2;
	return o1 instanceof F;
}

var a = {};
var b = Object.create( a );

console.assert(isRelatedTo( b, a ) === true);
console.assert(a.isPrototypeOf(b) === true);


//The '__proto__' property is just a non-enumerable accessor property on Object.prototype
console.log(Object.getOwnPropertyDescriptor(Object.prototype,'__proto__'));





//More appropriate sintax for the JavaScript machinnery regarding objects
//=======================================================================

//Object.create TO DELEGATE
//-------------
let layer1 = {
  b:1
};
//Object.create expresses much directly the object creation than the constructor call syntax.
//A created object has initialized [[Prototype]] and properties.
//The constructor call syntax mimics the class based object orientation syntax
//and creates/initialize the new object almost as side-effect.
//All not defined property characteristic set to false:
let object = Object.create(layer1,
  {
    p1:{
      value:2
    },
    p2: {
      get(){return this.p1},
      set(v){this.p1=v}
    },
    f1: { // clumsy syntax for methods
        value: function f1(){
          console.log('f1');
        }
    }
  }
);

console.assert(Object.getPrototypeOf(object) === layer1);
console.log(Object.getOwnPropertyDescriptor(object,'p1'));
console.log(Object.getOwnPropertyDescriptor(object,'p2'));
console.log(Object.getOwnPropertyDescriptor(object,'f1'));



//mutual delegation on the [[Prototype]] chain
//--------------------------------------------

let o6 = {
  callBackO7() {
    console.log('   callBackO7');
    this.func();
  }
};

let o7 = Object.create(o6);
o7.callO6 = function callO6(){
    console.log('callO6');
    this.callBackO7();
}
o7.func = function func(){
    console.log('       func');
}

o7.callO6();


//Circular [[Prototype]] chain disallowed
//---------------------------------------
// let o8 = {};
// let o9 = Object.create(o8);
// let o10 = Object.create(o9);
// Object.setPrototypeOf(o8,o10); //This is a TypeError:

// function createBar(who){
//   return {
//     speak(){return who;}
//   }
// }
//
// let b1 = createBar("b1");
// let b2 = createBar("b2");
//
// console.assert(b1.speak() === "b1");
// console.assert(b2.speak() === "b2");


// function createBar(who){
//   return {
//     me: who,
//     identify(){
//       return "I am " + this.me;;
//     },
//     speak(){
//       return "Hello, " + this.identify() + ".";
//     }
//   }
// }
//
// let b1 = createBar("b1");
// let b2 = createBar("b2");
//
// console.assert(b1.speak() === "Hello, I am b1.");
// console.assert(b2.speak() === "Hello, I am b2.");

// //Layered chained functionality
// //top layer
// const Foo = {
//     identify(){
//       return "I am " + this.me;;
//     }
// }
//
// //middle layer
// const Bar = Object.create(Foo);
// Bar.speak = function speak(){
//       return "Hello, " + this.identify() + ".";
//     }
//
// //Only one factory function to create the product
// //The layered functionality is in simple objects on
// //the [[Protoype]] chain: no constructor or c
// function createBar(who){
//   let bar = Object.create(Bar);
//   bar.me = who;
//
//   return bar;
// }
//
// //state layer
// let b1 = createBar("b1");
// let b2 = createBar("b2");
//
// console.assert(b1.speak() === "Hello, I am b1.");
// console.assert(b2.speak() === "Hello, I am b2.");


//USE BEHAVIOR DELEGATION INSTEAD OF CLASS MODELLING
//That is much more appropriate to JavaScript.
//Layered chained functionality
//top layer
const Widget = {
    initWidget(width,height){
      this.width = width;
      this.height = height;
    },
    renderWidget(where){
      console.log(`   renderWidget to ${where}`);
    }
}

const Button = {
    initButton(width,height,label){
      this.initWidget(width,height);
      this.label = label;
      this.elem = `elem ${label}`;
    },
    renderButton(where){
      console.log(`renderButton to ${where}`);
      this.renderWidget(where);
    }
}
Object.setPrototypeOf(Button,Widget);

Button.create = function ButtonCreate(width,height,label){
  let button = Object.create(Button);
  button.initButton(width,height,label);

  return button;
}

let btn1 = Button.create( 125, 30, "Hello" );
let btn2 = Button.create( 150, 40, "World" );

btn1.renderButton( 'body' );
btn2.renderButton( 'body' );


//Concise methods have name
let o9 = {
  i:0,
  f(){
    console.log(`f i:${this.i}`);
    this.i++;
    if (this.i<3) {
      this.f();
    }
  }
};
console.assert(o9.f.name === 'f');
o9.f();
let o10 = Object.create(o9);
o10.i = 0;
o10.f();
