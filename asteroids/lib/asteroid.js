const Util = require('./utils.js');
const MovingObject = require('./moving_object.js');
const Ship = require('./ship.js');

function Asteroid(options){
  options['vel'] = [(-1 + Math.random() * 2 ),(-1 + Math.random() * 2 )];
  options['radius'] = 30;
  options['color'] = "green";

  MovingObject.call(this,options);
}
Util.inherits(Asteroid, MovingObject);



Asteroid.prototype.collideWith = function (otherObject) {
  if (otherObject instanceof Ship ){
    otherObject.relocate();
  }
};

module.exports = Asteroid;
