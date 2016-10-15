const chai = require('chai')
const expect = chai.expect;

const Obstacle = require('../lib/obstacle')

// TODO: consider obstacle default values

describe ('Obstacle', function() {
  context('default behavior', function() {
    it('should be instantiated', function() {
      function test() {
        "use strict";
        let obstacle = new Obstacle;
        expect(obstacle).to.be.an('object')
      }
    })
    it('should have an x-coordinate', function() {
      function test() {
        "use strict";
        let obstacle = new Obstacle(1);
        expect(obstacle.x).to.deep.equal(1)
      }
    })
    it('should have a y-coordinate', function() {
      function test() {
        "use strict";
        let obstacle = new Obstacle(1, 2);
        expect(obstacle.y).to.deep.equal(2)
      }
    })
    it('should have a width', function() {
      function test() {
        "use strict";
        let obstacle = new Obstacle(1, 2, 3);
        expect(obstacle.width).to.deep.equal(3)
      }
    })
    it('should have a height', function() {
      function test() {
        "use strict";
        let obstacle = new Obstacle(1, 2, 3, 4);
        expect(obstacle.height).to.deep.equal(4)
      }
    })
  })
})
