export function isValidInn(value) {
  return /\d{10}/.test(value);
}
