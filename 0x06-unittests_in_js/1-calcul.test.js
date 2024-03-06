const assert = require('assert');
const { describe, it } = require('mocha');
const calculateNumber = require('./1-calcul');

describe('check type argument', () => {
  it('should throw type error', () => {
    assert.throws(() => calculateNumber(1, 1, 2));
    assert.throws(() => calculateNumber(false, 1, 2));
  });
  it('should throw value error', () => {
    assert.throws(() => calculateNumber('MULTIPLICATION', 1, 3.4));
    assert.throws(() => calculateNumber('MODULUS', 1, 3.4));
    assert.throws(() => calculateNumber('', 1, 3.4));
  });
});

describe('check results', () => {
  it('should return a whole number', () => {
    assert.equal(calculateNumber('SUM', 1.1, 6.7), 8);
  });
  it('should return a negative number', () => {
    assert.equal(calculateNumber('SUBTRACT', 1.7, 8.2), -6);
  });
  it('should return zero', () => {
    assert.equal(calculateNumber('DIVIDE', 0.2, 1.8), 0);
  });
});
