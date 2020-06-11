const { calculateFuel } = require('../../src/modules/fuelCalculator')

test('calculates fuel correctly', () => {
  expect(calculateFuel('12')).toBe(2)
  expect(calculateFuel(12)).toBe(2)
  expect(calculateFuel(14)).toBe(2)
  expect(calculateFuel(1969)).toBe(654)
  expect(calculateFuel(100756)).toBe(33583)
  expect(calculateFuel(0)).toBe(-2)
  expect(calculateFuel('x')).toBe(NaN)
})
