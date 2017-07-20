'use strict';
const _ = require('lodash');

console.assert("\n"==='\n');

let ox = {
  inspect(){return "hehe!"}
}
console.log(ox);//"hehe!" in Node.js!

//ES6 String features
//--------------------

//Turn strings into arrays
const name = 'Árpád';
console.assert(_.isEqual([...name],['Á','r','p','á','d']));

//Iterate over indeces
for(let i in name){
  console.log(`index: ${i}`);
}

//Iterate over code characters
for(let ch in name){
  console.log(`charachter: ${ch}`);
}

console.assert(name.startsWith('Ár')===true);
console.assert(name.includes('p')===true);
console.assert(name.endsWith('ád')===true);
console.assert(name.repeat(3)==='ÁrpádÁrpádÁrpád');



//Template literals
//=================
const templateLiteral = `hi!`;

  //are interpolated
console.assert(`${1+1}`==='2');

  //can be multi-line
const multiLine = `
hi!
ho!
`;

  //are NOT-ESCAPED default
console.assert(`\n`==='\n');

  //or ESCAPED prefixed with String.raw
console.assert(String.raw`
\n1+1=${1+1}`==='\n\\n1+1=2');


//Tagged template literals!!!
//===========================
//To make domain specific language interpreters right into JS!
function tagFunc(templateObject, ...substs) {
  return {
    cookedTemplateStrings: templateObject,
    rawTemplateStrings: templateObject.raw,
    substs
  };
}
console.log(tagFunc`a:${1+1}\n,b:${2+2}\n`);
