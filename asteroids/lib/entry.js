const Game = require('./game.js');
const GameView = require('./game_view.js');

window.addEventListener('DOMContentLoaded', function(){
  let canvas = document.getElementById('game-canvas');
  let context = canvas.getContext('2d');
  let game = new Game(600, 600, 10);
  let gView = new GameView(game, context);
  gView.start();
});
