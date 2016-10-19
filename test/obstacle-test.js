const chai = require('chai');
const expect = chai.expect;

const game = require('../lib/game');
const Obstacle = require('../lib/obstacle');

describe ('Obstacle', function() {
  context('default behavior', function() {
    it('should be instantiated', function() {
      function test() {
        let obstacle = new Obstacle();
        expect(obstacle).to.be.an('object');
      }
    });
    it('should have an x-coordinate', function() {
      function test() {
        let obstacle = new Obstacle(1);
        expect(obstacle.x).to.deep.equal(1);
      }
    });
    it('should have a y-coordinate', function() {
      function test() {
        let obstacle = new Obstacle(1, 2);
        expect(obstacle.y).to.deep.equal(2);
      }
    });
    it('should have a width', function() {
      function test() {
        let obstacle = new Obstacle(1, 2, 3);
        expect(obstacle.width).to.deep.equal(3);
      }
    });
    it('should have a height', function() {
      function test() {
        let obstacle = new Obstacle(1, 2, 3, 4);
        expect(obstacle.height).to.deep.equal(4);
      }
    });
  });

  context('trackObstacle', function() {
    function trackObstacle(obstacle) {
      if (obstacle.x < -obstacle.width) {
        obstacle.x = 400;
      }
    }
    it('should reset position when it moves off screen', function() {
      var obstacle = new Obstacle({context: context, x: 7, y: 0, width: 7, height: 7});
      expect(obstacle.x).to.eq(7);
      trackObstacle(obstacle);
      obstacle.traverse(16);
      expect(obstacle.x).to.eq(400);
    });
  });
});
