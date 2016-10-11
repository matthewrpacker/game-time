const chai = require('chai')
const expect = chai.expect;

const Helicopter = require('../lib/helicopter')

describe ('Helicopter', function(){
  context('default behavior', function(){
    it('should be instantiated', function(){
      function test(){
        "use strict";
        let helicopter = new Helicopter;
        expect(helicopter).to.be.an('object')
      }
    })
    it('should have an x-coordinate', function(){
      function test(){
        "use strict";
        let helicopter = new Helicopter(1);
        expect(helicopter.x).to.deep.equal(1)
      }
    })
    it('should have a y-coordinate', function(){
      function test(){
        "use strict";
        let helicopter = new Helicopter(1, 2);
        expect(helicopter.y).to.deep.equal(2)
      }
    })
    it('should have a width', function(){
      function test(){
        "use strict";
        let helicopter = new Helicopter(1, 2, 3);
        expect(helicopter.width).to.deep.equal(3)
      }
    })
    it('should have a height', function(){
      function test(){
        "use strict";
        let helicopter = new Helicopter(1, 2, 3, 4);
        expect(helicopter.height).to.deep.equal(4)
      }
    })
    it('should have a boolean value', function(){
      function test(){
        "use strict";
        let helicopter = new Helicopter(1, 2, 3, 4, true);
        expect(helicopter.isFlying).to.deep.equal(true)
        let helicopter1 = new Helicopter(1, 2, 3, 4, false);
        expect(helicopter1.isFlying).to.deep.equal(false)
      }
    })
  })
})
