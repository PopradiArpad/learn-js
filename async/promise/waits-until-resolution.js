'use strict';

new Promise(function(resolve) {
  setTimeout(()=>{console.log('the program wait for the resolution of all unresolved promises')},2000);
});
