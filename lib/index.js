var World = require('./world')
var Helicopter = require('./helicopter')
var Obstacle = require('./obstacle')

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

  checkFlight();

  obstacle1.x -= 4
  trackObstacle(obstacle1);

  obstacle2.x -= 3
  trackObstacle(obstacle2);

  drawHelicopter();
  drawObstacles();

  window.requestAnimationFrame(gameLoop);
});

window.addEventListener('keydown', startFlying);
window.addEventListener('keyup', stopFlying);

function drawObstacles() {
  context.fillRect(obstacle1.x, obstacle1.y, obstacle1.width, obstacle1.height);
  context.fillRect(obstacle2.x, obstacle2.y, obstacle2.width, obstacle2.height);
}

function drawHelicopter(){
  context.fillRect(helicopter.x, helicopter.y, helicopter.width, helicopter.height);
}

function trackObstacle(obstacle){
  if (obstacle.x < -obstacle.width) {
    obstacle.x = canvas.width
  }
}

function checkFlight(){
  if (helicopter.isFlying) {
    var nextBlockY = helicopter.y - 3;
    helicopter.y = Math.max(nextBlockY, helicopterTopLimit);
  }
  else {
    var nextBlockY = helicopter.y + 3;
    helicopter.y = Math.min(nextBlockY, helicopterBottomLimit);
  }
}

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
