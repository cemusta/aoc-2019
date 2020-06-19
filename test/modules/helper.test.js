
const { permute } = require('../../src/modules/helpers')

describe('permute', () => {
  test('calculates permutations correctly', () => {
    expect(permute([0])).toStrictEqual([[0]])
    expect(permute([0, 1])).toStrictEqual([[0, 1], [1, 0]])
    expect(permute([1, 2, 3])).toStrictEqual([[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]])
  })
})
