const truncate = require('./truncate')
const game = require('./game')

function currentScore(parsecs) {
  return truncate.truncateNumber(parsecs * 10);
}

module.exports = {
  currentScore: currentScore
}
