'use strict';
const _ = require('lodash');
const fp = require('lodash/fp');

/*
What are
  Immutable
  auto-curried
  iteratee-first
  data-last
methods?
*/

//_.map is a data-first iteratee-last method
//this gives not what we expect
console.assert(_.isEqual(_.map(['6', '8', '10'], parseInt), [6, NaN, 2]));

//Becasue the iteratee gets value, index|prop, collection
//but parseInt expexts value,base
console.assert(parseInt('6', 0, ['6', '8', '10']) === 6);
console.assert(Number.isNaN(parseInt('8', 1, ['6', '8', '10'])));
console.assert(parseInt('10', 2, ['6', '8', '10']) === 2);
//fix is possible:
console.assert(
  _.isEqual(_.map(['6', '8', '10'], v => parseInt(v)), [6, 8, 10])
);

//The fp version of lodash map
let fpMap = fp.map;
//is auto-curried with arity 2
//argument of the first curried function is the iteratee (that means iteratee-first)
//iteratee arguments are capped to a know number of arguments.
//There are no optional last arguments. In case of fp.map iteratee is capped to one argument.
let fpMapWithIteratee = fpMap(parseInt);
//argument of the second (and last) curried function is the data (that means data-last)
let mapped = fpMapWithIteratee(['6', '8', '10']);
//arity is fixed
console.assert(_.isEqual(mapped, [6, 8, 10]));

//caps iteratee to one arguments:
console.assert(_.isEqual(fp.map(parseInt)(['6', '8', '10']), [6, 8, 10]));
//and uses iteratee-first, data-last syntax

//All these standardizations:
//rearrangement, input immutability, arity fixing, iteratee argument capping, and auto-curring
//have one goal: to make the the fp. functions composable.
//i.e ready for Function Programming.

//The iteratee-first data-last is to prepare for function composition
//f(g((x))
//For what is currying?
//  why is this not good enough?
//f(some_alg_extention1,g(some_alg_extention2,x))
//  why this?
//f(alg_extention1)(g(alg_extention2)(x))
//
//Currying allows to set the arguments of a function call in more steps.
//Currying is a function transformation
//where the result function has one argument
//(or simple less arguments then the original function)
//and returns another curried function and so on
//until the last function which returns the value of the original function
//with all the substitued arguments.
//
//The currying keeps the original argument order.
//
//Currying is a syntactic sugar
//to spare a anonymous wrapper functions.
//
//Currying uses closures
//
//Currying and partial application
//---------------------------------
//Similarities are only in the used mechanisms:
//Both are function transformations.
//Both use closures.
//But the semantic is totally different:
//Partial application set some arguments, currying doesn't.
//Partial application might not keep the argument order.
//Currying keeps the argument order.
//
//What is it good for?
//-------------------
//An uncurried f(a,b) function can not be used as f(a),
//a curried f(a)(b) can be used.
//example:
//add(2)()
//Without currying an anonymous wrapper is needed.
//(x)=>add(2,x)

//With this function the currying can not work:
//it has only one argument.
const add = (...args)=>args.reduce((a,v)=>a+v,0);


const add3 = (a,b,c)=>a+b+c;


console.log('----------');
// Function.prototype.curry = function( ) {
// 	var self = this,
//   	totalargs = self.length,
//   	mkCollectNextArgs = function( accumulatedArgs ) {
//       //It creates a closure with the accumulated args so far
//       //and
//       //returns a function to collect the arguments in the next call
//   		return function(...currentArgs) {
//         console.log(`within mkCollectNextArgs currentArgs:${currentArgs}`);
//         debugger;
//         //After the collection accumulate again
//   			return accumulate.apply( null, accumulatedArgs.concat( currentArgs ) );
//   		}
//   	},
//   	accumulate = function(...accumulatedArgs) {
//       console.log('accumulate');
//       debugger;
//   		return ( accumulatedArgs.length < totalargs ) ?
//         //Get a function to collect attached the accumulated values so far to its closure.
//   			mkCollectNextArgs( accumulatedArgs ) :
//   			self.apply( null, accumulatedArgs );
//   	};
//
// 	return accumulate;
// };
//
Function.prototype.curry = function( ) {
	let self = this;
  let totalargs = self.length;

  return function accumulate(...accumulatedArgs) {

  		if ( accumulatedArgs.length < totalargs ) {
  			 return function(...currentArgs) {
      			return accumulate.apply( null, accumulatedArgs.concat( currentArgs ) );
    		};
      }

  		return self.apply( null, accumulatedArgs );
  	};
};

// Function.prototype.curry = function(){
//     let that = this;
//     let totalArgs = this.length;
//
//     return function curriedFn(...args){
//
//       if(args.length < totalArgs){
//         return function(...currentArgs){
//           return curriedFn.apply(null, args.concat( currentArgs ));
//         };
//       }
//
//       return that.apply(null, args);
//     };
// };

// console.assert(add2.curry()(1)(2)    === 3);
console.assert(add3.curry()(1)(2)(3) === 6);
console.assert(add3.curry()(1)(2)(3) === 6);
console.assert(add3.curry()(1,2)(3) === 6);
console.assert(add3.curry()(1,2,3) === 6);
add3.curry();
console.log('1: ----------');
add3.curry()(1);
console.log('1 2: ----------');
add3.curry()(1)(2);
console.log('----------');


//Formulate this string processing with fp
//----------------------------------------
const encodeURIComponent = string => string;

const toSlug = input =>
  encodeURIComponent(input.split(' ').map(str => str.toLowerCase()).join('-'));
console.log(toSlug('JS Cheerleader'));


//1. try
//const toSlug2 = input =>
//   input.split(' ').map(str => str.toLowerCase()).join('-').encodeURIComponent();
//Can not work: we don't want to monkey patch String.prototype

//2. try
// const split = fp.curry((separator,s)=>s.split(separator));
// const join = fp.curry((separator,s)=>s.join(separator));
const toSlug2 = input =>
  encodeURIComponent(
    fp.join('-')(
      fp.map(str => str.toLowerCase())(
        fp.split(' ')(
          input
        )
      )
    )
  );
console.log(toSlug2('JS Cheerleader'));


//3. try
//Make a function compositor
const composeAll = (funcs) => (x) => {
  let value = x;
  for (let f of funcs) {
    value = f(value);
  }

  return value;
}
const toSlug3 = input => composeAll(
  [
    fp.split(' '),
    fp.map(str => str.toLowerCase()),
    fp.join('-'),
    encodeURIComponent
  ]
)(input);
console.log(toSlug3('JS Cheerleader'));


//4. try
// const toSlug4 = input => fp.reduce((value,func) => {
//     return value = func(value);
//   })
//   (input)
//   (
//     [
//       fp.split(' '),
//       fp.map(str => str.toLowerCase()),
//       fp.join('-'),
//       encodeURIComponent
//     ]
//   );
const composeAll2 = funcs => input => fp.reduce((value,func) => value = func(value))
(input)
(funcs);
const toSlug4 = input => composeAll2(
  [
    fp.split(' '),
    fp.map(str => str.toLowerCase()),
    fp.join('-'),
    encodeURIComponent
  ]
)(input);
console.log(toSlug4('JS Cheerleader'));


//5. try
const composeAll3 = funcs => value => funcs.reduce((value,func) => value = func(value),value)
const toSlug5 = composeAll3(
  [
    fp.split(' '),
    fp.map(str => str.toLowerCase()),
    fp.join('-'),
    encodeURIComponent
  ]
);
console.log(toSlug5('JS Cheerleader'));

//6. try
const composeAll4 = (...funcs) => value => funcs.reduce((value,func) => value = func(value),value)
const toSlug6 = composeAll4(
    fp.split(' '),
    fp.map(str => str.toLowerCase()),
    fp.join('-'),
    encodeURIComponent
);
console.log(toSlug6('JS Cheerleader'));

//7. try
const composeAll5 = (...funcs) => value => _.flow(funcs)(value);
const toSlug7 = composeAll5(
    fp.split(' '),
    fp.map(str => str.toLowerCase()),
    fp.join('-'),
    encodeURIComponent
);
console.log(toSlug7('JS Cheerleader'));

//Trace the pipe
const trace = fp.curry((label,x)=>{
  console.log(`${label}: ${x}`);
  return x;
});
const toSlug8 = composeAll5(
    trace('input'),
    fp.split(' '),
    trace('splitted'),
    fp.map(str => str.toLowerCase()),
    trace('lower cased'),
    fp.join('-'),
    trace('joined'),
    encodeURIComponent,
    trace('encoded'),
);
console.log('------');
console.log(toSlug8('JS Cheerleader'));
console.log('------');


//Point-free style
//Function definition without referring to arguments
