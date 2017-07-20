'use strict';

// DO NOT MIX 'this' WITH LEXICAL SCOPE!!!

//A local variable is attached to the local lexical scope
//it's not a property of 'this'!
var v = 1; //define to the lexical scope
console.log(this);//{}
this["bla"] = 2;
console.log(this);//{bla:2}

//the same names simply overwrite itself, last wins.
var a = 3;
var a = 33;
console.assert(a===33);

//The encapulating scopes are visible
function fa() {
  //a defined in t
  console.assert(a===33);

  //The encapulated ones not
  function faa() {
    var faav = 4;
  }
  //faav is not visible here
}

fa();


//'var' has function scope
function fiVar() {
  for(var i=0;i<3;i++){
    console.log("in for loop i",i);
  }

  console.log("outside of the for loop i",i);
}

fiVar();


//'let' has block scope
function fiLet() {
  for(let i=0;i<3;i++){
    console.log("in for loop i",i);
  }

  //console.log("outside of the for loop i",i); i is not defined
}

fiLet();

//catch's argument is block scoped
function catchHasBlockScope() {
  try {
    throw new Error('bumm!');
  } catch (e) {
    console.log(`catched ${e.message}`);
  } finally {
    // console.log(e); e is not defined
  }
}

catchHasBlockScope();


function varIsHoisted() {
  console.log(a);
  var a = 2;
}

varIsHoisted();

// function letIsNotHoisted() {
//   console.log(a);
//   let a = 2;
// }
// letIsNotHoisted();

for(let i=0;i<4;i++){
  setTimeout(function f() {
      console.log(i);
    },i*100);
}
