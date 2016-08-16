const Util = require('./utils.js');
const MovingObject = require('./moving_object.js');


function Bullet(options){
  options['radius'] = 3;
  options['color'] = "blue";

  MovingObject.call(this,options);
}

Util.inherits(Bullet, MovingObject);

Bullet.prototype.collideWith = function (otherObject) {
  if (otherObject.constructor.name === 'Asteroid') {
    this.game.remove(otherObject);
    this.game.remove(this);
  }
};

Bullet.prototype.isWrappable = function () {
  return false;
};




module.exports = Bullet;
