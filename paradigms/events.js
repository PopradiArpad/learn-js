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
eventEmitter.on("event1", function(arg) {
  console.log(`function1: event1 happened with ${arg}`);
  /*
    Ellenben a this az értesítő!
  */
  if (this !== eventEmitter) {
    throw new Error("this !== eventEmitter");
  }
  /*
    Ellenben a visszatérési érték semmibe vétetik!
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


/*
  Hiba kezelés:

  Hiba nem maradhat kezeletlen!
*/
let errorCame = false;
try {
  // Az "error" értesítés hibaként tartatik számon a Node-ban.
  eventEmitter.emit("error");
} catch (e) {
  // Hibakezelő csin nem léte kezeletlen hibát jelent! ERR_UNHANDLED_ERROR
  errorCame = true;
}
if (! errorCame) {
  throw new Error("! errorCame");
}

errorCame = false;
eventEmitter.on("error", ()=>{});
try {
  eventEmitter.emit("error");
} catch (e) {
  errorCame = true;
}
if (errorCame) {
  throw new Error("errorCame");
}
