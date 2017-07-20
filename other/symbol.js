'use strict';
//Symbols are not object!
//let sy1 = new Symbol(); TypeError

//Symbols can be stored and compared that's all
//The optional creation argument is only for debugging
console.assert(Symbol("s")!==Symbol("s"));
const s1 = Symbol();
const s2 = s1;
console.assert(s1===s2);
//There is a global symbol table
let globalSymbol = Symbol.for("a_global_symbol");
console.assert(globalSymbol===Symbol.for("a_global_symbol"));
//'s values are accessable via the name
console.assert(Symbol.keyFor(globalSymbol)==="a_global_symbol");



//Symbols are to create
// non-enumarable
// anonymous (non-string)
//property names/keys
//MOSTLY FOR METAPROGRAMMING
//THEY LET REPLACE JS DEFAULT ALGORITHMS IN JS OPERATORS (e.g instanceof) AND BUILT-IN FUNCTIONS (for..of)
let o1={}
let anonymousNonEnumerable = Symbol();
o1[anonymousNonEnumerable] = '_secret_';
o1[Symbol.for("a_global_symbol")] = '_secret2_';
console.log(o1);
console.assert(o1[anonymousNonEnumerable]==='_secret_');
console.assert(Object.getOwnPropertyNames(o1).length===0);//anonymous: has no name
console.assert(Object.getOwnPropertySymbols(o1)[0]===anonymousNonEnumerable);//but defined
console.assert(anonymousNonEnumerable in o1);//The 'in' operator detects symbols too.
let enumerableProperties = [];
for(let propertyName in o1){enumerableProperties.push(propertyName)};
console.assert(enumerableProperties.length===0);//non enumerable


//METAPROGRAMMING
//===============

//Overwrite the instanceof operator for a given constructor

// Definition 1
// Defining a static function on the object itself with the class syntax works.
// class MyClass {
//   static [Symbol.hasInstance](lhs) {
//     return Array.isArray(lhs);
//   }
// }

//TODO FIX EXPLANATION
// Definition 2
// Defining the [Symbol.hasInstance] labeled method after object creation
// is not possible with the normal property assignment syntax
// because that property already exists up in the prototype chain and is non-readable
// function MyClass() {};
// console.log(`Symbol.hasInstance in MyClass: ${Symbol.hasInstance in MyClass}`);//true
// console.log(`Symbol.hasInstance in MyClass.prototype(${MyClass.prototype.constructor}): ${Symbol.hasInstance in MyClass.prototype}`);//false
//   // console.log(Object.getOwnPropertySymbols(MyClass));
//   // console.log(Object.getOwnPropertySymbols(MyClass.prototype));
// MyClass[Symbol.hasInstance] = function(lhs) {
//   return Array.isArray(lhs);
// }

// Definition 3
// define the property explicitely on this object.
//function MyClass() {};
//Object.defineProperty(MyClass,Symbol.hasInstance,{
//     value: function(lhs) {
//       return Array.isArray(lhs);
//     }
// });

// Definition 4
// define the object with literal object syntax with the new property right away on the object
const MyClass = {
  [Symbol.hasInstance]: function(lhs) {
        return Array.isArray(lhs);
      }
};
console.assert(Symbol.hasInstance in MyClass);
console.log(Object.getOwnPropertySymbols(MyClass));
console.log(Object.getOwnPropertyDescriptor(MyClass,Symbol.hasInstance));
console.assert([] instanceof MyClass);


//for..of
  //for an array
const a1 = [11,12,13];
for(let v of a1) {
  console.log('iterating in for..of ', v);
}

let it = a1[Symbol.iterator]();
let itv;
while (itv = it.next()) {
  if (itv.done) {
    break;
  }

  console.log('iterating per hand ', itv.value);
}


  //for an own class
class MyClass2 {
  constructor(a) {
    this.a = a;
  }

  // *[Symbol.iterator]() {
  //   for (let v of this.a) {
  //     yield v;
  //   }
  // }

  [Symbol.iterator]() {
    let i=-1;
    let that=this;

    return {
      next() {
        i++;
        return {
          value:that.a[i],
          done:i===(that.a.length)
        }
      }
    }
  }

};
const mc2 = new MyClass2(a1);
for (let v of mc2) {
  console.log('iterating in MyClass2 ', v);
}

const mc3 = new MyClass2(a1);
let it3 = mc3[Symbol.iterator]();
let itv2;
while(itv2 = it3.next()) {
  if (itv2.done) {
    break;
  }
  console.log('iterating in MyClass2 2 ', itv2);
}

const s3 = "hali";
let it4 = s3[Symbol.iterator]();
console.log(s3['toUpperCase']());
let itv4;
while(itv4 = it4.next()) {
  if (itv4.done) {
    break;
  }
  console.log('iterating in ', itv4);
}
