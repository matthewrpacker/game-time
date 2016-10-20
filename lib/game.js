let $ = require("jquery");
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

const Ufo = require('./ufo');
const Obstacle = require('./obstacle');
const truncate = require('./truncate');
const ui = require('./ui');
const score = require('./score');


let asteroidReady = false;
let asteroid = new Image();

asteroid.onload = function () {
  asteroidReady = true;
};

asteroid.src = "asteroid.png";

let starReady = false;
let star = new Image();

star.onload = function () {
  starReady = true;
};

star.src = "star.png";

let ufo = new Ufo({x: 230, y: 60, width: 50, height: 20, isFlying: false});

const canvasWidthOffset = canvas.width + 600;

let obstacles = [];
let bonusObstacles = [];
let allObstacles = [];

let obstacleAttributes = [{},
                          {y: 100, speed: 7.5},
                          {y: canvas.height-75},
                          {x: canvasWidthOffset},
                          {x: canvasWidthOffset, y: 200},
                          {y: canvas.height - 200, speed: 8},
                          {x: canvasWidthOffset, y: canvas.height-75},
                          {x: canvasWidthOffset, speed: 8, direction: -1},
                          {x: canvasWidthOffset, y: canvas.height-300, speed: 8},
                          {x: canvasWidthOffset, y: canvas.height-75, speed: 9, direction: 1},
                          ];

bonusObstacleAttributes = [{x: canvas.width+100, y: 100},
                           {x: canvas.width+100, y: canvas.height-100, speed: 8}
                          ];

obstacleAttributes.forEach(function(attributes) {
  obstacles.push(new Obstacle(attributes));
});

bonusObstacleAttributes.forEach(function(attributes) {
  bonusObstacles.push(new Obstacle(attributes));
});

obstacles.forEach(function(obstacle) {
  allObstacles.push(obstacle);
});

bonusObstacles.forEach(function(obstacle) {
  allObstacles.push(obstacle);
});

// obstacles.push(new Obstacle({y: 100, speed: 7.5}));
// obstacles.push(new Obstacle({y: canvas.height-75}));
// obstacles.push(new Obstacle({y: canvas.height - 200, speed: 8}));
// obstacles.push(new Obstacle({x: canvasWidthOffset, y: 200}));
// obstacles.push(new Obstacle({x: canvasWidthOffset, speed: 8, direction: -1}));
// obstacles.push(new Obstacle({x: canvasWidthOffset, y: canvas.height-300, speed: 8}));
// obstacles.push(new Obstacle({x: canvasWidthOffset, y: canvas.height-75, speed: 9, direction: 1}));
// obstacles.push(new Obstacle({x: canvasWidthOffset, y: canvas.height-75}));
// obstacles.push(new Obstacle({x: canvasWidthOffset}));
// obstacles.push(new Obstacle({}));

// let topBonusObstacle = new Obstacle({x: canvas.width+100, y: 100});
// let bottomBonusObstacle = new Obstacle({x: canvas.width+100, y: canvas.height-100, speed: 8});

// let bonusObstacles = [topBonusObstacle, bottomBonusObstacle];

// let allObstacles = [topBonusObstacle, bottomBonusObstacle];

let parsecs = 0;

let collisionSound = new Audio('Torpedo+Explosion.mp3');
let bonusSound = new Audio('Metroid_Door-Brandino480-995195341.mp3');
let levelSound = new Audio('162479_kastenfrosch_beam.mp3');
let themeMusic = new Audio('8-bit-Arcade4.mp3');
themeMusic.play();

$(function() {
  startGame();
});

function startGame() {
  ui.showStartScreen();
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
  ui.showEndScreen();
  setFinalScreen('#end-screen', '#game-over-top-scores', '#replay-button');
}

function winGame() {
  ui.showWinScreen();
  setFinalScreen('#win-screen', '#you-won-top-scores', '#restart-button');
}

function setFinalScreen(screenId, scoresId, buttonId) {
  stopListeningForKey();
  score.appendScores(screenId, parsecs);
  score.saveGameScores(parsecs);
  score.showGameScores(scoresId);
  ui.reloadPageToStart(buttonId);
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

function runGame() {
  parsecs += 0.1;

  ufo.checkFlight();

  allObstacles.forEach(function(obstacle) {
    obstacle.traverse();
  });

  ufo.draw();

  if(asteroidReady){
    obstacles.forEach(function(obstacle){
      context.drawImage(asteroid, obstacle.x, obstacle.y);
    });
  }

  if(starReady){
    bonusObstacles.forEach(function(obstacle) {
      context.drawImage(star, obstacle.x, obstacle.y);
    });
  }

  checkForCollision();
  checkForBonus();
  displayScore();
  displayDistance();
}

function increaseSpeed() {
  allObstacles.forEach(function(obstacle) {
    obstacle.speedModifer(0.006);
  });
  parsecs += 0.1;
}

function points() {
  return score.currentScore(parsecs);
}

function displayLevel(level) {
  context.font = "30px Bangers";
  context.fillText(`Level: ${level}`, 600, 30);
}

function levelUp(level) {
  increaseSpeed();
  displayLevel(level);
  levelSound.play();
}

function levelOfDifficulty() {
  if(points() < 500) {
    displayLevel(1);
  }
  if(points() >= 500 && points() <= 999) {
    levelUp(2);
  }
  if (points() >= 1000 && points() <= 1499) {
    levelUp(3);
  }
  if (points() >= 1500 && points() <= 1999) {
    levelUp(4);
  }
  if (points() >= 2000 && points() <= 2499) {
    levelUp(5);
  }
  if (points() >= 2500 && points() <= 2999) {
    levelUp(6);
  }
  if (points() >= 3000 && points() <= 4000) {
    levelUp(7);
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
      parsecs += 5;
    }
  });
}

module.exports.canvas = canvas;
module.exports.context = context;
