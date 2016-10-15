const chai = require('chai');
const expect = chai.expect;
const stub = require('./support/stub');

const Obstacle = require('../lib/obstacle');
const Ufo = require('../lib/ufo');
const game = require('../lib/game');

describe('Obstacle', function() {
  describe('traverse', function() {
    var obstacle = new Obstacle({x: 400, y: 0, width: 50, height: 80});

    it('should increment the obstacle', function() {
      expect(obstacle.x).to.eq(400);
      obstacle.traverse(4);
      expect(obstacle.x).to.eq(396);
    });
  });

  describe('draw', function(){
    it('should call fillRect on the canvas', function() {
      game.context = stub().of("fillRect");
      var obstacle = new Obstacle({context: context, x: 400, y: 0, width: 50, height: 80});
      obstacle.draw();
      expect(game.context.fillRect.calls.length).to.eq(1);
    });

    it('should pass the length, width, x, y to fillRect', function(){
      game.context = stub().of("fillRect");
      var obstacle = new Obstacle({context: context, x: 400, y: 0, width: 50, height: 80});
      obstacle.draw();
      expect(game.context.fillRect.calls[0][0]).to.eq(obstacle.x);
      expect(game.context.fillRect.calls[0][1]).to.eq(obstacle.y);
      expect(game.context.fillRect.calls[0][2]).to.eq(obstacle.width);
      expect(game.context.fillRect.calls[0][3]).to.eq(obstacle.height);
    });
  });
});

describe('Ufo', function() {
  describe('checkFlight', function() {
    var ufo = new Ufo({x: 60, y: 60, width: 10, height: 10, isFlying: true});

    it('should increment the ufo', function() {
      expect(ufo.y).to.eq(60);
      ufo.checkFlight();
      expect(ufo.y).to.eq(57);
    });
  });

  describe('draw', function(){
    it('should call fillRect on the canvas', function() {
      game.context = stub().of("fillRect");
      var ufo = new Ufo({context: context, x: 60, y: 60, width: 10, height: 10});
      ufo.draw();
      expect(game.context.fillRect.calls.length).to.eq(1);
    });

    it('should pass the length, width, x, y to fillRect', function(){
      game.context = stub().of("fillRect");
      var ufo = new Ufo({context: context, x: 60, y: 60, width: 10, height: 10});
      ufo.draw();
      expect(game.context.fillRect.calls[0][0]).to.eq(ufo.x);
      expect(game.context.fillRect.calls[0][1]).to.eq(ufo.y);
      expect(game.context.fillRect.calls[0][2]).to.eq(ufo.width);
      expect(game.context.fillRect.calls[0][3]).to.eq(ufo.height);
    });
  });
});
