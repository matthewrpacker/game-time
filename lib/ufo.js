const game = require('./game');

let ufoTopLimit = 10;
let ufoBottomLimit = 560;

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
    let nextBlockY = this.y - 6;
    this.y = Math.max(nextBlockY, ufoTopLimit);
  }
  else {
    let nextBlockY = this.y + 6;
    this.y = Math.min(nextBlockY, ufoBottomLimit);
  }
};

Ufo.prototype.draw = function() {
  game.context.beginPath();
  game.context.ellipse(this.x+this.width/2, this.y, this.height/2, this.height/2, 0, 0, 2*Math.PI);
  game.context.fill();

  game.context.beginPath();
  game.context.ellipse(this.x+this.width/2, this.y+this.height/2, this.width/2, this.height/2, 0, 0, 2*Math.PI);
  game.context.fill();
};

module.exports = Ufo;
