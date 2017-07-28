## Functional Programming
1. Functions are objects (_JavaScript supports it_)
2. Input is immutable (_No JavaScript support, it must be forced by the programmer_)
  means the input data are decoupled from any function execution.
3. Input is explicit (_No JavaScript support, it must be forced by the programmer_)
4. Input and output are well typed (_No JavaScript support, and it's often not needed to do something useful_) means the compiler can check the correctness of the input usage.

### The advantages of Functional Programming
From 1. follows
  * A new level of expressiveness.

From 2. and 3. and 4. follow
  * Each function can be reasoned about on its own and __let all other functions reason about which use the same input__. So the reasoning is composable. (Anyway that's the reason why the functional programming semantic has been chosen to do Math through space and time.)

From 2. and 3. follow
  * Each function is automatically parallizable.

### Problems with Haskell
* Missing story-telling capability. The description of the goal of the app, the main players, roles, interactions are much more natural in OOP.
* Discouraging academic language.
* Forcing to think in the type system even if its not useful. It's like the forced two layer thinking of classical OOP languages where you need a class to have an object just for the sake of the language not by a the necessity of the domain.

## Problems with Object Orientation
are arise if it's not combined with Functional Programming. If it concentrates too heavy on states forgetting the danger of shared states.


## Problems with inheritance
Inheritance makes a tight coupling between parent and child classes. The child is a mix of the _whole_ parent and its own things _both in interface and in implementation_. The child must support the whole interface of its parent. Inheritance is a too rough mechanism.

This is true for _all_ type of inheritance.

### 'Prefer Composition over Inheritance'
Composition is much looser: it uses an other object intern. That means it must know only the used part of its _interface_ and has not to represent it in front of the whole application.

### Problems with classical inheritance

* Forced two layers thinking even if its not useful. This a priory complication clouds the mind for simple solutions and opens up for thinking in the language drifting away from the domain.
* Classes have too much power. Only they can instantiate the players of the game. If you need a someway specific figure you must change a class but that change have affect for all instances. This must be compensated somehow and so on and so on. Again we drift away from the domain into the language quirks.

## Inheritance in JavaScript
What is inheritance?

_Giving feature (data/behavior) of an object to another object._

##### For what is inheritance good?
* _In the model level: for abstraction._
* _In the code level: for code reuse._

##### There are two main variants according how the objects are related after the inheritance act:
* the objects stay related
* the objects are detached

But because JavaScript is so flexible, you can mix out your own inheritance mechanisms for your own purposes from different mechanisms!

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
The feature was mixed-in (technically assigned) from another object.
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
Let's give privacy to inheritance!

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
That with the 'new' keyword. Avoid it if you can.



## Abstractions
'Saving a little bit of typing is not a good reason for an abstraction.
Only abstract to solve bugs not because it looks better.
'
Sebastian Markbåge
