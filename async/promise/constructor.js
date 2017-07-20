'use strict';
const _ = require('lodash');

//At construction the promise's EXECUTOR FUNCTION executes IMMEDIATELY
let p1 = new Promise(function(){//the EXECUTOR FUNCTION
  console.log('executor function runs');
});

//That means it's possible to set the promise value synchron
let pSyncOk = new Promise(function(resolve){
  console.log('pSyncOk resolves to 42 (1.)');
  resolve(42);
})

//But intentionaly there is no way to observe it synchron!

//to let normalize the synchronicity of the observation
//'then''s 'onFulfill', 'onReject' are called asynchronously.
pSyncOk.then(v=>{
  console.log('pSyncOk.then() runs (3.)');
  console.assert(v === 42);
})
console.log('pSyncOk.then() created (2.)');

//Revealing constructor pattern
//-----------------------------
//The promise value can be set only be the EXECUTOR FUNCTION.
//The promise itself can only be passed and asynchronously observed.
let p2 = new Promise(function(resolve, reject){ //the EXECUTOR FUNCTION
});

setTimeout(()=>{
  console.log(`
    A new event in the event queue runs after a resolved-born promise fullfillment.
    A resolved-born promise fullfillment ran in the job queue of the tick at that time.
    'then's are called in order immediately in the next asynchronous opportunity:
    in asynchronous resolving in the jobs of the resolving tick!

    For that is the job queue:
    To ensure that no consequence of a onFfullfill/onReject can delay the execution
    of other consequences via putting events in the event queue.
    `);
},0);
console.log('main end');
