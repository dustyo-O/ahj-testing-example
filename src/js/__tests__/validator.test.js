import { isValidInn } from '../validators';

test('it should return true for valid inn', () => {
  const input = '7715964180';

  expect(isValidInn(input)).toBe(true);
});

test('it should return false for invalid inn', () => {
  const input = 'q715964180';

  expect(isValidInn(input)).toBe(false);
});

test('it should return false for short inn', () => {
  const input = '715964180';

  expect(isValidInn(input)).toBe(false);
});
