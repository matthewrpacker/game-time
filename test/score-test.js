const chai = require('chai');
const expect = chai.expect;

const score = require('../lib/score');

describe ('Score', function() {
  context('currentScore', function() {
    it('should return a score', function() {
      var parsecs = 10;
      var result = score.currentScore(parsecs);
      expect(result).to.eq(20);
    });

    it('should return a score for float', function() {
      var parsecs = 10.00;
      var result = score.currentScore(parsecs);
      expect(result).to.eq(20);
    });
  });

  context('saveGameScores', function() {
    it('should store a score', function() {
        var parsecs = 10;
        score.saveGameScores(parsecs);
        var scores = localStorage.getItem('storedScores').split(',').splice(1);

        expect(scores).to.be.instanceof(Array);
        expect(scores[scores.length -1]).to.eq(' 20');
    });
  });
});
