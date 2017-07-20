'use strict';

//Promise.then
//============
//is a pending promise NOW
let p1 = Promise.resolve(21);

//Promise.then creates another promise NOW
let p2 = p1.then(v => {
  //The return value of the onFulfill function resolves that promise
  return 2 * v; //p2 will be resolved LATER
                //wrapped into Promise.resolve
});
//p2 is pending NOW

p1                    //a Promise
  .then()             //another one                  //each can be set only in their respecting 'then'
  .then();            //and another one              //the setting of the promise created by the 'then'
                                                     //is just like so concentrated as of in the Promise constructor.

//The default onFulfill if it's not a function
function onFulfill(value) {
  return value;
}

//Value and error fall through defaultly
//======================================
//The default onReject if it's not a function
function onReject(err) {
  throw err;
}
