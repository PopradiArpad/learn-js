'use strict';

const stampit = require('stampit');
const _ = require('lodash');

/*
Stampit is a factory function composition library.
features
 * composition of
  * factory functions
  * properties to deep merge
*/

const MyStamp1 = stampit()
  //mixin inherited
  .props({
    myProp1: 'default value1'
  })
  .deepProps({
    deepProp: { a: { aa: 11, ab: 12 }, b: 2 }
  })
  //prototypal inherited
  .methods({
    getMyProp1() {
      return this.myProp1;
    }
  })
  //function inherited
  .init(function({ myProp1Value }) {
    this.myProp1 = myProp1Value || this.myProp1;
  });

console.assert(typeof MyStamp1 === 'function');
console.assert(
  _.isEqual(MyStamp1(), {
    myProp1: 'default value1',
    deepProp: { a: { aa: 11, ab: 12 }, b: 2 }
  })
);

let myStamp1 = MyStamp1({ myProp1Value: 'hi' });
console.assert(
  _.isEqual(myStamp1, {
    myProp1: 'hi',
    deepProp: { a: { aa: 11, ab: 12 }, b: 2 }
  })
);
console.assert(myStamp1.getMyProp1() === 'hi');

const MyStamp2 = stampit()
  //mixin inherited
  .props({
    myProp2: 'default value2'
  })
  .deepProps({
    deepProp: { a: { aa: 21, ac: 23 }, c: 3 }
  })
  //prototypal inherited
  .methods({
    getMyProp2() {
      return this.myProp2;
    }
  })
  //function inherited
  .init(function({ myProp2Value }) {
    this.myProp2 = myProp2Value || this.myProp2;
  });

let CombinedStamp = stampit().compose(MyStamp1, MyStamp2);

let combined = CombinedStamp({ myProp1Value: 'a', myProp2Value: 'b' });
console.assert(
  _.isEqual(combined, {
    myProp1: 'a',
    myProp2: 'b',
    deepProp: {
      a: { aa: 21, ab: 12, ac: 23 },
      b: 2,
      c: 3
    }
  })
);
