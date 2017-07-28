'use strict';

const stampit = require('stampit');
const _ = require('lodash');

const MyStamp1 = stampit()
  //mixin inherited
  .props({
    myProp1: 'default value1'
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
console.assert(_.isEqual(MyStamp1(), { myProp1: 'default value1' }));

let myStamp1 = MyStamp1({ myProp1Value: 'hi' });
console.assert(_.isEqual(myStamp1, { myProp1: 'hi' }));
console.assert(myStamp1.getMyProp1() === 'hi');

const MyStamp2 = stampit()
  .props({
    myProp2: 'default value2'
  })
  .methods({
    getMyProp2() {
      return this.myProp2;
    }
  })
  .init(function({ myProp2Value }) {
    this.myProp2 = myProp2Value || this.myProp2;
  });

let CombinedStamp = stampit().compose(MyStamp1, MyStamp2);

let combined = CombinedStamp({ myProp1Value: 'a', myProp2Value: 'b' });
console.assert(_.isEqual(combined, { myProp1: 'a', myProp2: 'b' }));
