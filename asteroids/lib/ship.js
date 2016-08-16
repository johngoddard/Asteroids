const Util = require('./utils.js');
const MovingObject = require('./moving_object.js');
const Bullet = require('./bullet.js');

function Ship (options) {
  options['vel'] = [0,0];
  options['radius'] = 10;
  options['color'] = "red";
  MovingObject.call(this,options);
}

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function () {
  this.pos = this.game.randomPosition();
  this.vel = [0,0];
};

Ship.prototype.power = function (impulse) {
  this.vel = [this.vel[0] + impulse[0], this.vel[1] + impulse[1]]
};

Ship.prototype.fireBullet = function () {
  let bullet = new Bullet({pos: this.pos, vel: this.bulletVelocity(),
                           game: this.game});
  this.game.addBullet(bullet);
};

Ship.prototype.bulletVelocity = function () {
  if(this.vel[0] === 0 && this.vel[1] === 0){
    return [ 2 * (Math.random() - 1), 2 * (Math.random() - 1)];
  }else{
    return [this.vel[0] * 2, this.vel[1] * 2];
  }
};

module.exports = Ship;
