const chai = require('chai')
const expect = chai.expect;

const World = require('../lib/world')

describe ('World', function(){
  context('default behavior', function(){
    it('should be instantiated', function(){
      function test(){
        "use strict";
        let world = new World;
        expect(world).to.be.an('object')
      }
    })
    it('should accept gravatationalVelocity', function(){
      function test(){
        "use strict";
        let world = new World(2);
        expect(world.gravatationalVelocity).to.deep.equal(2)
      }
    })
  })
})
