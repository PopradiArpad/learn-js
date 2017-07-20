'use strict';
const _ = require('lodash');

//To boolean
//These values will be coerced to 'false':
/*
null
undefined
""
-0,(+)0,
NaN
*/
//ALL OTHER ONES TO 'true'
console.assert(!! {});
console.assert(!! new Boolean(false)); // new Boolean(anything) is an object and all objects have truthy value.
console.assert(Boolean(false) === false);
