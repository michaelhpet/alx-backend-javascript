const assert = require('assert');
const { describe, it } = require('mocha');
const calculateNumber = require('./0-calcul');

describe('rounds', () => {
  it('should return a whole number', () => {
    assert.equal(calculateNumber(10.71, 3.21), 14);
    assert.equal(calculateNumber(1, 3), 4);
    assert.equal(calculateNumber(1, 3.7), 5);
    assert.equal(calculateNumber(1.5, 3.7), 6);
  });
});
