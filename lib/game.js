var $ = require("jquery");

const World = require('./world');
const Ufo = require('./ufo');
const Obstacle = require('./obstacle');
const truncate = require('./truncate');
const ui = require('./ui');

let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

let world = new World(3);
let ufo = new Ufo(60, 60, 10, 10, false);
let topObstacle = new Obstacle(canvas.width, 0, 50, 80);
let bottomObstacle = new Obstacle(canvas.width, canvas.height-80, 50, 80);
let obstacles = [topObstacle, bottomObstacle];

let parsecs = 0;
let collision = false;

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
  appendScores('#end-screen');
  setScore();
  ui.showGameScores('#game-over-top-scores');
  ui.reloadPageToStart('#replay-button');
}

function winGame() {
  stopListeningForKey();
  ui.showWinScreen();
  appendScores('#win-screen');
  setScore();
  ui.showGameScores('#you-won-top-scores');
  ui.reloadPageToStart('#restart-button');
}

function setScore() {
  localStorage.setItem(
    'storedScores',
    `${localStorage.storedScores}, ${currentScore()}`
  );
}

// Next step move this function to ui.js
// Issue - this function relies on currentScore
// Should move cureentScore out, but where?
function appendScores(id) {
  $(id).append(`<p>Final Score: ${currentScore()}</p>`);
}

function beginGame() {
  window.requestAnimationFrame(function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if(!collision) {
      runGame();
      requestId = window.requestAnimationFrame(gameLoop);
      checkScoreForWin();
    }
    else {
      endGame();
    }
  });
}

function runGame() {
  parsecs += 0.1;

  ufo.checkFlight();
  createTopObstacle();
  createBottomObstacle();
  ufo.draw();
  drawObstacles();
  checkForCollision();
  displayScore();
  currentDistance();
}

function checkScoreForWin() {
  if (currentScore() >= 150) { stop(); winGame(); }
}

function createTopObstacle() {
  topObstacle.x -= 4;
  trackObstacle(topObstacle);
}

function createBottomObstacle() {
  bottomObstacle.x -= 3;
  trackObstacle(bottomObstacle);
}

function stop() {
  if (requestId) {
    window.cancelAnimationFrame(requestId);
    requestId = undefined;
  }
}

function currentDistance() {
  context.font = "16px Arial";
  context.fillText(`Parsecs: ${truncate.truncateNumber(parsecs)}`, 10, 20);
}

function displayScore() {
  context.font = "16px Arial";
  context.fillText(`Score: ${currentScore()}`, canvas.width - 90, 20);
}

function currentScore() {
  return truncate.truncateNumber(parsecs * 10);
}

function drawObstacles() {
  context.fillStyle = "rgb(255,255,255)";
  context.fillRect(
    topObstacle.x,
    topObstacle.y,
    topObstacle.width,
    topObstacle.height
  );
  context.fillStyle = "rgb(255,255,255)";
  context.fillRect(
    bottomObstacle.x,
    bottomObstacle.y,
    bottomObstacle.width,
    bottomObstacle.height
  );
}

function trackObstacle(obstacle){
  if (obstacle.x < -obstacle.width) { obstacle.x = canvas.width; }
}

function startFlying(e) {
  if (e.keyCode === 32) { ufo.isFlying = true; }
}

function stopFlying(e) {
  if (e.keyCode === 32) { ufo.isFlying = false; }
}

function checkForCollision() {
  obstacles.forEach(function(obstacle){
    if (ufo.x < obstacle.x + obstacle.width &&
      ufo.x + ufo.width > obstacle.x &&
      ufo.y < obstacle.y + obstacle.height &&
      ufo.height + ufo.y > obstacle.y) {
        collision = true;
    }
  });
}

module.exports.canvas = canvas;
module.exports.context = context;
