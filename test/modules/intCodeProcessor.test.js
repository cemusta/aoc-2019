const { run, parseIntCode, readValue, writeValue } = require('../../src/modules/intCodeProcessor')

describe('run', () => {
  test('solves intCode operation correctly', () => {
    expect(run('1,0,0,0,99').join(','))
      .toBe('2,0,0,0,99')
    expect(run('2,3,0,3,99').join(','))
      .toBe('2,3,0,6,99')
    expect(run('1,1,1,4,99,5,6,0,99').join(','))
      .toBe('30,1,1,4,2,5,6,0,99')
    expect(run('1,1,1,4,99,5,6,0').join(','))
      .toBe('30,1,1,4,2,5,6,0')
    expect(run('1,9,10,3,2,3,11,0,99,30,40,50').join(','))
      .toBe('3500,9,10,70,2,3,11,0,99,30,40,50')

    expect(run('1002,4,3,4,33').join(','))
      .toBe('1002,4,3,4,99')
    expect(run('1101,-1,-1,4,0').join(','))
      .toBe('1101,-1,-1,4,-2')
  })
})

describe('parseIntCode', () => {
  test('should parse opcode inputs correctly', () => {
    expect(parseIntCode('1002'))
      .toStrictEqual({ opcode: '02', params: ['0', '1', '0'] })
    expect(parseIntCode(1002))
      .toStrictEqual({ opcode: '02', params: ['0', '1', '0'] })
    expect(parseIntCode('2'))
      .toStrictEqual({ opcode: '02', params: ['0', '0', '0'] })
    expect(parseIntCode('1'))
      .toStrictEqual({ opcode: '01', params: ['0', '0', '0'] })
    expect(parseIntCode('10101'))
      .toStrictEqual({ opcode: '01', params: ['1', '0', '1'] })
    expect(parseIntCode('0'))
      .toStrictEqual({ opcode: '00', params: ['0', '0', '0'] })
    expect(parseIntCode(0))
      .toStrictEqual({ opcode: '00', params: ['0', '0', '0'] })
  })
})

describe('readValue', () => {
  test('should read correct values', () => {
    expect(readValue(1, [1, 0, 0, 0, 99], '0')).toBe(1)
    expect(readValue(0, [1, 0, 0, 0, 99], '0')).toBe(0)
    expect(readValue(1, [1, 0, 0, 0, 99], '1')).toBe(0)
    expect(readValue(0, [1, 0, 0, 0, 99], '1')).toBe(1)
  })
})

describe('writeValue', () => {
  test('should read correct values', () => {
    expect(writeValue(1, [1, 0, 0, 0, 99], '0', 5)).toStrictEqual([5, 0, 0, 0, 99])
    expect(writeValue(0, [1, 0, 0, 0, 99], '0', 5)).toStrictEqual([1, 5, 0, 0, 99])
    expect(writeValue(2, [1, 2, 0, 0, 99], '1', 5)).toStrictEqual([1, 2, 5, 0, 99])
    expect(writeValue(3, [1, 2, 3, 0, 99], '1', 5)).toStrictEqual([1, 2, 3, 5, 99])
  })
})
