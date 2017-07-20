'use strict';


//Funtion.prototype.apply calls a function
//with a defined 'this' and arguments as array

let o1 = {
  a: 1
};

let o2 = {
  a: 2
};

function incA() {
  this.a++;
}

incA.apply(o1);
console.assert(o1.a === 2);

//-------------------------
o1.a = 1;

function addA(value) {
  this.a += value;
}

o1.a = 1;
addA.apply(o1, [10]);
console.assert(o1.a === 11);

//-------------------------
o1.a = 1;

const addToO1 = Function
                .apply
                //make a new function
                //which has 'this' explicitly set
                //to 'addA'
                //and its first argument is set to o1
                //In case of apply that is like
                //addA.apply(o1, further parameters)
                .bind(addA, o1);

addToO1([10]);
console.assert(o1.a === 11);
