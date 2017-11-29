# Pattern to enhance any factory in an arbitrary and transparent way

You have a factory:
```
obj = factory(a,b);

function factory(a,b) {
  return {a,b};
}
```

Let it enhance!
First: a replace:
```
obj = factory(a,b,replacer);

function factory(a,b,replacer) {
  if (replacer) {
    return replacer(a,b);
  }

  ... old factory
}
```
Second: let use the original factory too!
```
obj = FACTORY(a,b,enhancer);

function FACTORY(a,b,enhancer) {
  if (enhancer) {
    return enhancer(FACTORY,a,b);
  }

  ... old factory
}

function ENHANCER(factory,a,b) {
  return a composition of
        your creation and the result of factory(a,b)
}
```
This is already an enhancable factory.
But it can be prepared for more modularity by identifying the
parameters needed by the factory and grouping them together
in a curried version.
Third: curry the enhancer's parameters!
```
obj = FACTORY(a,b,enhancer);

function FACTORY(a,b,enhancer) {
  if (enhancer) {
    return enhancer(FACTORY)(a,b);
  }

  ... old factory
}
```
...to be continued.
