/*
ES2015 has first class support for modules

The spec
========
Modules are
* file based.
* singletons i.e each include refer to the same centralized instance.

THE MODULE API IS
* STATIC. I.E. THE API OF THE MODULE CAN NOT BE CHANGED LATER.
* THE API ELEMENTS ARE DEFINED BEFORE THE MODULE CODE RUNS
* BOUND TO THE VALUES NOT ASSIGNED! I.E AT EXPORT
  THERE IS NOT A COPY OF THE DEFINED VALUE BUT A BOUND,
  IF THE VALUE IS RESET LATER SO DOES THE API VALUE TOO.

* The loading can be asynchronous and happen in more ticks.
* export, import must be on top level.

Some syntax:
import {x} from 'some-lib';
export z = 42;
export {y};

Difference to CommonJS require
------------------------------
THE MODULE API IS
* THE API ELEMENTS ARE DEFINED _AFTER_ THE MODULE CODE RUNS
* IS ASSIGNED AND NOT BOUND.
* Importing a module is a statically blocking load (if it not load yet)
  and happens in one tick.

Some syntax:
const x = require('some-lib');
module.exports.y = ..;

The reality
===========
Node.js
----------
implements only the CommonJS require mechanism.
Babel compiles to that and the result is not conform to ES6 spec.



*/
