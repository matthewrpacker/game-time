const game = require('./game')

let ufoTopLimit = 0;
let ufoBottomLimit = 290;

function Ufo(x, y, width, height, isFlying) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.isFlying = isFlying;
}

Ufo.prototype.checkFlight = function(){
  if (this.isFlying) {
    var nextBlockY = this.y - 3;
    this.y = Math.max(nextBlockY, ufoTopLimit);
  }
  else {
    var nextBlockY = this.y + 3;
    this.y = Math.min(nextBlockY, ufoBottomLimit);
  }
}

Ufo.prototype.draw = function(){
  game.context.fillRect(this.x, this.y, this.width, this.height);
}

module.exports = Ufo
