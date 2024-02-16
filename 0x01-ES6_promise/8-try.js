export default function divideFunction(numerator, demoninator) {
  if (demoninator === 0) throw new Error('cannot divide by 0');
  return numerator / demoninator;
}
