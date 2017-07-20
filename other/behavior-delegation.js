/*
Behavior delegation suggests objects as peers of each other, which delegate among themselves,
rather than parent child class relationships.

The [[Prototype]] mechanism is a delegation mechanism, by its very designed nature.
It allows to implement the class modelling but it's much natural to use it directly.


*/

//USE BEHAVIOR DELEGATION INSTEAD OF CLASS MODELLING
//That is much more appropriate to JavaScript.
//Layered chained functionality
//top layer
const Widget = {
    initWidget(width,height){
      this.width = width;
      this.height = height;
    },
    renderWidget(where){
      console.log(`   renderWidget to ${where}`);
    }
}

const Button = {
    initButton(width,height,label){
      this.initWidget(width,height);
      this.label = label;
      this.elem = `elem ${label}`;
    },
    renderButton(where){
      console.log(`renderButton to ${where}`);
      this.renderWidget(where);
    }
}
Object.setPrototypeOf(Button,Widget);

Button.create = function ButtonCreate(width,height,label){
  let button = Object.create(Button);
  button.initButton(width,height,label);

  return button;
}

let btn1 = Button.create( 125, 30, "Hello" );
let btn2 = Button.create( 150, 40, "World" );

btn1.renderButton( 'body' );
btn2.renderButton( 'body' );


//Concise methods have name
let o9 = {
  i:0,
  f(){
    console.log(`f i:${this.i}`);
    this.i++;
    if (this.i<3) {
      this.f();
    }
  }
};
console.assert(o9.f.name === 'f');
o9.f();
let o10 = Object.create(o9);
o10.i = 0;
o10.f();
