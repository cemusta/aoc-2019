const { calculateFuel, calculateRecursiveFuel } = require('../../src/modules/fuelCalculator')

describe('calculateFuel', () => {
  test('calculates fuel correctly', () => {
    expect(calculateFuel('12')).toBe(2)
    expect(calculateFuel(12)).toBe(2)
    expect(calculateFuel(14)).toBe(2)
    expect(calculateFuel(1969)).toBe(654)
    expect(calculateFuel(100756)).toBe(33583)
    expect(calculateFuel(0)).toBe(-2)
    expect(calculateFuel('x')).toBe(NaN)
  })
})

describe('calculateRecursiveFuel', () => {
  test('calculates fuel correctly', () => {
    expect(calculateRecursiveFuel(0)).toBe(0)
    expect(calculateRecursiveFuel(1)).toBe(0)
    expect(calculateRecursiveFuel(14)).toBe(2)
    expect(calculateRecursiveFuel(1969)).toBe(966)
    expect(calculateRecursiveFuel(100756)).toBe(50346)
    expect(calculateRecursiveFuel('x')).toBe(0)
  })
})
