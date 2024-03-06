function calculateNumber(type, a, b) {
  if (typeof type !== 'string') throw new Error('type must be a string');
  if (!['SUM', 'SUBTRACT', 'DIVIDE'].includes(type))
    throw new Error('Invalid type provided');
  const _a = Math.round(a);
  const _b = Math.round(b);
  if (type === 'SUM') return _a + _b;
  else if (type === 'SUBTRACT') return _a - _b;
  return _a / _b;
}
module.exports = calculateNumber;
