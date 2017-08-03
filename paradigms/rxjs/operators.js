'use strict';

const Rx = require('rxjs/Rx');
const _ = require('lodash');

/*
  Operators are pure functions
  which take Observable and create Observable.

  Operators are not observers: this is not a physical measure.
*/

const observable = Rx.Observable.of(1,2,3);
