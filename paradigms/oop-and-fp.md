## Problems with Haskell

* Missing story-telling capability. The description of the goal of the app, the main players, roles, interactions are much more natural in OOP.
* Unneeded brutal academic language.
* Forcing to think in the type system even if its not useful. It's like the forced two layer thinking of classical OOP languages where you need a class to have an object just for the sake of the language not by a the necessity of the domain.

## Problems with Object Orientation
are arise if it's not combined with Functional Programming. If it concentrates too heavy on states forgetting the danger of shared states.


## Problems with inheritance
Inheritance makes a tight coupling between parent and child classes. The child is a mix of the _whole_ parent and its own things _both in interface and in implementation_. The child must support the whole interface of its parent. Inheritance is a too rough mechanism.

This is true for both prototypal and classical inheritance.

### 'Prefer Composition over Inheritance'
Composition is much looser: it uses an other object intern. That means it must know only the used part of its _interface_ and has not to represent it in front of the whole application.

### Problems with classical inheritance

* Forced two layers thinking even if its not useful. This a priory complication clouds the mind for simple solutions and opens up for thinking in the language drifting away from the domain.
* Classes have too much power. Only they can instantiate the players of the game. If you need a someway specific figure you must change a class but that change have affect for all instances. This must be compensated somehow ans so on and so on. Again we drift away from the domain into the language.
