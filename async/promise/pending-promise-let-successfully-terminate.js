'use strict';

//The program kept alive not by the created promises
//but the pending I/O actions
//--------------------------------------------------
//Pending promise let terminate the program successfully
let p = new Promise(function(resolve, reject) {
  //  //Set a timer which will generate an event
  //  //The timer doesn't let the program terminate.
  setTimeout(()=>{},1000);
});

p.then(() => {
  console.log('never comes');
});
