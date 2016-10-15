const chai = require('chai')
const expect = chai.expect;
// //

const game = require('../lib/game')
const Ufo = require('../lib/ufo')

describe ('Ufo', function() {
  context('default behavior', function() {
    it('should be instantiated', function() {
      function test() {
        "use strict";
        let ufo = new Ufo;
        expect(ufo).to.be.an('object')
      }
    })
    it('should have an x-coordinate', function() {
      function test() {
        "use strict";
        let ufo = new Ufo(1);
        expect(ufo.x).to.deep.equal(1)
      }
    })
    it('should have a y-coordinate', function() {
      function test() {
        "use strict";
        let ufo = new Ufo(1, 2);
        expect(ufo.y).to.deep.equal(2)
      }
    })
    it('should have a width', function() {
      function test() {
        "use strict";
        let ufo = new Ufo(1, 2, 3);
        expect(ufo.width).to.deep.equal(3)
      }
    })
    it('should have a height', function() {
      function test() {
        "use strict";
        let ufo = new Ufo(1, 2, 3, 4);
        expect(ufo.height).to.deep.equal(4)
      }
    })
    it('should have a boolean value', function() {
      function test() {
        "use strict";
        let ufo = new Ufo(1, 2, 3, 4, true);
        expect(ufo.isFlying).to.deep.equal(true)
        let ufo1 = new Ufo(1, 2, 3, 4, false);
        expect(ufo1.isFlying).to.deep.equal(false)
      }
    })
  })
})

describe ('checkFlight', function() {
  context('is in flight', function() {
    it('should return true', function() {
      function test() {
        "use strict";
        let ufo = new Ufo(60, 60, 10, 10, true);
        ufo.checkFlight();
        expect(nextBlockY).to.eq(ufo.y - 3)
      }
    })
  })
  context('is not in flight', function() {
    it('should return false', function() {
      function test() {
        "use strict";
        let ufo = new Ufo(60, 60, 10, 10, false);
        ufo.checkFlight();
        expect(nextBlockY).to.eq(ufo.y + 3)
      }
    })
  })
})
