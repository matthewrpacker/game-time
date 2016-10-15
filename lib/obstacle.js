const game = require('./game')

function Obstacle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

Obstacle.prototype.traverse = function(speed) {
  this.x -= speed;
  trackObstacle(this);
}

Obstacle.prototype.draw = function() {
  game.context.fillStyle = "rgb(255,255,255)";
  game.context.fillRect(
    this.x,
    this.y,
    this.width,
    this.height
  );
}

function trackObstacle(obstacle){
  if (obstacle.x < -obstacle.width) { obstacle.x = game.canvas.width; }
}

module.exports = Obstacle;
