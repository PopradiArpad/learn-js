
/*
  No new event will be executed as long the iterator runs.
*/

//This whole context will be run-to-completion


//An iterator that takes long
function* takesLong() {
  for(let i=0;i<100000;i++){
    yield i;
  }
}

//This doesn't come until the iterator is finished.
setTimeout(()=>{
  throw 'finally timeout';
},100);

/*
  The iterator is called synchronously with the caller
  context. It only defines the context switches
  between the two functions.
  The iterators have the same time behavior as the functions:
  namely synchronously.
  Without this behavior the iteration through an available collection
  would be very strange. We want the same semantic as of a for loop.
*/
for (let g of takesLong()) {
    console.log(g);
}
console.log('the iterator runner context finished');
console.log('a new event can be processed');
