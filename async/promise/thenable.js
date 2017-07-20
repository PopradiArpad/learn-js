'use strict';

const fullFillerThenable = {
  then(onFullfill) {
    onFullfill(42);
  }
};

const rejecterThenable = {
  then(onFullfill, onReject) {
    onReject('bumm');
  }
};

Promise.resolve(fullFillerThenable).then(v => {
  console.log(`fullfilled with ${v}`);
});

Promise.resolve(rejecterThenable).then(null, err => {
  console.log(`rejected with ${err}`);
});
