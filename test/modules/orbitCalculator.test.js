const testCase = `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L
K)YOU
I)SAN`

const { countOrbitCheckSums, minimumTransferNeeded, parseOrbital } = require('../../src/modules/orbitCalculator')

describe('countOrbitCheckSums', () => {
  test('solves test case correctly', () => {
    const count = countOrbitCheckSums(testCase)
    expect(count).toBe(54)
  })
})

describe('minimumTransferNeeded', () => {
  test('solves test case correctly', () => {
    const count = minimumTransferNeeded(testCase)
    expect(count).toBe(4)
  })
})

describe('parseOrbital', () => {
  test('parses orbital inputs test case correctly', () => {
    const result = parseOrbital('COM)B')
    expect(result).toStrictEqual({ center: 'COM', satellite: 'B' })
  })

  test('parses and removes trailing chars from orbital inputs', () => {
    const result = parseOrbital('COM)B\r')
    expect(result).toStrictEqual({ center: 'COM', satellite: 'B' })
  })

  test('parses orbital throws error on wrong input', () => {
    expect(() => {
      parseOrbital('X->A')
    }).toThrowError('wrong orbital input: X->A')
  })
})
