'use strict';

//EXECUTION FUNCTION ERROR TREATED AS A REJECTION
//================================================
//Any kind of error in a promise is treated on the same way:
//asynchronously evaluated in the execution pipeline.
//This feature is a must:
//Any consequnce must be handled timely normalized!
let p = new Promise(function() {
  throw 'promise error';
});
console.log('first log');
p
  .then(() => console.log('never called'))
  //without explicit handling it would be an 'unhandled rejection error'
  //which (will since some Node.js version) terminate the program with a non-zero exit code
  //THEREFORE
  //NO ERROR CAN BE SILENTLY INGNORED
  .catch(e => console.log(`caught error: ${e}`));
