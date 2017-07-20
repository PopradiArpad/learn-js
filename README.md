# How to learn JavaScript?

### Learn the mechanisms of the language not concepts...
Learn by doing and trying what the Engine does as it compiles and executes some elementary code. It helps extremely to get away from the syntax and think about the mechanisms, what they need and how they are related. All this without any syntax. You must learn first the mechanisms than the expression of that: the syntax.

### ...and not syntax
Because
* there are more syntaxes to achieve the same thing
* you can get a wrong assumption what happens under the syntax.

This is especially true if you already know a compiled language with similar syntax: what you see does something other than you expect (and mostly in much more steps) and related to different things than you expect. The strange divergence begins with such elementary things like the assignment and the function call.

## How to learn the mechanisms of the language?

### Find the independent parts of the mechanisms!
They are rule groups that are independent from each other.

# What are the independent mechanisms of JavaScript?
* _lexical scoping_
* _'this' binding_
* _functions are objects_
* _property rules_
* _promises_
* _generators_

# Realize which mechanisms are not _independent_!
* _function call_ depends on _this rules_ and creates a new _scope_ object which can become a _closure_.
* _closures_ depend on _lexical scoping_ and _functions are objects_
* _object creation_ uses _function call_.
* _async/await_ depends on _promises_ and _generators_.

### Separate compile-time rules from run-time rules!
* _lexical scoping_: compile-time
* _'this' binding_: run-time
* _functions are objects_: compile-time
* _property rules_: run-time

### Separate the synchronous mechanisms from the asynchronous mechanisms!
_Promises_ are asynchronous mechanisms the other ones are synchronous mechanisms.

### Separate application defined objects from the engine-internal ones!
* _scope_ objects are engine internal objects.

# Independent mechanisms

## Scope
_Scoping_ has only to do with the unqualified _identifiers_, i.e has nothing to do with _object properties_ or _values_.


Scope is a visibility area within a code block. (Functions are objectified blocks with possible input and output). Scopes are created at run-time at each block-entry/function-call. Theirs visibility rule in JavaScript is the _lexical scoping_.

## Lexical scoping
__An unqualified identifier is visible in its defining scope and in the scopes created within its defining scope.__
That means
* basically scopes are visibly, the visibility of theirs identifiers is only a consequence.
* the visibility of the scopes depends only on the declaration time arrangement of the scopes.
* the value of an unqualified identifier (__except 'this'!__) is determinable by code reading (of course the result can be _value of another identifier_).

## Closure
__A _closure_ is a scope kept accessible even after its creator function call is finished.__ It can be created only by a scope from that a function gets _somehow_ out and that function use __identifiers (not theirs values!)__ from the creator scope.
__The mechanism _closure_ is a consequence of _lexical scoping_ and _functions are objects_.__

## The four rules of _this binding_
Preface: The value of 'this' is completely determined at the call-site in run-time, and has nothing to do with the compile time also with _lexical scoping_. That means __the value of 'this' can not be known without seeing the call-site__.

The coming rules goes in declining precedence.
1. _new rule_: A function call after 'new' gets the newly created object as 'this'
2. _explicit rule_: A function called with _apply_, _call_, or _bind_ has bound its 'this' to the given object. A bound with _bind_ is not to rebound.
3. _implicit rule_: A function call in the form obj.someFunction() has its 'this' bound to obj.
4. _default rule_: All other cases (e.g someFunction() ) means that 'this' is set to undefined in stric mode or the global object in non-stric mode.

## Property rules
_Property rules_ are about properties on an _object_ (i.e qualified identifiers), have nothing to do with finding an unqualified identifier, which is the _lexical scope_

### The two rules to get a property aka [[GET]] rule
The property will be searched from the specified object up to its [[Prototype]] chain. If no property found the value of the expression is undefined.
If the first found property
1. is a data property, its value is the value of the expression.
2. is an accessor property with a ```get``` function that function will be called with 'this' referring to the specified object (not the found one).

Only the first found property will be got, later ones are __shadowed__.

### The rules to assign a property aka [[PUT]] rule
The property will be searched from the specified object up to its [[Prototype]] chain.
__If assignment happens that is always on the specified object regardless where the proeprty is found in the [[Prototype]] chain.__

If no property found:

A new data property with the specified property name will be attached to the specified object. Its value is the specified value.

If found somewhere on the [[Prototype]] chain inclusive specified object and the property

 * is writable: a property will be assigned to the specified object (not to the found one)
 * is not writable: Error in strict mode, silently ignored in non-strict mode.
 * is an accessor property with a ```set``` function, that function is called with 'this' set on the specified property (not the found one).

# Promises

are a trustable asynchronous programming kit.

Trustable because
* it normalizes the time handling: the evaluation of a promise happen always asynchronously.
* resolved promise is immutable
* _any asynchronous_ error is channeled into the error handling
* asynchronous error must be programmatically handled
* the observation order is defined

All these features are defined with a logical naming and syntax.

### Promise normalizes the time handling: the evaluation of a promise happens always asynchronously.

Promise creation is always synchronous. Promise evaluation is always asynchronous.

### Resolved promise is immutable
The promise resolving code is defined as the promise is defined.
At promise constructor syntax:
```
let p = new Promise(executorFunction);
```
Only the _executorFunction_ can resolve the promise.

At .then constructor syntax:
```
let promise2 = promise1.then(onFulfill,onReject);
```
Only the _onFulfill_ or the _onReject_ can resolve the promise.

A promise can be referenced, observed and built into processing pipelines as much as you like but resolved (set to a value/error) can be only by the mentioned functions.

### _Any asynchronous_ error is channeled into the error handling
Asynchronous processing needs own error handling mechanism because _try..finally_ can guard only synchronous code. (The promise definition runs synchronous but the evaluation is asynchronous and can happen in more processing pipeline) Therefore any exception from the asynchronous code acts as a reject, where the exception value is the rejection value.

Attention:
The first promise creation of an asynchronous processing pipeline normally doesn't happen in a promise: the creation of it by an invalid syntax (e.g new Promise(null)) must cause a synchronous exception.

### Asynchronous error must be programmatically handled
Happened error must be handled: unhandled promise rejection acts as an unhandled exception.

### The observation order is defined
 The promise observation happens
 * asynchronously
 * in the defining order of the observations
 * before __any__ event in the event queue would be executed

The priority of observations over the events is ensured by the job mechanism:
The jobs of observations will be independenty asynchronously executed within
a given event execution.

These rules are valid regardless of the resolution state of the promise.


### Logical naming and syntax
A Promise can be created by defining how it gets resolved (get its value) sometime. Resolving can be a fullfillment (successfully with a value) or a rejection (with some error). So the naming conventions for creating a Promise are:
```
let p = new Promise(executorFunction(resolve, reject));
```
The _executorFunction_ runs synchronous to let resolve the promise now if it resolvable (But remember: evaluating/observing is possible only later (asynchronously)). To allow asynchronous resolution the simplest interface is the given one.

Attention: resolving means resolving and not fullfill. Resolving a promise with a rejected other Promise is a rejection and must be handled, which is possible only in a processing pipeline.See Promise.resolve for more .

At .then constructor syntax:
```
let promise2 = promise1.then(onFulfill,onReject);
```
Both functions must resolve the already synchronously created promise2 promise asynchronous. The simplest syntax for that is
* getting the unwrapped input and returning some output which will be automatically wrapped into a Promise (to chain off again asynchronously) and acts as the resolution of the promise.
* handling any in the functions unhandled exception as a rejection resolution.

The automatically wrapping is made by __Promise.resolve__ which
* wraps a rejected promise into a rejected promise. (no escape for asynchronous errors!)
* references a fullfilled promise. (like a clone)
* wraps a thenable object (see later) into a trustable (see above) promise.
* wraps anything others into a fullfilled promise.

A thenable object is an object with a then function on it. The Promise mechanism assumes it's a promise to resolve asynchronously.

#### The _then_ syntax
creates a new promise
```
let p2 = p1.then(Observes p1 and resolves p2 but doesn't observe p2);
```

##### let pass the unchanged resolution so:

If no onReject defined it means
```
let promise2 = promise1.then(
  onFulfill,
  (err)=>{
    throw err;
    });
```
So in case of rejected promise1 promise2 rejects with the same value.

If no onFullfill defined, like here:
```
let promise2 = promise1.then(
  null,
  onReject)
```

it means
```
let promise2 = promise1.then(
  (value)=>{
    return value;
    },
  onReject;
```
So in case of fullfilled promise1 promise2 fullfills with the same value.

## Generators
_Generators_ are pausable and rerunable functions with iterators on the interface.
It's a kind of cooperative concurrency.
They give back an iterator at the call of the generator but that doesn't have a syntactical sign.
The generator function has an own scope: it's a great place to define closure for the running iterator.

# Some not independent mechanisms

## The many steps of a _function declaration_
Like
```
function Func(){};
```

* Creates a new function object.
  * Its
    * ```[[Prototype]]``` is ```Function.prototype```
    * ```name``` is 'Func'
    * ```prototype``` is a new Object thats
      * ```[[Prototype]]``` is ```Object.prototype```
      * constructor property is the ```Func``` object
* creates the new identifier 'Func' that refers to the newly created function object
* Makes some compilation on the given body.


## The four steps of a _constructor call_
Preface: There is no _constructor_ in the language but _constructor call_.

Like
```
new Func()
```

1. ```new``` creates an empty object.
  * Its ```[[Prototype]]``` is ```Object.prototype```
2. Set the hidden ```[[Prototype]]``` property of it to ```Func.prototype```.
3. Calls ```Func``` with 'this' set to the newly created object.
4. If ```Func``` has no return value than the return value of the expression is the in the 1. step created object. If there is a return value than that object and the in the 1. step created one will be discarded.

## The two objects that are created at one function declaration
Like of
```
function Func(){
}
```
They are the ```Func``` object and its ```prototype``` object. Each references the other through a non-enumerable property:
The prototype object of ```Func``` is referenced by ```Func.prototype``` which references back to the function by its ```constructor``` property.

## Functions
 Function objects are a kind of promise in the common sense: I do something if I'm called. Until that I exists.

 Functions are objectified blocks with possible input and output. As a consequence they can be executed after theirs declaration.

## async/await
It combines _generators_ and _promises_ in a mechanism, whose syntax hides the generator iterating completely.
