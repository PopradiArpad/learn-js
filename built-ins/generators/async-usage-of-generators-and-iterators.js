'use strict';
const _ = require('lodash');
const util = require('util');

//Async usage of generators and iterators
//=======================================

function ajax(url, cb) {
  setTimeout(() => {
    console.log(`ajax with ${url}`);
    cb(undefined, `result from from ${url}`);
  }, 10);
}
const promisifiedAjax = util.promisify(ajax);

//async means this is a generator with promisified yields within
async function main() {
  try {
    // const p1 = promisifiedAjax('http://bla.bla');
    // const p2 = promisifiedAjax('http://blub.blub');
    //
    // const [text1,text2] = await Promise.all([p1,p2]);

    const [text1, text2] = await Promise.all([
      promisifiedAjax('http://bla.bla'),
      promisifiedAjax('http://blub.blub')
    ]);
    // var text1 = await p1;
    // var text2 = await p2;
    console.log(`2 main: ${text1}`);
    console.log(`3 main: ${text2}`);
    // var text = await promisifiedAjax('http://bla.bla');       //await means yield a promise
    // console.log( `main: ${text}` );
    //
    // var text2 = await promisifiedAjax('http://blub.blub');       //await means yield a promise
    // console.log( `main: ${text2}` );
  } catch (err) {
    console.error(err);
  }
}

//No
//  generator call
//  loop of
//    iterator next
//All these are made by the Engine
//that MECHANISM belongs to the async/await syntax.
main();
console.log(`1 main started`);
