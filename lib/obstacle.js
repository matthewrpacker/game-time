const game = require('./game');

function Obstacle(attributes) {
  this.x = attributes.x;
  this.y = attributes.y;
  this.width = attributes.width;
  this.height = attributes.height;
  this.context = attributes.context;
}

Obstacle.prototype.traverse = function(speed, direction) {
  this.x -= speed;
  this.y -= direction;
  trackObstacle(this);
  trackSmallObstacle(this);
};

Obstacle.prototype.draw = function() {
  game.context.fillStyle = "rgb(255,255,255)";
  game.context.fillRect(
    this.x,
    this.y,
    this.width,
    this.height
  );
};

function trackObstacle(obstacle){
  if (obstacle.x < -obstacle.width) {
    obstacle.x = game.canvas.width;
  }
}

function trackSmallObstacle(obstacle){
  if (obstacle.x < -obstacle.width || obstacle.y < -obstacle.height || obstacle.y > (game.canvas.height + obstacle.height)) {
    obstacle.x = game.canvas.width;
    obstacle.y = 300;
  }
}

module.exports = Obstacle;
