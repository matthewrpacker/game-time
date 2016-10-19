const chai = require('chai');
const expect = chai.expect;

const truncate = require('../lib/truncate');

describe ('Truncate', function() {
  context('truncateNumber', function() {
    it('should return a truncated number', function() {
      var result = truncate.truncateNumber(10.99);
      expect(result).to.eq(10);
    });
  });
});
