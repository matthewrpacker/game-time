function World(gravatationalVelocity) {
  this.gravatationalVelocity = gravatationalVelocity;
}
// TODO: refactor: make a base class called block to use for helicopter and obstacle
function Helicopter(x, y, width, height, isFlying) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.isFlying = isFlying;
}

function Obstacle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var world = new World(3);
var helicopter = new Helicopter(60, 60, 10, 10, false);
var obstacle1 = new Obstacle(canvas.width, 0, 50, 80);
var obstacle2 = new Obstacle(canvas.width, canvas.height-80, 50, 80);

var helicopterTopLimit = 0;
var helicopterBottomLimit = canvas.height - helicopter.height;

window.requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  if (helicopter.isFlying) {
    var nextBlockY = helicopter.y - world.gravatationalVelocity;
    helicopter.y = Math.max(nextBlockY, helicopterTopLimit);
  }
  else {
    var nextBlockY = helicopter.y + world.gravatationalVelocity;
    helicopter.y = Math.min(nextBlockY, helicopterBottomLimit);
  }

  // move obstacle1 from right to left
  obstacle1.x -= 4
  if (obstacle1.x < -obstacle1.width) {
    obstacle1.x = canvas.width
  }

  obstacle2.x -= 3
  if (obstacle2.x < -obstacle2.width) {
    obstacle2.x = canvas.width
  }
  context.fillRect(helicopter.x, helicopter.y, helicopter.width, helicopter.height);
  context.fillRect(obstacle1.x, obstacle1.y, obstacle1.width, obstacle1.height);
  context.fillRect(obstacle2.x, obstacle2.y, obstacle2.width, obstacle2.height);

  window.requestAnimationFrame(gameLoop);
});

window.addEventListener('keydown', startFlying);
window.addEventListener('keyup', stopFlying);

function startFlying(e) {
  if (e.keyCode === 85) {
    helicopter.isFlying = true;
  }
}

function stopFlying(e) {
  if (e.keyCode === 85) {
    helicopter.isFlying = false;
  }
}
