const game = require('./game');

function Obstacle(attributes) {
  this.x = attributes.x || 1260;
  this.y = attributes.y || 0;
  this.width = attributes.width || 50;
  this.height = attributes.height || 50;
  this.speed = attributes.speed || 7;
  this.direction = attributes.direction || 0;
  this.context = attributes.context;
}

Obstacle.prototype.traverse = function() {
  this.x -= this.speed;
  this.y -= this.direction;
  trackObstacle(this);
  trackSmallObstacle(this);
};

Obstacle.prototype.speedModifer = function(number) {
  this.speed = this.speed + number;
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
