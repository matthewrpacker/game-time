let $ = require("jquery");

const Ufo = require('./ufo');
const Obstacle = require('./obstacle');
const truncate = require('./truncate');
const ui = require('./ui');
const score = require('./score')

let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

let ufo = new Ufo({x: 60, y: 60, width: 10, height: 10, isFlying: false});
let topObstacle = new Obstacle({x: canvas.width, y: 0, width: 50, height: 80});
let bottomObstacle = new Obstacle({x: canvas.width, y: canvas.height-80, width: 50, height: 80});
let obstacles = [topObstacle, bottomObstacle];

let parsecs = 0;

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
  topObstacle.traverse(4);
  bottomObstacle.traverse(3);
  ufo.draw();
  topObstacle.draw();
  bottomObstacle.draw();
  checkForCollision();
  displayScore();
  displayDistance();
}

function checkScoreForWin() {
  if (score.currentScore(parsecs) >= 150) { stopGame(); winGame(); }
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
