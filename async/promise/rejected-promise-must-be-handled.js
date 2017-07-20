'use strict';

//A rejected promise
//=====================================================
//must be handled just like a throw!!
//It's not like an error object, which must be thrown to have effect
//IT'S A THROWN ERROR WHICH MUST BE HANDLED IN A PROMISE PIPELINE UNLESS IT TERMINATES THE PROGRAM!

//Promise.resolve _resolves_, not fullfill!
let p1 = Promise.resolve(Promise.reject('RejectionError'));

try {
  console.log('Synchronously there is...');
  Promise.resolve(p1)
    .then(v => console.log('never called'))
    // .catch(() => console.log('Error: any number of resolving wrap only the rejected unhandled error!'));
  console.log('...absolutely no problem.');
} catch (e) {
  console.log(`never comes`);//try..catch CAN NOT CATCH AN UNHANDLED PROMISE REJECTION!!
                             //BECAUSE try..catch IS FOR SYNCHRONOUS ERROR HANDLING, ONLY FOR THIS CODE BLOCK
                             //NOT FOR THE WHOLE APPLICATION.
                             //THE UNHANDLED PROMISE WILL BE DETECTED BY THE ENGINE AFTER THIS MODULE RAN.
}
