const Ship = require('./ship.js');

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
