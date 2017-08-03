'use strict';
const _ = require('lodash');
const util = require('util');

//Generator Mechanism
//===============================
/*are pausable and rerunable functions with iterators on the interface.
It's a kind of cooperative concurrency.
They give back an iterator at the call of the generator but that doesnt have a syntactical sign.
The generator function has an own scope: it's a great place to define closure for the running iterator.

The iterators run synchronously with the caller context
-------------------------------------------------------
Iterators have the same time behavior as functions: synchronously.
Without this the iteration through an available collection
would be very strange. We want to keep the semantic of a for loop.

But the iterator mechanism combined with Promises allows us to define
a very synchronous-looking asyncronous code. That is the
async/await syntax. That has a asyncronous semantic.


The creation and useage are two different lifecycle steps like of an object.
----------------------------------------------------------------------------
But there is no explicit constructor for iterators, the generator function call acts as constructor
and is visible syntactical only at the 'function*' keyword.
The generator defines the closure of the iterator and the code chunks that are parted by 'yield's in one function body.

The return values from the function scope are wrapped into this object:
------------------------------------------------------------------------
  {
  value: the value after 'yield' or 'return'
  done: true if the value comes from a return or the function is finished (which is an implicit 'return undefined')
  }

The got iterator holds the function scope on leash
--------------------------------------------------
  1. giving value of the waiting yield expression (not in the first 'next' call, then there is no waiting 'yield')
  2. letting it run to the next yield and getting the value of it as expression value of 'next'


The two interfaces at generator iterator useage
----------------------------------------------

1. The GENERATOR interface: 'function*'   IT RETURNS AN ITERATOR
                                          It's not needed to make an iterator, it must only return one.

2. The ITERATOR  interface                IT HAS A 'next' FUNCTION WITH THE {value,done} RETURN VALUE.
                                          The 'function*'-'yield' syntax generates such an object,
                                          but its possible to make it per hand.

The iterator object can have both interfaces like the iterators which are come from a 'function*' call.
Its generator has the standard generator labeled [Symbol.iterator] and gives back itself.

The four syntactic elements of the generator mechanism
------------------------------------------------------
1. 'function*'
2. 'next'
3. 'yield' | 'return'
4. {value,done}

Syntactic sugar for iteration
------------------------------
The for..of loop

IT CALLS THE [Symbol.iterator] LABELD GENERATOR TO CREATE THE ITERATOR.
AND HANDLES 'done' AUTOMATICALLY, YOU GET ONLY THE 'value'.
IT CAN NOT PASS VALUE TO 'next'.

Iterable
--------
is an object that has a [Symbol.iterator] labeled generator.

In ES6
  Array,
  Set,
  Map,
has that.
*/

function* g1(){
  console.log('g1 before yield 1');
  yield 1;

  console.log('g1 before yield 2');
  yield 2;

  console.log('g1 before return 3');
  return 3;
}

console.log(Object.getPrototypeOf(g1()).constructor.name);

//The generator function body doesnt run at call!
//An iterator is created which has the function on a leash
let it = g1();

//the first next() on the iterator starts the function and let it stops at the first 'yield' expression.
//which value is the value in the 'value' property.
console.assert(_.isEqual(it.next(),{value:1,done:false}));

//The subsequent next() call resume the function until the next yield statement.
console.assert(_.isEqual(it.next(),{value:2,done:false}));

//'return' set the iteration done with the definitive last value
console.assert(_.isEqual(it.next(),{value:3,done:true}));

//Since the last result 'done' is true and the value is 'undefined'
console.assert(_.isEqual(it.next(),{value:undefined,done:true}));
console.log();


//Generator without return:
//
function* g2(){
  console.log('g2 before yield 1');
  yield 1;

  console.log('g2 before yield 2');
  yield 2;
}

let it2 = g2();
console.assert(_.isEqual(it2.next(), {value:1,done:false}));
console.assert(_.isEqual(it2.next(), {value:2,done:false}));
//the function finished, therefore 'done' is true, but there is no value
console.assert(_.isEqual(it2.next(), {value:undefined,done:true}));
console.log();

//yield is an expression

function* g3(x){
  console.log(`g3 before let yi = (yield) x: ${x}`);
  let yi = (yield 22);
  console.log(`g3 after let yi = (yield)   yi: ${yi}`);
  let y = x*yi;

  console.log(`g3 before yield yi: ${yi}, y: ${y}`);
  yield y;
}

let it3 = g3(6);

//First 'next' goes to the first yield. That returns a result
console.assert(_.isEqual(it3.next() /*output of the first yield*/ ,{value:22,done:false}));

//Second 'next' gives a value of the first yield. That functions resumes and runs
//until the second yield, which value comes back to this 'next' call as value.
console.assert(_.isEqual(it3.next(7 /*input of the first yield*/ )  /*output of the second yield*/  ,{value:42,done:false}));
console.assert(_.isEqual(it3.next(),{value:undefined,done:true}));
console.log();



function *g4(x) {
	var y = x * (yield);
	return y;
}

var it4 = g4( 6 );

// start `g4(..)`
it4.next();

var res = it4.next( 7 );

console.log(res.value);		// 42
console.log();


//The for..of loop hides a lot.
//1. it calls the STANDARD GENERATOR [Symbol.iterator]() to get an iterator.
//  let it = iterable[Symbol.iterator]()
//2. it loops
//3.    {value,done} = it.next();
//4.    break if done
//5.    calls the body with value

//The for..of loop needs an ITERABLE, an object with the STANDARD GENERATOR [Symbol.iterator]()
//---------------------------------------------------------------------------------------------
//ITERABLE has sense only for the 'for..of' loop: a standard name to get a iterator.
const iterable = {
  //An iterable has the standard generator: [Symbol.iterator]
  [Symbol.iterator]:function* (){
    let nextval = 1;

    while(true){
      yield nextval;
      nextval = ( 3* nextval ) +6;
    }
  }
}

for (let value of iterable) {             //WITH ITERABLE
  if (value > 1500)
    break;
  console.log(`something ${value}`);
}
console.log();



//A generator's iterator is an iterable too
//-----------------------------------------
//A generator
function* generator(){
  let nextval = 1;

  while(true){
    yield nextval;
    nextval = ( 3* nextval ) +6;
  }
}
let iterator = generator();
//Iterator is an iterable: it has the standard generator.
console.assert(iterator[Symbol.iterator]() === iterator);

//That's why this syntax works
for (let value of generator()) {
  if (value > 1500)
    break;
  console.log(`generator ${value}`);
}
console.log();





let it5 = iterable[Symbol.iterator]();
_.times(5,()=>console.log(it5.next().value))



//Iterator termination
//====================

//by breaking out from the for..of loop
//-------------------------------------
function* generator1(){
  let nextval = 1;

  try {
    while(true){                                      //endless loop
      yield nextval;                                  //     partitioned into asked chunks
      nextval = ( 3* nextval ) +6;
    }
  } finally {                                          //'finally' will be called ANYWAY, EVEN IF THE ITERATOR IS STOPPED!! After the iterator is stopped this code will run.
    console.log(`generator1 cleaning up`);
  }
  console.log(`generator1 never called`);
}
let iterator1 = generator1();

for (let value of generator1()) {
  if (value > 1500)
    break;                                                //IT IMPLICITELY FINISHES THE ENDLESS LOOP(!), THE 'try', THE FUNCTION, AND CALLS 'finally' TOO!!!!!!!!!!!
  console.log(`generator1 ${value}`);
}
console.log();


//by calling return on the iterator
//-------------------------------------
let iterator2 = generator1();
console.assert(typeof iterator2.return === 'function');

for (let value of iterator2) {
  console.log(`generator1 2 ${value}`);

  if (value > 1500)
    console.log(`generator1 2 at return ${iterator2.return('ciao').value}`); //IT EXPLICITLY FINISHES THE FUNCTION, THE 'try', AND CALLS 'finally' TOO!!!!!!!!!!!
}
console.log();


//Iterated function dispatchs exception to the caller
//--------------------------------------------------
function* generator3(){
  yield;
  throw new Error('error from generator2');
}

let iterator3 = generator3();
iterator3.next();
try {
  iterator3.next();
} catch (e) {
  console.log(`caught at the caller site: ${e}`);
}
console.log();

//The iterator can induce exception at the waiting 'yield' in the function
//------------------------------------------------------------------------
function* generator4(){
  try {
    yield                 //the thrown exception propagates from here
  } catch (e) {
    console.log(`caught in generator4 ${e}`);
  }
}

let iterator4 = generator4();
iterator4.next();
iterator4.throw('error');
console.log();

  //unhndled exception lands in the caller
function* generator5(){
    yield                 //the thrown exception propagates from here
}

let iterator5 = generator5();
iterator5.next();
try {
  iterator5.throw('error');
} catch (e) {
  console.log(`caught at the caller site: ${e}`);
}
console.log();



//Yield delegation
//===================
function* generator6(){
  yield 2;
  yield 3;
}

function* generator7(){
  yield 1;
  yield* generator6();
  yield 4;
}

let iterator7 = generator7();
console.assert(iterator7.next().value === 1);
console.assert(iterator7.next().value === 2);
console.assert(iterator7.next().value === 3);
console.assert(iterator7.next().value === 4);
console.assert(iterator7.next().value === undefined);
console.log();


//Yield delegation and input/output
//---------------------------------
function *generator8() {
	console.log( "inside generator8:", yield "B" ); //the yields set the value of the calling next()

	console.log( "inside generator8:", yield "C" ); //the yields set the value of the calling next()

	return "D";      //the return set the value of the function call
}

function *generator9() {
	console.log( "inside generator9:", yield "A" );

	// `yield`-delegation!
	console.log( "inside generator9:", yield * generator8() ); //this yield get the return value of generator8 not the parameter of a next()!
                                                            //the excution doesnt stop here! but runs to the next yield

	console.log( "inside generator9:", yield "E" );

	return "F";
}

var iterator9 = generator9();

console.log( "outside:", iterator9.next().value );
//outside A

console.log( "outside:", iterator9.next( 1 ).value );
//inside generator9 1
//outside B

console.log( "outside:", iterator9.next( 2 ).value );
//inside generator8 2
//outside C

console.log( "outside:", iterator9.next( 3 ).value );
//inside generator8 3
//inside generator9 D
//outside E

console.log( "outside:", iterator9.next( 4 ).value );
//inside generator9 4
//outside F

console.log( "outside:", iterator9.next( 5 ).value );
//outside undefined
console.log();



function *generator10() {
	console.log( "inside generator10:", yield "A" );

	// `yield`-delegation!
	console.log( "inside generator10:", yield *['B','C','D'] ); //this yield get the return value of generator8 not the parameter of a next()!
                                                            //the excution doesnt stop here! but runs to the next yield

	console.log( "inside generator10:", yield "E" );

	return "F";
}

var iterator10 = generator10();

console.log( "outside:", iterator10.next().value );
//outside A

console.log( "outside:", iterator10.next(1).value );
//inside generator10 1
//outside B

console.log( "outside:", iterator10.next(2).value );
//outside C

console.log( "outside:", iterator10.next(3).value );
//outside D                                               //the collection doesnt know here that there is no more items
                                                          //this is not a code that runs like of a function to the finishing return
                                                          //but an internal iterator that will relize the end only at the next get

console.log( "outside:", iterator10.next(4).value );
//inside generator10 undefined
//outside E

// console.log( "outside:", iterator10.next(5).value );
//inside generator10 4
//outside F
// //inside generator10 undefined
