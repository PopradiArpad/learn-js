'use strict';
//To understand the objects in JS you must understand the types in JS.

//The 7 primary types in JS ES6
/*
  primitive types: are pure data, have no methods, are copied by assignment but NOT immutable (the identifier can point to another value)
1. string
2. number
3. boolean
4. symbol
5. null
6. undefined
  the object type
7. object                   object is only one type but with different assignment and equality rules than the non-object-types
*/
console.assert(typeof ""==="string");
console.assert(typeof 0 ==="number");
console.assert(typeof true==="boolean");
console.assert(typeof Symbol()==="symbol");
console.assert(typeof null==="object");//BUG IN THE JS SPEC!!!!! null is an own primitive type
console.assert(typeof undefined==="undefined");
console.assert(typeof {}==="object");


//Whether the type of a value is object or not determines
// the assignment: non-object-types are copied, object types are shallow copied i.e get a new refernce to the same object
// the triple equality '===': non-object-types are checked for the same values, object types are checked for the same refernced object
// the effect of non-writable and non-configurable property characteristics: the referenced object is not set non-writable or non-configurable
  //non-object-types
let s1 = "s1";
let s2 = s1;
console.assert(s2===s1);
s2 = "s2";
console.assert(s1==="s1");
console.assert(s2==="s2");
let n2 = 0;
n2++;
console.assert(n2===1);
  //object types
let oo1 = {a:1,b:2};
let oo2 = oo1;
console.assert(oo2===oo1);
oo2.a = 11;
console.assert(oo1.a===11);
console.assert(oo2.a===11);




//Object literal
//==============
//A shorthand syntax to create an object
//This is ES6 enhanced object literal
let text="hi!"
let o14={
  //property value shorthand
  text,
  //computed property key
  [text.repeat(2)]:"hihi!",
  [2+2]:"four",
  //method definition shorthand
  doIt(){return "done!";},
    //for accessor property
  get value(){return this._value;},
  set value(v){this._value = v;}
}
console.log(o14);
console.log(Object.getOwnPropertyNames(o14));

//ES6 The default object duplication is swallow duplication via '=' assignment.
let o5={
  a:2,
  b:function o5f() {return "zu"},
  c:[1,2,3],
  d:{x:22}
}
let o6 = Object.assign({},o5);
  //That means the copies object properties reference the same objects.
console.assert(o6.b===o5.b);
console.assert(o6.c===o5.c);
console.assert(o6.d===o5.d);
  //The non-object-type values will be copied.
o6.a = 22;
console.assert(o5.a===2);
console.assert(o6.a===22);
function tryChangeArguments(no,o) {
  //No way to change a non-object-type value through a different name
  //because the two names point to different memory places
  no="blu";
  //o={aa:11} has no effect:
  // because this expression means the 'o' local name should refer to another object
  // it changes the 'o' reference but not the referred object!
  //to change the refernced object dereference the reference!
  o.aa = 11;
  delete o.a;
}
let no7 = "bla";
let o7 = {a:1};
tryChangeArguments(no7,o7);
console.assert(no7==="bla");
console.assert(o7.a===undefined);
console.assert(o7.aa===11);

//Object sub-types
// String        //DO NOT USE IT DIRECTLY, JS ENGINE COERCES TO IT IN PROPERTY SYNTAX like nonObject.someProperty, COERCION WORKS ONLY VIA VARIABLE NAME, NOT BY THE LITERAL VALUE
// Number        //DO NOT USE IT DIRECTLY, JS ENGINE COERCES TO IT IN PROPERTY SYNTAX like nonObject.someProperty, COERCION WORKS ONLY VIA VARIABLE NAME, NOT BY THE LITERAL VALUE
// Boolean       //DO NOT USE IT DIRECTLY, JS ENGINE COERCES TO IT IN PROPERTY SYNTAX like nonObject.someProperty, COERCION WORKS ONLY VIA VARIABLE NAME, NOT BY THE LITERAL VALUE
// BE CAREFULL Symbol IS NOT AN OBJECT SUB-TYPE
// Object        //literal form for creation is {}
// Function      //has literal form for creation only for arrow functions: =>
// Array         //literal form for creation is []
// Date          //no literal form for creation
// RegExp        //literal form for creation is //
// Error         //no literal form for creation

//COERCION OF NON-OBJECT TYPE VALUES WORKS ONLY VIA VARIABLE NAME, NOT BY THE LITERAL VALUE
//2.toFixed() doesn't work
let n1 = 2;
console.assert(n1.toFixed()==="2");
//All primitive wrapper object has a valueOf() method
console.assert(Number(2).valueOf()===2);
console.assert(Number(2).valueOf()===2);

//Arrays are objects
let a = ["bu","ba"];
a.something = 42;
console.assert(a.something===42);
//Be careful if the key can be interpreted as number! It will.
a["2"] ="be";
console.assert(a.length===3);
console.assert(a[2]==="be");


//Properties
let o1 = {a:1};
  //property access syntax
console.assert(o1.a===1);
  //key access syntax
console.assert(o1["a"]===1);
  //The property names intern are always strings
let o3={};
o3[1]="one";
o3[o3]="obj";
console.assert(o3["1"]==="one");
console.assert(o3[1]==="one");
console.assert(o3["[object Object]"]==="obj");
console.assert(o3[o3]==="obj");
  //ES6 computed property name
let prefix = "foo";
let o4={
  [prefix+"1"]: "f1"
}
console.assert(o4.foo1==="f1");
console.assert(o4["foo1"]==="f1");
  //There is no 'method' in JS: every property is just a reference regardless of the type of the referred thing

//ES5 Property descriptors (data descriptors and accessor descriptors)
//====================================================================
/*
  The descriptor characteristics parametrize specific mechanisms:
  value:        the value of the expression 'obj.p'
  writable:     whether the 'obj.p =' assignment expression is allowed or not
  enumerable:   whether the property name is listed in the 'for(p in obj)' cycle, in Object.keys(obj), etc . Kind of privacy
  configurable: whether the property characteristics are allowed to be changed or not
*/
  //get the descriptor
let o8 = {
  a:2
}
//get the property descriptor only of this object, do not consider its parents that's why the
//function name speaks about the 'own' property descriptor
console.log(Object.getOwnPropertyDescriptor(o8,'a'));
//value:2
//writable: true
//enumerable: true
//configurable: true
//----------------------

//On object is much more a collection of key - property descriptor pairs
//as of key - value pairs.

//The Array indices are just properties and have property descriptors
console.log(Object.getOwnPropertyDescriptor(['av1','av2'],0));

//Per default all descriptor characteristics are true
//The property name is not a characteristic.
  //define property with specific descriptor characteristics
Object.defineProperty(o8,'b',
  //with this descriptor
  {
  value:3,
  writable:false,
  enumerable: false,
  configurable: false
  }
);
console.log(Object.getOwnPropertyDescriptor(o8,'b'));
  //even to modify existing property characteristics
Object.defineProperty(o8,'a',
  //with this characteristics to change
  {
  writable:false,
  }
);
console.log(Object.getOwnPropertyDescriptor(o8,'a'));

//Writable characteristic
//-------------------------
Object.defineProperty(o8,'nonWritable',
  //with this characteristics to change
  {
  value:22,
  writable:false,
  enumerable: true,
  configurable: true,
  }
);
console.log(Object.getOwnPropertyDescriptor(o8,'nonWritable'));
//o8.nonWritable = 222; throws a TypeError in strict mode, silentyl ignored in non-strict mode


//Configurable characteristic
//-------------------------
  //Non-configurable property doesn't let change its property descriptor
Object.defineProperty(o8,'nonConfigurable',{
  value: 2222,
  writable: true,
  enumerable: true,
  configurable: false
});
console.log(Object.getOwnPropertyDescriptor(o8,'nonConfigurable'));
//TypeError:
// Object.defineProperty(o8,'nonConfigurable',{
//   value: 22223,         not because of this; the value is writable
//   writable: true,
//   enumerable: false,    but because of this change
//   configurable: false
// });
//One exception: setting a writable property to non-writable is allowed
Object.defineProperty(o8,'nonConfigurable',{
  value: 22223,
  writable: false,
  enumerable: true,
  configurable: false
});
console.log(Object.getOwnPropertyDescriptor(o8,'nonConfigurable'));
  //Non-configurable property can not be deleted
//delete o8.nonConfigurable; TypeError

//Enumerable characteristic
//-------------------------
//To not let show the property in a for..in loop
Object.defineProperty(o8,'nonEnumerable',{
  value:222,
  writable: true,
  enumerable: false,
  configurable: true
})
console.assert(o8.propertyIsEnumerable('nonEnumerable')===false);// propertyIsEnumerable should be called isOwnEnumerableProperty
console.assert(Object.keys(o8).includes('nonEnumerable')===false);// Object.keys() should be called as Object.getOwnEnumerablePropertyNames:  lists only the own enumerable properties.
console.assert(Object.getOwnPropertyNames(o8).includes('nonEnumerable')===true);
o8.nonEnumerable=223;
console.assert(o8.nonEnumerable===223);
for(let p in o8){
  console.log('o8 ',p);
}
//for..in goes through all ENUMERABLE PROPERTY NAMES in the whole prototype chain
//The 'in' operator checks the existence of a PROPERTY NAME on the whole prototype chain REGARDLESS of enumerability!
//'in' true means you will have a value derefrencing this property (from the object or from its prototype chain)
//'for' means iterate/enumerate. Logically for..in goes through only the enumerable properties.
//BE CAREFULL the 'p' in
//for(let p in obj)
//is a variable that contains the property name in each cycle accordingly
//'p' in
// p in obj
// the property name itself! If you want p a variable then you must resolve it:
// [p] in obj
let o8d = Object.create(o8);
for(let p in o8){
  console.log('o8d ',p);
}


//How to make a property constant?
//Constant means not changable and not deletable
Object.defineProperty(o8,'constant',{
  value:42,
  writable: false,
  configurable: false
})
// o8.constant = 43;   TypeError
// delete o8.constant; TypeError

//How to prevent adding new properties to an object?
let o9={a:1}
Object.preventExtensions(o9);
// o9.b = 2; TypeError

//How to prevent adding new properties and removing the existing ones? (up to object reference)
let o10={a:1}
Object.seal(o10);
//o10.b = 2; TypeError
//delete o10.a; TypeError


//How to make an object constant?
//I.e prevent adding new properties and make all values const? (up to object reference)
let o11={a:1}
Object.freeze(o11);
//o11.b = 2; //TypeError
//delete o11.a; //TypeError
//o11.a = 11; //TypeError


//Property Getter/Setter
//======================
//When a getter or a setter is defined for the property then the descriptor is called
//'accessor descriptor' instead of 'data descriptor' that only holds a value

let o12={
  get a() {
       return 2;
     }
}
console.log(o12.a);
console.assert(o12.a===2);
//o12.a=3; TypeError
Object.defineProperty(o12,'b',{
  get() {
    return 3;
  },
  enumerable:true //without this enumerable is false
})
console.log(Object.getOwnPropertyDescriptor(o12,'b'));
console.assert(o12.b===3);

let o12sCValue = 4;
Object.defineProperty(o12,'c',{
  get() {
    return o12sCValue;
  },
  set(v) {
    o12sCValue = v;
  },
  enumerable:true //without this enumerable is false
})
console.assert(o12.c===4);
console.log(Object.getOwnPropertyDescriptor(o12,'c'));
o12.c=5;
console.assert(o12.c===5);


//Property existence
//==================
//checking through the prototype chain for the existence of the property NAME
//with the 'in' operator
//BE CAREFULL! IT'S ANOTHER MECHANISM AS THE for..in LOOP!
console.assert(('__proto__' in o12)===true);

//checking only on the given object
console.assert(o12.hasOwnProperty('c')===true);
//hasOwnProperty is a property of Object.prototype
//if the object was created without having the Object in its prototype chain with
let o13 = Object.create(null);// create an object without a prototype
o13.a = 1;
console.assert(('__proto__' in o13)===false);
console.assert(o13.hasOwnProperty===undefined);
//you have to call Object.prototype.hasOwnProperty explicitly setting 'this' to the object
console.assert(Object.prototype.hasOwnProperty.call(o13,'a')===true);

// The in operator checks for the existence of a property NAME not its value
//so
let a1 = [10,11];
console.assert((10 in a1)===false);
console.assert((0 in a1)===true);
let p1 = 0;
console.assert(([p1] in a1)===true);

//Iterators are a way of organizing ordered, sequential, pull-based consumption of data.
// Iterate over values of
//-----------------------
//Arrays
let a2 = [11,12,13];
  //ES5 forEach
a2.forEach((v,i)=>{
  console.log(`v: ${v}, i: ${i}`);
})
  //ES6 for..of
for(let v of a2) {
  console.log(`v: ${v}`);
}
  //
console.log(`every value is greater than 10: ${a2.every(v=>v>10)} `);
  //
console.log(`some value is less than 12: ${a2.some(v=>v>12)} `);

//By for..of loop.
//The for..of loop asks for an iterator
let it = a2[Symbol.iterator](); //a2[Symbol.iterator] is the iterator constructor!
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
