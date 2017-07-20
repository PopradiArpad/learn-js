'use strict';

function delay(ms) {
  return new Promise(function(resolve) {
    setTimeout(resolve, ms);
  });
}

delay(200).then(()=>{
  console.log('after first delay');
  return delay(200);
}).then(()=>{
  console.log('after second delay');
  return delay(200);
})
