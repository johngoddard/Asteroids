

Function.prototype.inherits = function (parentClass) {
  //  let surr = new Surrogate();
  function Surrogate(){}
  Surrogate.prototype = parentClass.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
};


function Animal(name){
 this.name = name;
}

function Cat(name, color){
  Animal.call(this, name);
  this.color = color;
}


Animal.prototype.eat = function(){
  console.log("I'm eating!");
};


Cat.inherits(Animal);

Cat.prototype.meow = function(){
  console.log("meow!");
  console.log(this.name);
  console.log(this.color);
};

let animal = new Animal("Forest");
// animal.meow();
let cat = new Cat("Joe","yellow");
cat.eat();
cat.meow();
