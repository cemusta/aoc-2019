const fs = require('fs')
const { countOrbitCheckSums } = require('../src/modules/orbitCalculator')

describe('general solution', () => {
  test('should work without a problem', () => {
    require('../src/index.js')
  })
})

describe('day 2 part 1 solution', () => {
  test('should solve problem', () => {
    const result = require('../src/index.js').runIntCode()
    expect(result).toBe(3101878)
  })
})

describe('day 4 part 2 solution', () => {
  test('should solve problem', () => {
    const result = require('../src/index.js').bruteForce(347312, 805915)
    expect(result).toBe(364)
  })
})

describe('day 6 part 1 solution', () => {
  test('should solve problem', () => {
    // call needed operation here
    const orbits = fs.readFileSync('./inputs/day6.input', 'utf8')
    const count = countOrbitCheckSums(orbits)
    expect(count).toBe(295834)
  })
})
