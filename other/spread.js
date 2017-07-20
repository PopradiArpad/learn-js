'use strict'

//Make function that spread an array into arguments of an other function
//The other function doesn't use 'this'.

//1. make that function and use it
//-----------------------------------
function spreadAndCall(fn,array){
  //1.
  // fn(...array);
  //2.
  fn.apply(null ,array);
}

function f(x,y,z) {
  console.log(`x:${x},y:${y},z:${z}`);
}

spreadAndCall(f,[1,2,3]);


//2. make that function
//---------------------
function spread(fn,array){
  //This function should it be
  //but without the act of calling:
  //fn.apply(null,array);

  //So we must create a function
  //bind is needed for the function creation
  //bind()

  //What should be bound?
  //the apply function:
  //Function.apply

  return Function.apply.bind(fn,null,array);
}


spread(f,[1,2,3])();
