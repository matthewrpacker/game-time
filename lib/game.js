var $ = require("jquery");

const World = require('./world');
const Ufo = require('./ufo');
const Obstacle = require('./obstacle');
const truncate = require('./truncate');

let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

let world = new World(3);
let ufo = new Ufo(60, 60, 10, 10, false);
let topObstacle = new Obstacle(canvas.width, 0, 50, 80);
let bottomObstacle = new Obstacle(canvas.width, canvas.height-80, 50, 80);
let obstacles = [topObstacle, bottomObstacle];

let parsecs = 0;
let collision = false;

$(function(){
  startGame();
  console.log("Game started!");
});

function startGame(){
  hideScreen('#game, #end-screen, #win-screen');
  loadGame();
}

function loadGame() {
  $('#start-button').click(function(){
    hideScreen('#start-screen');
    showScreen('#game');
    beginGame();
  });
}

function endGame(){
  hideScreen('#game, #start-screen, #win-screen');
  showScreen('#end-screen');
  appendScores('#end-screen');
  setScore();
  getGameScores('#game-over-top-scores');
  showStartScreen('#replay-button');
}

function winGame(){
  hideScreen('#game, #start-screen, #end-screen');
  showScreen('#win-screen');
  appendScores('#win-screen');
  setScore();
  getGameScores('#you-won-top-scores');
  showStartScreen('#restart-button');
}

function hideScreen(id) {
  $(id).hide();
}

function showStartScreen(id) {
  $(id).click(function(){
    document.location.reload();
  });
}

function showScreen(id) {
  $(id).show();
}

function getGameScores(id) {
  let scores = localStorage.getItem('storedScores').split(',');
  scores.forEach(function(score){
    $(id).append(`<li>${score}</li>`);
  });
}

function setScore(){
  localStorage.setItem(
    'storedScores',
    `${localStorage.storedScores}, ${currentScore()}`
  );
}

function appendScores(id) {
  $(id).append(`<p>Final Score: ${currentScore()}</p>`);
}

function beginGame(){
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
  if(currentScore() >= 150) { stop(); winGame(); }
}

function createTopObstacle() {
  topObstacle.x -= 4;
  trackObstacle(topObstacle);
}

function createBottomObstacle() {
  bottomObstacle.x -= 3;
  trackObstacle(bottomObstacle);
}

function stop(){
  if(requestId){
    window.cancelAnimationFrame(requestId);
    requestId = undefined;
  }
}

window.addEventListener('keydown', startFlying);
window.addEventListener('keyup', stopFlying);

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
  context.fillRect(
    topObstacle.x,
    topObstacle.y,
    topObstacle.width,
    topObstacle.height
  );
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
