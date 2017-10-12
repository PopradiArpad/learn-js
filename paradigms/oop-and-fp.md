## The function in JavaScript
Differentiate between _function_ and _function call_!

A _function_ has
* optionally name
* optionally parameters
* a lexical scope
* a body with optionally code to run
* optionally return type

The _function call of a function_ has
* a function
* arguments (the values of parameters)
* a 'this' value
* a closure (lexical scope with concrete values)
* a return value

A function is a promise in the common sense: I will do something if I'm called.
But what this something really means depends very from the inputs at the call time.
Functional Programming tries to minimize this gap with explicit input and strong types.

A called function can have input in 3 ways:
* through its arguments
* through 'this'
* through its closure


## The JavaScript function is prepared for both Object Oriented and Functional Programming
but these exclude each other. In Functional Programming the input must be immutable:
you are not allowed to use changeable state from 'this' or from the scope.



## Functional Programming
1. Functions are objects (_JavaScript supports it_)
2. Input is immutable (_No JavaScript support, it must be forced by the
  programmer_)
3. Output is determined by the input.
4. Input and output are well typed (_No JavaScript support, and it's
often not needed to do something useful_) means the compiler can check
the correctness of the input usage and the type of the output.

Take care that in JavaScript a called function can have input in 3 ways:
* through its arguments
* through 'this'
* through its scope


### The advantages of Functional Programming
From 1. follows
  * A new level of expressiveness.

From 2. follows
  * No side effect. No input will be changed regardless where it comes from.
  * Each function is automatically parallelizable.

From 3 and 4 follow
  * Each function can be reasoned about on its own.

From 2. , 3. and 4. follow
  * Each function can be reasoned about on its own and __let all other
  functions reason about which use the same input__. So the reasoning
  is composable. (That is the reason why the functional
  programming semantic has been chosen to do Math through space and
  time. Math uses the lexical scoping too.)

### Pure function
doesn't pollute its surrounding environment and determined by the input: 2. and 3.

### Problems with Functional Programming only (Haskell)
* Missing story-telling capability. The description of the goal of the app, the main players, roles, interactions are much more natural in OOP.
* Discouraging academic language.
* Forcing to think in the type system even if its not useful.
It's like the forced two layer thinking of classical OOP languages where
you need a class to have an object just for the sake of the language not
by a the necessity of the domain.

# Problems with Object Orientation
are arise if it's not combined with Functional Programming. If it concentrates too heavy
on states forgetting the danger of shared states: possibly unprovable code.

## 'Prefer Composition over Inheritance'
Composition is the loosest reusing mechanism: it uses an other object intern. That means it must
know only the used part of its _interface_ and has not to represent it in front of the whole
application. __See Possible problems with inheritance__
### Why is composition better than inheritance?
* the composed element is private.
In contrary the inherited base is public.
* only the interface of the composed element is used.
In contrary the inherited base is in the prototype chain:
all its properties/methods can interfere with the base.


## Inheritance in JavaScript
What is inheritance?

_Giving all feature (data/behavior) of an object to another object._

##### For what is inheritance good?
* _In the model level: for abstraction._
* _In the code level: for code reuse._

#### Possible problems with inheritance
Inheritance makes a tight coupling between parent and child. The child is a mix of the _whole_
parent and its own things _both in interface and in implementation_. The child must support the
whole interface of its parent.

This is true for _all_ type of inheritance.

##### There are two main variants according how the objects are related after the inheritance act:
* the objects stay related
* the objects are detached

But because JavaScript is so flexible, you can mix out your own inheritance mechanisms for your own
purposes from different mechanisms!

### Prototypal Inheritance
The feature is on the _prototype_ chain.
The object's own data are not touched at prototypal inheritance.

##### For what is Protoypal Inheritance good for?
_To share features._

##### Example
```
let proto = {
  feature(){}
}

let instance = Object.create(proto);
```
### Mixin Inheritance
The features are mixed-in (technically assigned) from another object (only the own enumerable properties).
The prototype chain of the object is not touched at mixin inheritance.

##### For what is Mixin Inheritance good for?
_To copy data and share methods._

##### Example
```
let proto2 = {
  feature(){}
}

let instance = Object.assign({},proto1,proto2);
```

### Functional Inheritance is inheritance with privacy
Mitigate the brutality of inheritance: combining privacy with inheritance.

For privacy a closure is needed, within that make your inheritance as you will.

##### A simple example
```
let function createX (args) {
  let private instance features;
  let instance = a new object;

  Add public features to instance which use the private features.
  Make public inheritance somehow to instance.

  return instance;
};
```
It's possible to chain up the private object setup. See _Douglas Crockford: JavaScript: The Good Parts_. Use factory functions to pack all the setup stuff.


### Pseudoclassical Inheritance
That with the 'new' keyword. It mimics the classical inheritance in JavaScript.
Avoid it if you can.

#### Problems with classical inheritance
* Forced two layers thinking even if its not useful. This a priory complication clouds the mind for simple solutions and opens up for thinking in the language drifting away from the domain.

This is simple not needed in JavaScript.

In some OO languages it's a must, but the real problem with classical inheritance there
is probably cultural. A powerful technique will be overused forgetting softer techniques.
This technique is simple too tight for big design.
The resulting class hierarchies are suffer from:

* Fragile Base Class Problem: Tight coupling through the inheritance chain.
* Gorilla/Banana Problem: to get what you want you must get and care about a lot of unneeded stuff.
* Duplication by necessity: a workaround that makes the problem even harder.
