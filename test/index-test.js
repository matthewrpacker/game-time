const chai = require('chai')
const expect = chai.expect;

const Ufo = require('../lib/ufo')

describe ('checkFlight', function() {
  it('allows a user to add a canvas context', function () {
    var canvas = document.createElement('canvas')
    var context = canvas.getContext('2d');
    var ufo = new Ufo;
    expect(ufo.context === context);
  });
  context('is in flight', function() {
    it('should return true', function() {
      function test() {
        "use strict";
        let ufo = new Ufo(60, 60, 10, 10, true);
        checkFlight();
        expect(nextBlockY).to.eq(ufo.y - 3)
      }
    })
  })
  context('is not in flight', function() {
    it('should return false', function() {
      function test() {
        "use strict";
        let ufo = new Ufo(60, 60, 10, 10, false);
        checkFlight();
        expect(nextBlockY).to.eq(ufo.y + 3)
      }
    })
  })
})
