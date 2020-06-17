
describe('general solution', () => {
  test('should work without a problem', () => {
    require('../src/index.js')
  })
})

describe('day 4 part 2 solution', () => {
  test('should solve problem', () => {
    const result = require('../src/index.js').bruteForce(347312, 805915)
    expect(result).toBe(364)
  })
})
