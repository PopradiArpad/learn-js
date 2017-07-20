'use strict';
const _ = require('lodash');

//Statements
//==========
//Each statement has a COMPLETION VALUE in JavaScript, but that can be undefined
//The COMPLETION VALUE is not usable in the programm itself. Only the REPL(Read/Evaluate/Print/Loop) writes out.

//The declaration statement
let cx;//its completion value is 'undefined'

//The block
{
  1+1;//This is an expression statement. Its completion value is 2.
}//Its COMPLETION VALUE is the last statements value;



//Expressions
//that can be evaluated to a value
//================================
let ax = 1;
let bx = 2;

//Assignment expression
// console.log(b=a);//prints 1


//Logic values:
//-------------
  // true
  // false

//These values will be coerced to 'false': THE FALSY LIST:
/*
null
undefined
""                           EMPTY STRING
-0,(+)0,                     THE NULLS
NaN                          THE NOT A NUMBER
*/
//ALL OTHER ONES TO 'true'
//  inlcuding {},[] because they are all objects.

console.assert(!! {} /*=== true*/);
console.assert(!! new Boolean(false) /*=== true*/); // new Boolean(anything) is an object and all objects have truthy value.
//USE Boolean WITHOUT new TO CONVERT!
console.assert(Boolean(false) === false);

//Logic expressions
//-----------------

//Logical operators
//-----------------
//&& and || select the first expression that
// for && has falsy value
// for || has truthy value
//THEIRS VALUE IS NOT A BOOLEAN VALUE BUT ONE OPERAND. Like in Ruby, unlike in C.
//They are evaluated from left to right until it's clear what boolean value the expression as a whole WOULD HAVE.

// e1 && e2 returns e1 if e1 can be converted to false otherwise returns e2
console.assert((true && "" && true) === "");
console.assert((true && undefined) === undefined);
console.assert((true && 2) === 2);

// e1 || e2 returns the first expression that has a truthy value
console.assert(('' || 2) === 2);
console.assert(('' || -0 || 2 || false) === 2);

// ! e1 must be a boolean value (What would be 'not {}' or 'not 2' as non-boolean?)
//The 'not' is a real logical operator


//Precedence
/*


  The logical operations must be later than any operations that are needed to decide:
  To decice (execute logical operations) we need data created by the other operators.

  all logical operators have higher precedence then the assignment:
  first decide, than assign

&&               'and' has higher precedence then 'or' like in the natural langueges:
                 What do you want? Apple and nuts or banana and kiwi? == (Apple and nuts) or (banana and kiwi)
||

?:              The ternary must be the lowest decition operator to let group the 'and' and 'or' first
                because '?:' is a comprimised if-then-else:
                a ? b : c ===  if (a) {
                                 return b;
                               } else {
                                 return c;
                               }

=               Assign only after the decision is made.

,               Lowest ever to let initialize (therefore assign) variables on one line, e.g in a for loop
*/

//Associativity
/*
a && b && c === (a && b) && c             left associative to read it naturally

a || b || c === (a || b) || c             left associative to read it naturally

a ? b : c ? : d : e === a ? b : (c ? : d : e)         IS RIGHT ASSOCIATIVE
TO READ THE CONDITIONS AS IF/(ELSE IF)+/ELSE STATEMENT FROM LEFT TO RIGHT

if (a)
  b
else if (c)
  d
else
  e

var a = b = c === var a = (b = c);         can only by right associative

*/

var a = 42;
var b = "foo";
var c = false;

var d = a && b || c ? c || b ? a : c && b : a;

//&&   first
// var d = (a && b) || c ? c || b ? a : (c && b) : a;

//||   second
// var d = ((a && b) || c) ? (c || b) ? a : (c && b) : a;

// ?:  third: from right to left, '?' and ':' belong together
// var d = x ? (y ? z : w) : q;

// =   fourth
// var d = ((a && b) || c) ?     ( (c || b) ? a : (c && b) )          : a;

// var d = if ((a && b) || c) {
//   if (c || b) {
//     return a;
//   } else {
//     return (c && b);
//   }
// } else {
//   return a;
// }

console.assert(d === 42);

var d1 = ((a && b) || c)
 ? (
   (c || b)
    ? a
    : (c && b))
 : a;
console.assert(d1 === 42);



//Bitwise operators
//--------------------
//threat their operand as a 32 (NOT 64!) BIT SIGNED INT IN TWO'S COMPLEMENT FORMAT
//Two's complement of x is
// 1. step: negate bitwise (that is the one's complement)
// 2. step: add 1 to that (the reult is the two's complement)

//Negative's number's first bit is 1.
//THE RESULT IS ALWAYS A NUMBER CONVERTED BACK FROM THE 32 BIT TWO'S COMPLEMENT INTO THE FLOAT IEEE-754?

//The operators act bitwise, they dont see the meaning of the bits (two's complement).
//The two's complement is important only at the converting into and back from the 32 bit.


//Labeled-loops
//-------------
{
  loop1:for(let i=0;i<10;i++){
    for(let j=0;j<1;j++){
      if ((i>3)&&(i<7)) {
        break loop1;
      }
      console.log(i);
    }
  }

  console.log('-----------');
  loop2:for(let i=0;i<10;i++){
    for(let j=0;j<1;j++){
      if ((i>3)&&(i<7)) {
        continue loop2;
      }
      console.log(i);
    }
  }
}



//Try.. catch.. finally
//----------------------

//Finally runs even in case of non linear controll statements
/*like
  return
  continue
  break
*/

// finally runs before returning
function tcf1(){
  try {
    return 42;        //sets up the COMPLETION VALUE for the tcf1() call but doesnt return immediately
  } finally {
    console.log("finally runs!");
  }

  console.log("never runs");
}

console.log(tcf1());//logs:
                    //finally runs!
                    //"42"

// finally runs before continue
for (var i=0; i<10; i++) {
	try {
		continue;
	}
	finally {
		console.log(`after continue ${i}`);
	}
}

// BUT finally DOESN'T RUN BEFORE yield!!
// Because the function is not finished yet.
function* tcf3(){
	try {
		yield 1;
    // return 100; //acts as a yield value with done set to true
		yield 2;
		yield 3;
	}
	finally {
		console.log(`after last yield`);
	}
}
let it = tcf3();
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

for(let i of tcf3()) {
  console.log(`'for of' if an iterator ${i}`);
}


//finally can reset the COMPLETION VALUE
function tcf4(){
  try {
    return 42;
  } finally {
    return 2;
  }
}
console.assert(tcf4() === 2);

//finally can reset the COMPLETION VALUE
function tcf5(){
  try {
    return 42;
  } finally {
    return;
  }
}
console.assert(tcf5() === undefined);

//finally without return doesnt touch the already set COMPLETION VALUE
function tcf6(){
  try {
    return 42;
  } finally {
  }
}
console.assert(tcf6() === 42);

//Exception from a finally is an uncaught expection
// function tcf2(){
//   try {
//     return 42;        //sets up the COMPLETION VALUE for the tcf1() call but doesnt return immediately
//   } finally {
//     throw new Error('Ooops!');
//   }
//
//   console.log("never runs");
// }
// console.log(tcf2());



//Switch
//-------

//uses ===
let sv = 10;

switch (sv) {
  case 10:
    console.log(`case 10`);
    break;
  default:
}

//can use any true not truthy value!
switch (true) {
  case sv.toString().length < 3:
    console.log(`case sv.toString().length < 3`);
    break;
  default:
}
