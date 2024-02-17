export default function cleanSet(set, startString) {
  if (
    !set
    && !startString
    && !(set instanceof Set)
    && typeof startString !== 'string'
  ) return '';

  const tokens = [];
  for (const value of set.values()) {
    if (typeof value === 'string' && value.startsWith(startString)) {
      const valueSubStr = value.substring(startString.length);
      if (valueSubStr && valueSubStr !== value) tokens.push(valueSubStr);
    }
  }
  return tokens.join('-');
}
