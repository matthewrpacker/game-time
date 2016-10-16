const game = require('./game');

let ufoTopLimit = 0;
let ufoBottomLimit = 570;

function Ufo(attributes) {
  this.x = attributes.x;
  this.y = attributes.y;
  this.width = attributes.width;
  this.height = attributes.height;
  this.isFlying = attributes.isFlying;
  this.context = attributes.context;
}

Ufo.prototype.checkFlight = function() {
  if (this.isFlying) {
    var nextBlockY = this.y - 3;
    this.y = Math.max(nextBlockY, ufoTopLimit);
  }
  else {
    var nextBlockY = this.y + 3;
    this.y = Math.min(nextBlockY, ufoBottomLimit);
  }
};

Ufo.prototype.draw = function() {
  game.context.fillRect(this.x, this.y, this.width, this.height);
};

module.exports = Ufo;
