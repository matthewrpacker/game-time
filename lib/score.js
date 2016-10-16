let $ = require("jquery");

// const game = require('./game');
const truncate = require('./truncate');

function currentScore(parsecs) {
  return truncate.truncateNumber(parsecs * 10);
}

function saveGameScores(parsecs) {
  localStorage.setItem(
    'storedScores',
    `${localStorage.storedScores}, ${currentScore(parsecs)}`
  );
}

function showGameScores(id) {
  let scores = localStorage.getItem('storedScores').split(',').splice(1);
  sortedScores = scores.sort(sortScores).slice(0, 3);
  sortedScores.forEach(function (score) {
    $(id).append(`<li class="score">${score}</li>`);
  });
}

function appendScores(id, parsecs) {
  $(id).append(`<p>Final Score: ${currentScore(parsecs)}</p>`);
}

function sortScores(a, b) {
  return b - a
}

module.exports = {
  currentScore: currentScore,
  appendScores: appendScores,
  saveGameScores: saveGameScores,
  showGameScores: showGameScores
}
