let $ = require("jquery");

const Ufo = require('./ufo');
const Obstacle = require('./obstacle');
const truncate = require('./truncate');
const ui = require('./ui');
const score = require('./score')

let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

let asteroidReady = false;
let asteroid = new Image();

asteroid.onload = function () {
    asteroidReady = true;
};

asteroid.src = "../asteroid.png";

let starReady = false;
let star = new Image();

star.onload = function () {
    starReady = true;
};

star.src = "../star.png";

let ufo = new Ufo({x: 230, y: 60, width: 50, height: 20, isFlying: false});

let topObstacle = new Obstacle({x: canvas.width, y: 100, width: 50, height: 50});
let bottomObstacle = new Obstacle({x: canvas.width, y: canvas.height-200, width: 50, height: 50});
let topObstacle_2 = new Obstacle({x: canvas.width+600, y: 200, width: 50, height: 50});
let bottomObstacle_2 = new Obstacle({x: canvas.width+600, y: canvas.height-300, width: 50, height: 50});
let topObstacle_3 = new Obstacle({x: canvas.width+600, y: 0, width: 50, height: 50});
let bottomObstacle_3 = new Obstacle({x: canvas.width+600, y: canvas.height-75, width: 50, height: 50});
let topObstacle_4 = new Obstacle({x: canvas.width, y: 0, width: 50, height: 50});
let bottomObstacle_4 = new Obstacle({x: canvas.width, y: canvas.height-75, width: 50, height: 50});

let obstacles = [topObstacle, bottomObstacle, topObstacle_2, bottomObstacle_2, topObstacle_3, bottomObstacle_3, topObstacle_4, bottomObstacle_4];

let topBonusObstacle = new Obstacle({x: canvas.width+100, y: 100, width: 50, height: 50});
let bottomBonusObstacle = new Obstacle({x: canvas.width+100, y: canvas.height-100, width: 50, height: 50});

let bonusObstacles = [topBonusObstacle, bottomBonusObstacle]

let parsecs = 0;
let speed = 7

let themeMusic = new Audio('8-bit-Arcade4.mp3');
themeMusic.play();
let collisionSound = new Audio('Torpedo+Explosion.mp3');
let bonusSound = new Audio('Metroid_Door-Brandino480-995195341.mp3');

$(function() {
  startGame();
});

function startGame() {
  // window.removeEventListener('keydown', replayFunction);
  ui.showStartScreen()
  loadStartButton();
  window.addEventListener('keydown', spacebarFunction);
}

function spacebarFunction(e) {
  if (e.keyCode === 32) {
    e.preventDefault();
    loadGame();
  }
}

function replayFunction(e) {
  if (e.keyCode === 32) {
    e.preventDefault();
    document.location.reload();
  }
}

function loadStartButton() {
  $('#start-button').click(function() {
    loadGame();
  });
}

function loadGame() {
  window.removeEventListener('keydown', spacebarFunction);
  ui.showGameScreen();
  listenForKey();
  beginGame();
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
  setTimeout(function() {
    window.addEventListener('keydown', replayFunction);
  }, 1200);
}

function winGame() {
  stopListeningForKey();
  ui.showWinScreen();
  score.appendScores('#win-screen', parsecs);
  score.saveGameScores(parsecs);
  score.showGameScores('#you-won-top-scores');
  ui.reloadPageToStart('#restart-button');
  setTimeout(function() {
    window.addEventListener('keydown', replayFunction);
  }, 1200);
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

let direction = 0
function runGame() {
  parsecs += 0.1;

  ufo.checkFlight();
  topObstacle.traverse(speed + .5, direction);
  topObstacle_2.traverse(speed, direction);
  topObstacle_3.traverse(speed +1, -1);
  topObstacle_4.traverse(speed, direction);
  bottomObstacle.traverse(speed +1, direction);
  bottomObstacle_2.traverse(speed +1, direction);
  bottomObstacle_3.traverse(speed +2, 1);
  bottomObstacle_4.traverse(speed, direction);
  topBonusObstacle.traverse(speed, direction);
  bottomBonusObstacle.traverse(speed+1, direction);
  ufo.draw();

  if(asteroidReady){
    context.drawImage(asteroid, topObstacle.x, topObstacle.y)
    context.drawImage(asteroid, topObstacle_2.x, topObstacle_2.y)
    context.drawImage(asteroid, topObstacle_3.x, topObstacle_3.y)
    context.drawImage(asteroid, topObstacle_4.x, topObstacle_4.y)
    context.drawImage(asteroid, bottomObstacle.x, bottomObstacle.y)
    context.drawImage(asteroid, bottomObstacle_2.x, bottomObstacle_2.y)
    context.drawImage(asteroid, bottomObstacle_3.x, bottomObstacle_3.y)
    context.drawImage(asteroid, bottomObstacle_4.x, bottomObstacle_4.y)
  }

  // topBonusObstacle.draw();
  // bottomBonusObstacle.draw();

  if(starReady){
    context.drawImage(star, topBonusObstacle.x, topBonusObstacle.y)
    context.drawImage(star, bottomBonusObstacle.x, bottomBonusObstacle.y)
  }

  checkForCollision();
  checkForBonus();
  displayScore();
  displayDistance();
}

function increaseSpeed() {
  speed = speed + .01
  parsecs += .1
}

function points() {
  return score.currentScore(parsecs)
}

function levelOfDifficulty() {
  if(points() >= 500 && points() <= 700) {
    increaseSpeed();
  }
  else if (points() >= 1000 && points() <= 1200) {
    increaseSpeed();
  }
  else if (points() >= 1500 && points() <= 1700) {
    increaseSpeed();
  }
  else if (points() >= 2000 && points() <= 2200) {
    increaseSpeed();
  }
  else if (points() >= 2500 && points() <= 2700) {
    increaseSpeed();
  }
  else if (points() >= 3000 && points() <= 3200) {
    speed = speed + .02
    parsecs += .1
  }
}

function checkScoreForWin() {
  if (points() >= 4000) { stopGame(); winGame(); }
}

function stopGame() {
  if (requestId) {
    window.cancelAnimationFrame(requestId);
    requestId = undefined;
  }
}

function displayDistance() {
  context.font = "30px Bangers";
  context.fillText(`Parsecs: ${truncate.truncateNumber(parsecs)}`, 60, 30);
}

function displayScore() {
  context.font = "30px Bangers";
  context.fillStyle = "white";
  context.fillText(`Score: ${points()}`, canvas.width - 200, 30);
}

function startFlying(e) {
  if (e.keyCode === 32) {
    e.preventDefault();
    ufo.isFlying = true;
  }
}

function stopFlying(e) {
  if (e.keyCode === 32) { ufo.isFlying = false; }
}

function checkForCollision() {
  var collision = false;
  let ufoTopX = ufo.x+ufo.width/2-ufo.height/2;
  let ufoTopY = ufo.y-ufo.height/2;
  let ufoTopWidth = ufo.height;
  let ufoTopHeight = ufo.height;

  obstacles.forEach(function (obstacle) {
    let collisionWithTop = ufoTopX < obstacle.x + obstacle.width &&
    ufoTopX + ufoTopWidth > obstacle.x &&
    ufoTopY < obstacle.y + obstacle.height &&
    ufoTopHeight + ufoTopY > obstacle.y;

    let collisionWithBottom = ufo.x < obstacle.x + obstacle.width &&
    ufo.x + ufo.width > obstacle.x &&
    ufo.y < obstacle.y + obstacle.height &&
    ufo.height + ufo.y > obstacle.y;

    if (collisionWithTop || collisionWithBottom) {
      collisionSound.play();
      return collision = true;
    }
  });
  return collision;
}

function checkForBonus() {
  let ufoTopX = ufo.x+ufo.width/2-ufo.height/2;
  let ufoTopY = ufo.y-ufo.height/2;
  let ufoTopWidth = ufo.height;
  let ufoTopHeight = ufo.height;

  bonusObstacles.forEach(function (obstacle) {
    let collisionWithTop = ufoTopX < obstacle.x + obstacle.width &&
    ufoTopX + ufoTopWidth > obstacle.x &&
    ufoTopY < obstacle.y + obstacle.height &&
    ufoTopHeight + ufoTopY > obstacle.y;

    let collisionWithBottom = ufo.x < obstacle.x + obstacle.width &&
    ufo.x + ufo.width > obstacle.x &&
    ufo.y < obstacle.y + obstacle.height &&
    ufo.height + ufo.y > obstacle.y;

    if (collisionWithTop || collisionWithBottom) {
      bonusSound.play();
      console.log('hit the bonus')
      parsecs += 10
    }
  });
}

module.exports.canvas = canvas;
module.exports.context = context;
