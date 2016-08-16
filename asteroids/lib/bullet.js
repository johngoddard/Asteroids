const Util = require('./utils.js');
const MovingObject = require('./moving_object.js');
// const Ship = require('./ship.js');
const Asteroid = require('./asteroid.js');

function Bullet(options){
  options['radius'] = 3;
  options['color'] = "blue";

  MovingObject.call(this,options);
}

Util.inherits(Bullet, MovingObject);



Bullet.prototype.collideWith = function (otherObject) {
  if (otherObject instanceof Asteroid ) {
    this.game.remove(otherObject);
    this.game.remove(this);
  }
};




module.exports = Bullet;
