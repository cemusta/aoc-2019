const { hasAdjecentSame, hasAdjecentDoubleOnly, everIncrising } = require('../../src/modules/passwordOperations')

describe('hasAdjecentSame', () => {
  test('finds passwords with at least two adjacent characters are the same', () => {
    expect(hasAdjecentSame('111111')).toBe(true)
    expect(hasAdjecentSame('223450')).toBe(true)
    expect(hasAdjecentSame('123789')).toBe(false)
    expect(hasAdjecentSame('0123456789')).toBe(false)
    expect(hasAdjecentSame('9876543210')).toBe(false)
    expect(hasAdjecentSame('aa1234')).toBe(true)
    expect(hasAdjecentSame('1234aa')).toBe(true)
  })
})

describe('hasAdjecentDoubleOnly', () => {
  test('finds passwords with at least two adjacent characters are the same', () => {
    expect(hasAdjecentDoubleOnly('111111')).toBe(false)
    expect(hasAdjecentDoubleOnly('111144')).toBe(true)
    expect(hasAdjecentDoubleOnly('441111')).toBe(true)
    expect(hasAdjecentDoubleOnly('444111')).toBe(false)
    expect(hasAdjecentDoubleOnly('122345')).toBe(true)
    expect(hasAdjecentDoubleOnly('111122')).toBe(true)
    expect(hasAdjecentDoubleOnly('112233')).toBe(true)
    expect(hasAdjecentDoubleOnly('0123456789')).toBe(false)
    expect(hasAdjecentDoubleOnly('9876543210')).toBe(false)
    expect(hasAdjecentDoubleOnly('aa1234')).toBe(true)
    expect(hasAdjecentDoubleOnly('1234aa')).toBe(true)
  })
})

describe('everIncrising', () => {
  test('finds passwords from left to right, numbers increase or stay the same', () => {
    expect(everIncrising('111111')).toBe(true)
    expect(everIncrising('223450')).toBe(false)
    expect(everIncrising('223455')).toBe(true)
    expect(everIncrising('123789')).toBe(true)
    expect(everIncrising('0123456789')).toBe(true)
    expect(everIncrising('9876543210')).toBe(false)
  })
})
