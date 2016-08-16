const MovingObject = require('./moving_object.js');
const Asteroid = require('./asteroid.js');
const GameView = require('./game_view.js');
const Game = require('./game.js');
const Ship = require('./ship.js');
const Util = require('./utils.js');
const Bullet = require('./bullet.js');

window.addEventListener('DOMContentLoaded', function(){
  let canvas = document.getElementById('game-canvas');
  let context = canvas.getContext('2d');
  let game = new Game(600, 600, 10);
  let gView = new GameView(game, context);
  gView.start();
});
