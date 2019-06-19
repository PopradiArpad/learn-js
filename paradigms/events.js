const events = require('events');

/*
  Az értesítő gép (observer pattern) a csin (függvény) egyik általánosítása:

  Az általánosítás az értesítés mögé bújik:
  A csin hívás egy nevezett eseményre történik.
*/


const eventEmitter = new events.EventEmitter();

/*
 * Ugyanúgy egészítők adhatók át.
 */
eventEmitter.on("event1", (arg) => {
  console.log(`function1: event1 happened with ${arg}`);
  /*
    Ellenben a visszatérési érték semmibe vétetik.
  */
  return "huhu1";
});

function function2(arg) {
  console.log(`function2: event1 happened with ${arg}`);
}

eventEmitter.on("event1", function2);

/*
 * Ugyanúgy sorbeli.
 */
console.log("Before event emitting");
eventEmitter.emit("event1", "hi!");
console.log("After event emitting");

/*
  Az általánosítás feloldható:
*/
eventEmitter.removeListener("event1", function2);
console.log("Before event emitting");
eventEmitter.emit("event1", "hi!");
console.log("After event emitting");
