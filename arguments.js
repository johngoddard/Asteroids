function sum(){
  let args = Array.prototype.slice.call(arguments);
  let currSum = 0;
  args.forEach((el) => {currSum += el;});

  return currSum;
}

// console.log(sum(1,2,3,4));


function sum2(...args){
  let currSum = 0;
  args.forEach((el) => {currSum += el;});

  return currSum;
}

// console.log(sum2(1,2,3,4));

class Cat {
  constructor(name) {
    this.name = name;
  }

  says(sound, person) {
    console.log(`${this.name} says ${sound} to ${person}!`);
    return true;
  }
}

const markov = new Cat("Markov");
const breakfast = new Cat("Breakfast");

Function.prototype.myBind = function(obj, ...otherArgs){

  return (...args) => {
    console.log(args);
    this.apply(obj, otherArgs.concat(args ) );
  };
};
//
// markov.says.myBind(breakfast, "meow", "Kush")();
// markov.says.myBind(breakfast)("meow", "a tree");
// markov.says.myBind(breakfast, "meow")("Markov");

function curriedSum(numArgs)  {
  let numbers = [];

  let _curriedSum = function (number) {
    numbers.push(number);

    if (numbers.length === numArgs) {
      return sum(...numbers);
    } else {
      return _curriedSum;
    }
  };

  return _curriedSum;
}


// const testSum = curriedSum(4);
// console.log(testSum(5)(30)(20)(1)); // => 56

Function.prototype.curry = function (numArgs){
  let args = [];
  let func = this;
  let _curryFunction = function(arg){
    args.push(arg);
    if(args.length === numArgs){
      return func.call(null, ...args);
    } else{
      return _curryFunction;
    }
  };

  return _curryFunction;
};

let testSum = sum.curry(5);

console.log(testSum(5)(30)(20)(1)(4));
