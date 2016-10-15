let $ = require("jquery");

const Ufo = require('./ufo');
const Obstacle = require('./obstacle');
const truncate = require('./truncate');
const ui = require('./ui');
const score = require('./score')

let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

let ufo = new Ufo({x: 190, y: 60, width: 10, height: 10, isFlying: false});
let topObstacle = new Obstacle({x: canvas.width, y: 100, width: 100, height: 100});
let bottomObstacle = new Obstacle({x: canvas.width, y: canvas.height-200, width: 100, height: 100});
let topObstacle_2 = new Obstacle({x: canvas.width+600, y: 200, width: 100, height: 100});
let bottomObstacle_2 = new Obstacle({x: canvas.width+600, y: canvas.height-300, width: 100, height: 100});
let topObstacle_3 = new Obstacle({x: canvas.width+600, y: 0, width: 100, height: 100});
let bottomObstacle_3 = new Obstacle({x: canvas.width+600, y: canvas.height-100, width: 100, height: 100});
let obstacles = [topObstacle, bottomObstacle, topObstacle_2, bottomObstacle_2, topObstacle_3, bottomObstacle_3];

let parsecs = 0;
let speed = 7

$(function() {
  startGame();
});

function startGame() {
  ui.showStartScreen()
  loadStartButton();
}

function loadStartButton() {
  $('#start-button').click(function() {
    ui.showGameScreen();
    listenForKey();
    beginGame();
  });
}

function listenForKey() {
  window.addEventListener('keydown', startFlying);
  window.addEventListener('keyup', stopFlying);
}

function stopListeningForKey() {
  window.removeEventListener('keydown', startFlying);
  window.removeEventListener('keyup', stopFlying);
}

function endGame() {
  stopListeningForKey();
  ui.showEndScreen();
  score.appendScores('#end-screen', parsecs);
  score.saveGameScores(parsecs);

  score.showGameScores('#game-over-top-scores');
  ui.reloadPageToStart('#replay-button');
}

function winGame() {
  stopListeningForKey();
  ui.showWinScreen();
  score.appendScores('#win-screen', parsecs);
  score.saveGameScores(parsecs);
  score.showGameScores('#you-won-top-scores');
  ui.reloadPageToStart('#restart-button');
}

function beginGame() {
  window.requestAnimationFrame(function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if(!checkForCollision()) {
      runGame();
      levelOfDifficulty();
      requestId = window.requestAnimationFrame(gameLoop);
      checkScoreForWin(parsecs);
    }
    else {
      endGame();
    }
  });
}

function runGame() {
  parsecs += 0.1;

  ufo.checkFlight();
  topObstacle.traverse(speed);
  topObstacle_2.traverse(speed);
  topObstacle_3.traverse(speed +1);
  bottomObstacle.traverse(speed +1);
  bottomObstacle_2.traverse(speed +1);
  bottomObstacle_3.traverse(speed +2);
  ufo.draw();
  topObstacle.draw();
  topObstacle_2.draw();
  topObstacle_3.draw();
  bottomObstacle.draw();
  bottomObstacle_2.draw();
  bottomObstacle_3.draw();
  checkForCollision();
  displayScore();
  displayDistance();
}

function levelOfDifficulty() {
  if(score.currentScore(parsecs) >= 500 && score.currentScore(parsecs) <= 550) {
    speed = speed + .05
    parsecs += .1
  }
  else if (score.currentScore(parsecs) >= 1000 && score.currentScore(parsecs) <= 1050) {
    speed = speed + .05
    parsecs += .1
  }
}

function checkScoreForWin() {
  if (score.currentScore(parsecs) >= 1500) { stopGame(); winGame(); }
}

function stopGame() {
  if (requestId) {
    window.cancelAnimationFrame(requestId);
    requestId = undefined;
  }
}

function displayDistance() {
  context.font = "16px Arial";
  context.fillText(`Parsecs: ${truncate.truncateNumber(parsecs)}`, 10, 20);
}

function displayScore() {
  context.font = "16px Arial";
  context.fillText(`Score: ${score.currentScore(parsecs)}`, canvas.width - 90, 20);
}

function startFlying(e) {
  if (e.keyCode === 32) { ufo.isFlying = true; }
}

function stopFlying(e) {
  if (e.keyCode === 32) { ufo.isFlying = false; }
}

function checkForCollision() {
  collision = false
  obstacles.forEach(function(obstacle){
    if (ufo.x < obstacle.x + obstacle.width &&
      ufo.x + ufo.width > obstacle.x &&
      ufo.y < obstacle.y + obstacle.height &&
      ufo.height + ufo.y > obstacle.y) {
        collision = true;
    }
  });
  return collision
}

module.exports.canvas = canvas;
module.exports.context = context;
