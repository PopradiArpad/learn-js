'use strict';


/*
 The promise observation happens
 * asynchronously
 * in the defining order of the observations
 * before any new event would be executed

The priority of observations over the events is ensured by the job mechanism:
The jobs of observations will be independenty asynchronously executed within
a given event execution.

These rules are valid regardless of the resolution state of the promise.
*/

let p = Promise.resolve(42);

function setEvent(value){
  setTimeout(()=>{console.log('event started from observation ',value)},0);
}

p.then(()=>{
  setEvent(1);
  console.log('observation 1');
});

p.then(()=>{
  setEvent(2);
  console.log('observation 2');
});

p.then(()=>{
  setEvent(3);
  console.log('observation 3');
});

console.log('all promises are created');

setTimeout(()=>{
  setEvent('after promise resolution: 3 before observing again');

  p.then(()=>{
    setEvent('after promise resolution 4');
    console.log('after promise resolution: 2 observation again');
  });

  console.log('after promise resolution: 1 observation defined again');
},100)
