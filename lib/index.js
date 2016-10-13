var $ = require("jquery");
require('./time.js')

const World = require('./world')
const Ufo = require('./ufo')
const Obstacle = require('./obstacle')

let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

let world = new World(3);
let ufo = new Ufo(60, 60, 10, 10, false);
let obstacle1 = new Obstacle(canvas.width, 0, 50, 80);
let obstacle2 = new Obstacle(canvas.width, canvas.height-80, 50, 80);
let obstacles = [obstacle1, obstacle2]

let ufoTopLimit = 0;
let ufoBottomLimit = canvas.height - ufo.height;
let parsecs = 0
let collision = false

$(function(){
  startGame();
  console.log("Game started!")
})

function startGame(){
    $('#game').hide();
    $('#end-screen').hide();
    $('#win-screen').hide();
    $('#start-button').click(function(){
      $('#start-screen').hide();
      beginGame();
      $('#game').show();
    })
}

function endGame(){
  $('#game').hide();
  $('#start-screen').hide();
  $('#win-screen').hide();
  $('#end-screen').show();
  $('#end-screen').append("<p>Final Score: " + currentScore() + "</p>");
  $('#replay-button').click(function(){
    document.location.reload();
  })
}

function winGame(){
  $('#win-screen').show();
  $('#win-screen').append("<p>Final Score: " + currentScore() + "</p>");
  $('#game').hide();
  $('#restart-button').click(function(){
    document.location.reload();
  })
  $('#start-screen').hide();
  $('#end-screen').hide();
}

function beginGame(){
  window.requestAnimationFrame(function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if(collision == false) {
      parsecs += .1
      checkFlight();

      obstacle1.x -= 4
      trackObstacle(obstacle1);

      obstacle2.x -= 3
      trackObstacle(obstacle2);

      drawUfo();
      drawObstacles();
      checkForCollision();
      displayScore();
      currentDistance();

      requestId = window.requestAnimationFrame(gameLoop, context);
      if(currentScore() >= 150){
        stop();
        winGame();
      }
    }
    else {
      endGame();
    }
  });
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
  context.fillText("Parsecs:" + ' ' + truncateNumber(parsecs), 10, 20)
}

function displayScore() {
  context.font = "16px Arial";
  context.fillText("Score:" + ' ' + currentScore(), canvas.width - 90, 20);
}

function currentScore() {
  return truncateNumber(parsecs * 10);
}

function truncateNumber(number) {
  return Math.round(number);
}

function drawObstacles() {
  context.fillRect(obstacle1.x, obstacle1.y, obstacle1.width, obstacle1.height);
  context.fillRect(obstacle2.x, obstacle2.y, obstacle2.width, obstacle2.height);
}

function drawUfo(){
  context.fillRect(ufo.x, ufo.y, ufo.width, ufo.height);
}

function trackObstacle(obstacle){
  if (obstacle.x < -obstacle.width) {
    obstacle.x = canvas.width
  }
}

function checkFlight(){
  if (ufo.isFlying) {
    var nextBlockY = ufo.y - 3;
    ufo.y = Math.max(nextBlockY, ufoTopLimit);
  }
  else {
    var nextBlockY = ufo.y + 3;
    ufo.y = Math.min(nextBlockY, ufoBottomLimit);
  }
}

function startFlying(e) {
  if (e.keyCode === 32) {
    ufo.isFlying = true;
  }
}

function stopFlying(e) {
  if (e.keyCode === 32) {
    ufo.isFlying = false;
  }
}

function checkForCollision() {
  obstacles.forEach(function(obstacle){
    if (ufo.x < obstacle.x + obstacle.width &&
      ufo.x + ufo.width > obstacle.x &&
      ufo.y < obstacle.y + obstacle.height &&
      ufo.height + ufo.y > obstacle.y) {
        collision = true
      }
    })
  }
