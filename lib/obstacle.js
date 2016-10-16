const game = require('./game')

function Obstacle(attributes) {
  this.x = attributes.x;
  this.y = attributes.y;
  this.width = attributes.width;
  this.height = attributes.height;
  this.context = attributes.context;
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
