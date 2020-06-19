beforeEach(() => {
  jest.resetModules()
})

const mockInput = jest.fn()
jest.mock('readline-sync', () => ({
  question: mockInput
}))

describe('run', () => {
  test('solves intCode operation correctly', () => {
    const { run } = require('../../src/modules/intCodeProcessor')

    expect(run('1,0,0,0,99').array.join(',')).toBe('2,0,0,0,99')

    expect(run('2,3,0,3,99').array.join(',')).toBe('2,3,0,6,99')
    expect(run('1,1,1,4,99,5,6,0,99').array.join(',')).toBe('30,1,1,4,2,5,6,0,99')
    expect(run('1,1,1,4,99,5,6,0').array.join(',')).toBe('30,1,1,4,2,5,6,0')
    expect(run('1,9,10,3,2,3,11,0,99,30,40,50').array.join(',')).toBe('3500,9,10,70,2,3,11,0,99,30,40,50')

    expect(run('1002,4,3,4,33').array.join(',')).toBe('1002,4,3,4,99')
    expect(run('1101,-1,-1,4,0').array.join(',')).toBe('1101,-1,-1,4,-2')
  })

  test('solves two small puzzles with input', () => {
    const spy = jest.spyOn(require('../../src/modules/logger').logger, 'warn')

    const { run } = require('../../src/modules/intCodeProcessor')

    mockInput.mockReturnValueOnce(0)
    run('3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9')
    expect(spy).toHaveBeenCalledWith('output is 0')
    spy.mockClear()

    mockInput.mockReturnValueOnce(1)
    run('3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9')
    expect(spy).toHaveBeenCalledWith('output is 1')
    spy.mockClear()

    mockInput.mockReturnValueOnce(0)
    run('3,3,1105,-1,9,1101,0,0,12,4,12,99,1')
    expect(spy).toHaveBeenCalledWith('output is 0')
    spy.mockClear()

    mockInput.mockReturnValueOnce(1)
    run('3,3,1105,-1,9,1101,0,0,12,4,12,99,1')
    expect(spy).toHaveBeenCalledWith('output is 1')
    spy.mockClear()
  })

  test('solves two small puzzles with pregiven input', () => {
    const spy = jest.spyOn(require('../../src/modules/logger').logger, 'warn')

    const { run } = require('../../src/modules/intCodeProcessor')

    let result = run('3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9', [0])
    expect(spy).toHaveBeenCalledWith('output is 0')
    expect(result.outputs).toStrictEqual([0])
    spy.mockClear()

    result = run('3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9', [1])
    expect(spy).toHaveBeenCalledWith('output is 1')
    expect(result.outputs).toStrictEqual([1])
    spy.mockClear()

    result = run('3,3,1105,-1,9,1101,0,0,12,4,12,99,1', [0])
    expect(spy).toHaveBeenCalledWith('output is 0')
    expect(result.outputs).toStrictEqual([0])
    spy.mockClear()

    result = run('3,3,1105,-1,9,1101,0,0,12,4,12,99,1', [1])
    expect(spy).toHaveBeenCalledWith('output is 1')
    expect(result.outputs).toStrictEqual([1])
    spy.mockClear()
  })

  test('solves larger example with input', () => {
    const spy = jest.spyOn(require('../../src/modules/logger').logger, 'warn')

    const { run } = require('../../src/modules/intCodeProcessor')

    mockInput.mockReturnValueOnce(8)
    run('3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99')
    expect(spy).toHaveBeenCalledWith('output is 1000')
    spy.mockClear()

    mockInput.mockReturnValueOnce(7)
    run('3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99')
    expect(spy).toHaveBeenCalledWith('output is 999')
    spy.mockClear()

    mockInput.mockReturnValueOnce(88)
    run('3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99')
    expect(spy).toHaveBeenCalledWith('output is 1001')
    spy.mockClear()
  })
})

describe('parseIntCode', () => {
  const { parseIntCode } = require('../../src/modules/intCodeProcessor')

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
  const { readValue } = require('../../src/modules/intCodeProcessor')

  test('should read correct values', () => {
    expect(readValue(1, [1, 0, 0, 0, 99], '0')).toBe(1)
    expect(readValue(0, [1, 0, 0, 0, 99], '0')).toBe(0)
    expect(readValue(1, [1, 0, 0, 0, 99], '1')).toBe(0)
    expect(readValue(0, [1, 0, 0, 0, 99], '1')).toBe(1)
  })
})

describe('writeValue', () => {
  const { writeValue } = require('../../src/modules/intCodeProcessor')

  test('should read correct values', () => {
    expect(writeValue(1, [1, 0, 0, 0, 99], '0', 5)).toStrictEqual([5, 0, 0, 0, 99])
    expect(writeValue(0, [1, 0, 0, 0, 99], '0', 5)).toStrictEqual([1, 5, 0, 0, 99])
    expect(writeValue(2, [1, 2, 0, 0, 99], '1', 5)).toStrictEqual([1, 2, 5, 0, 99])
    expect(writeValue(3, [1, 2, 3, 0, 99], '1', 5)).toStrictEqual([1, 2, 3, 5, 99])
  })
})
