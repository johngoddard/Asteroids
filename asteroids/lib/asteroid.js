const Util = require('./utils.js');
// const Ship = require('./ship.js');
const MovingObject = require('./moving_object.js');

function Asteroid(options){
  options['vel'] = [(-1 + Math.random() * 3 ),(-1 + Math.random() * 3 )];
  options['radius'] = 30;
  options['color'] = "green";

  MovingObject.call(this,options);
}
Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.collideWith = function (otherObject) {
  if (otherObject.constructor.name === 'Ship'){
    otherObject.relocate();
  }
};

module.exports = Asteroid;
