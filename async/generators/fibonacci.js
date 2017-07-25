'use strict';

function* fibonacci(){
  let seq = [1,1];
  let next;

  while (true) {
    yield(next = seq[0] + seq[1]);
    [seq[0], seq[1]] = [seq[1],next];
  }
}

console.log(fibonacci);

for (let f of fibonacci()) {
  console.log(f);
  if (f > 500) {
    break;
  }
}
