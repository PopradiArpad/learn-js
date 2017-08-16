const _ = require('lodash');
/*
The class modelling is not the natural modelling of JavaScript but possible.

The ES6 'class' is mostly a syntactic sugar above the old class implementing in JavaScript
so it solves only the awkward syntax problem but not
  * the unneeded complications bound to this modelling in JavaScript
  * the lie of 'instanceof'
  * super BINDS SURPRISINGLY IN DECLATATION TIME FOR PERFORMANCE REASONS
  * it suggests polymorphism, that doesnt fit to behavior delegation.
*/

class Thing {
  constructor(){
    console.log('       Thing constructor');
  }

  render() {
    console.log('       Thing render');
  }
}

class Widget extends Thing {
  constructor(){
    console.log('   Widget constructor');
    super();
  }

  // render() {
  //   console.log('   Widget render');
  //   super.render();
  // }
}

//Differences to the old class definitions
//---------------------------------------

//Can not be called without 'new'
// Thing.call({}); this is a TypeError

//The functions are not hoisted!

//The class definition and the method calls run in strict mode.


//instanceof
//-----------------------
class Button extends Widget {
  constructor() {
    console.log('Button constructor');
    super();
  }

  render() {
    console.log('Button render');
    super.render();
    super.valueOf();
  }
}


let button = new Button();
button.render();

console.assert(button instanceof Widget);
console.assert(button instanceof Button);
console.assert(Object.prototype.isPrototypeOf(button));
console.assert(Widget.prototype.isPrototypeOf(button));
console.assert(Button.prototype.isPrototypeOf(button));
console.assert(Object.getPrototypeOf(Button.prototype) === Widget.prototype);
// console.log(Object.getOwnPropertyNames(Object.prototype));


//Class properties (with the babel transform-class-properties plugin)
//-------------------------------------------------------------------
class AClass {
  constructor(){
    this.a = 1;
  }

  //Class properties
  //are assigned to the instance not to the prototype!
  instanceProperty = this;
  method1 = function () {
    return this;
  }
  method2 = () => {
    return this;
  }

  //Static class properties
  //are properties of the constructor function
  static staticClassProperty = this;
  static method3 = function () {
    return this;
  }
}

let aclass = new AClass();
console.assert(Object.getPrototypeOf(aclass).instanceProperty === undefined);
console.assert(aclass.instanceProperty === aclass);

console.assert(Object.getPrototypeOf(aclass).method1 === undefined);
console.assert(aclass.method1() === aclass);
let aclass_method1 = aclass.method1
console.assert(aclass_method1() === undefined);

console.assert(Object.getPrototypeOf(aclass).method2 === undefined);
console.assert(aclass_method2() === aclass);
let aclass_method2 = aclass.method2
console.assert(aclass.method2() === aclass);

console.assert(aclass.method3 === undefined);
console.assert(AClass.method3() === AClass);
console.assert(_.isEqual(AClass.staticClassProperty,{}));//babel bug?


//super
//========
/*
A lot of quirks.
It has different meaning in different places.
WARNING!
*/


//'super' BINDS SURPRISINGLY IN DECLATATION TIME FOR PERFORMANCE REASONS
//----------------------------------------------------------------------

class P {
	foo() { console.log( "P.foo" ); }
}

class C extends P {
	foo() {
		super.foo();
	}
}

var c1 = new C();
c1.foo(); // "P.foo"

var D = {
	foo: function() { console.log( "D.foo" ); }
};

var E = {
	foo: C.prototype.foo
};

// Link E to D for delegation
Object.setPrototypeOf( E, D );

E.foo(); // "P.foo"
