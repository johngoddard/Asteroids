const Asteroid = require('./asteroid.js');
const Ship = require('./ship.js');

function Game(dimX, dimY, numAsteroids){
  this.DIM_X = dimX;
  this.DIM_Y = dimY;
  this.NUM_ASTEROIDS = numAsteroids;
  this.ship = new Ship({pos: this.randomPosition(), game: this});
  this.asteroids = [];
  this.bullets = [];



  while(this.asteroids.length < this.NUM_ASTEROIDS){
    this.addAsteroids();
  }
}
Game.prototype.allObjects = function () {
  return this.asteroids.concat(this.bullets, [this.ship]);
};

Game.prototype.addAsteroids = function () {
  this.asteroids.push(new Asteroid({pos: this.randomPosition(), game: this}));
};
Game.prototype.addBullet = function (bullet) {
  this.bullets.push(bullet);
};


Game.prototype.randomPosition = function () {
  return [this.DIM_X * Math.random(), this.DIM_Y * Math.random()];
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  this.allObjects().forEach( function (asteroid) {
    asteroid.draw(ctx);
  });
};

Game.prototype.moveAsteroids = function () {
  this.allObjects().forEach( function (asteroid) {
    asteroid.move();
  });
};

Game.prototype.step = function () {
  this.moveAsteroids();
  this.checkCollisions();
};

Game.prototype.wrap = function (pos) {
  return [(((pos[0] % this.DIM_X) + this.DIM_X) % this.DIM_X) ,
          (((pos[1] % this.DIM_Y) + this.DIM_Y) % this.DIM_Y)];
};

Game.prototype.checkCollisions = function () {
  let objects = this.allObjects();

  for (let i = 0; i < objects.length - 1; i++){
    for(let j = i + 1; j < objects.length; j++){
      if(objects[i].isCollidedWith(objects[j])){
        objects[i].collideWith(objects[j]);
      }
    }
  }
};

Game.prototype.remove = function (object) {
  let idx = this.asteroids.indexOf(object);
  this.asteroids.splice(idx, 1);
};

module.exports = Game;
