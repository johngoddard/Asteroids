/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(1);
	const Asteroid = __webpack_require__(2);
	const GameView = __webpack_require__(4);
	const Game = __webpack_require__(5);
	const Ship = __webpack_require__(6);
	const Util = __webpack_require__(3);
	const Bullet = __webpack_require__(7);

	window.addEventListener('DOMContentLoaded', function(){
	  let canvas = document.getElementById('game-canvas');
	  let context = canvas.getContext('2d');
	  let game = new Game(600, 600, 10);
	  let gView = new GameView(game, context);
	  gView.start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3);

	function MovingObject(options){
	  this.pos = options['pos'];
	  this.vel = options['vel'];
	  this.radius = options['radius'];
	  this.color = options['color'];
	  this.game = options['game'];
	}

	MovingObject.prototype.draw = function (ctx) {
	  ctx.fillStyle = this.color;
	  ctx.beginPath();

	  ctx.arc(
	    this.pos[0],
	    this.pos[1],
	    this.radius,
	    0,
	    2 * Math.PI,
	    false
	  );
	  ctx.fill();
	};

	MovingObject.prototype.move = function () {
	  this.pos[0] += this.vel[0];
	  this.pos[1] += this.vel[1];

	  this.pos = this.game.wrap(this.pos);
	};

	MovingObject.prototype.isCollidedWith = function (otherObject) {
	  if(Util.distance(this.pos, otherObject.pos) < this.radius + otherObject.radius){
	    return true;
	  }

	  return false;
	};

	MovingObject.prototype.collideWith = function (otherObject) {};

	module.exports = MovingObject;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3);
	const MovingObject = __webpack_require__(1);
	const Ship = __webpack_require__(6);

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


/***/ },
/* 3 */
/***/ function(module, exports) {

	const Util = {

	  inherits: function (childClass, parentClass){
	      function Surrogate (){}
	      Surrogate.prototype = parentClass.prototype;
	      childClass.prototype = new Surrogate();
	      childClass.prototype.constructor = childClass;
	  },

	  distance: function (pos1, pos2){
	    return Math.sqrt(Math.pow((pos1[0] - pos2[0]), 2) +
	    Math.pow((pos1[1] - pos2[1]), 2));
	    },
	};




	module.exports = Util;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Ship = __webpack_require__(6);

	function GameView(game, ctx) {
	  this.game = game;
	  this.ctx = ctx;
	}

	GameView.prototype.start = function () {
	  let gameThis = this;
	  this.bindKeyHandlers(this.game);
	  setInterval( () => {
	    gameThis.game.draw(gameThis.ctx);
	    gameThis.game.step();
	  },20);
	};

	GameView.prototype.bindKeyHandlers = function (game) {
	  key('w', function(){ game.ship.power([0,-1]) });
	  key('s', function(){ game.ship.power([0, 1]) });
	  key('a', function(){ game.ship.power([-1, 0]) });
	  key('d', function(){ game.ship.power([1, 0]) });
	  key('f', function(){ game.ship.fireBullet() });
	};

	module.exports = GameView;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(2);
	const Ship = __webpack_require__(6);

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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3);
	const MovingObject = __webpack_require__(1);
	const Bullet = __webpack_require__(7);

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


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3);
	const MovingObject = __webpack_require__(1);
	// const Ship = require('./ship.js');
	const Asteroid = __webpack_require__(2);

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


/***/ }
/******/ ]);