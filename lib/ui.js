var $ = require("jquery");

// Hide & Show Screens

function hideScreen(id) {
  $(id).hide();
}

function hideAllScreens() {
  hideScreen('#start-screen, #end-screen, #win-screen, #game');
}

function showScreen(id) {
  $(id).show();
}

function showStartScreen() {
  hideAllScreens();
  showScreen('#start-screen');
}

function showGameScreen() {
  hideAllScreens();
  showScreen('#game');
}

function showEndScreen() {
  hideAllScreens();
  showScreen('#end-screen');
}

function showWinScreen() {
  hideAllScreens();
  showScreen('#win-screen');
}

// Screen Manipulation

function showGameScores(id) {
  let scores = localStorage.getItem('storedScores').split(',');
  scores.forEach(function (score) {
    $(id).append(`<li>${score}</li>`);
  });
}

function reloadPageToStart(id) {
  $(id).click(function() {
    document.location.reload();
  });
}

module.exports = {
  showStartScreen: showStartScreen,
  showGameScreen: showGameScreen,
  showEndScreen: showEndScreen,
  showWinScreen: showWinScreen,
  showGameScores: showGameScores,
  reloadPageToStart: reloadPageToStart
};
