const chai = require('chai')
const expect = chai.expect;

const score = require('../lib/score')
const truncate = require('../lib/truncate')

describe ('Score', function() {
  context('currentScore', function() {
    it('should return a score', function() {
      parsecs = 10
      result = score.currentScore(parsecs)
      expect(result).to.eq(50)
    })

    it('should return a score for float', function() {
      parsecs = 10.00
      result = score.currentScore(parsecs)
      expect(result).to.eq(50)
    })
  })

  context('saveGameScores', function() {
    it('should store a score', function() {
        parsecs = 10
        score.saveGameScores(parsecs)
        scores = localStorage.getItem('storedScores').split(',').splice(1);

        expect(scores).to.be.instanceof(Array)
        expect(scores[scores.length -1]).to.eq(' 50')
    })
  })

  // need to test function that we do not export
  // context('sortScores', function() {
  //   it('should return difference of two values', function() {
  //     result = sortScores(10, 40)
  //     expect(result).to.eq(30)
  //   })
  // })
})
