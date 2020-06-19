const { Processor } = require('../../src/modules/intCodeProcessor')

describe('Processor', () => {
  test('solves intCode basic operation correctly', async () => {
    let processor = new Processor('1,0,0,0,99')
    await processor.start()
    expect(processor.array.join(',')).toBe('2,0,0,0,99')

    processor = new Processor('2,3,0,3,99')
    await processor.start()
    expect(processor.array.join(',')).toBe('2,3,0,6,99')

    processor = new Processor('1,1,1,4,99,5,6,0,99')
    await processor.start()
    expect(processor.array.join(',')).toBe('30,1,1,4,2,5,6,0,99')

    processor = new Processor('1,1,1,4,99,5,6,0')
    await processor.start()
    expect(processor.array.join(',')).toBe('30,1,1,4,2,5,6,0')

    processor = new Processor('1,9,10,3,2,3,11,0,99,30,40,50')
    await processor.start()
    expect(processor.array.join(',')).toBe('3500,9,10,70,2,3,11,0,99,30,40,50')
  })

  test('solves intCode operations with relative/immidiate positions correctly', async () => {
    let processor = new Processor('1002,4,3,4,33')
    await processor.start()
    expect(processor.array.join(',')).toBe('1002,4,3,4,99')

    processor = new Processor('1101,-1,-1,4,0')
    await processor.start()
    expect(processor.array.join(',')).toBe('1101,-1,-1,4,-2')
  })

  test('solves two simple puzzles with input', async () => {
    const firstPuzzle = '3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9'
    const secondPuzzle = '3,3,1105,-1,9,1101,0,0,12,4,12,99,1'

    let processor = new Processor(firstPuzzle)
    processor.input(0)
    await processor.start()
    expect(await processor.output()).toBe(0)

    processor = new Processor(firstPuzzle)
    processor.input(1)
    await processor.start()
    expect(await processor.output()).toBe(1)

    processor = new Processor(secondPuzzle)
    processor.input(0)
    await processor.start()
    expect(await processor.output()).toBe(0)

    processor = new Processor(secondPuzzle)
    processor.input(1)
    await processor.start()
    expect(await processor.output()).toBe(1)
  })

  test('solves larger example with input', async () => {
    let processor = new Processor('3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99')
    processor.input(8)
    await processor.start()
    expect(await processor.output()).toBe(1000)

    processor = new Processor('3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99')
    processor.input(7)
    await processor.start()
    expect(await processor.output()).toBe(999)

    processor = new Processor('3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99')
    processor.input(9)
    await processor.start()
    expect(await processor.output()).toBe(1001)
  })

  test('solves first day 9 example', async () => {
    const puzzle = '109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99'
    const processor = new Processor(puzzle)
    await processor.start()
    expect(await processor.outputs.join(',')).toBe(puzzle)
  })

  test('solves second day 9 example', async () => {
    const processor = new Processor('1102,34915192,34915192,7,4,7,99,0')
    await processor.start()
    expect(await processor.output()).toBe(1219070632396864)
  })

  test('solves third day 9 example', async () => {
    const processor = new Processor('104,1125899906842624,99')
    await processor.start()
    expect(await processor.output()).toBe(1125899906842624)
  })
})

describe('parseIntCode', () => {
  const { parseIntCode } = require('../../src/modules/intCodeProcessor')

  test('should parse opcode inputs correctly', () => {
    expect(parseIntCode('1002'))
      .toStrictEqual({ opcode: '02', params: ['pos', 'imm', 'pos'] })
    expect(parseIntCode(1002))
      .toStrictEqual({ opcode: '02', params: ['pos', 'imm', 'pos'] })
    expect(parseIntCode('2'))
      .toStrictEqual({ opcode: '02', params: ['pos', 'pos', 'pos'] })
    expect(parseIntCode('204'))
      .toStrictEqual({ opcode: '04', params: ['rel', 'pos', 'pos'] })
    expect(parseIntCode('10101'))
      .toStrictEqual({ opcode: '01', params: ['imm', 'pos', 'imm'] })
  })
})

describe('readValue', () => {
  const { readValue } = require('../../src/modules/intCodeProcessor')

  test('should read correct values', () => {
    const a = { array: [1, 0, 0, 0, 99], index: 0 }
    expect(readValue(a, 1, 'pos')).toBe(1)
    expect(readValue(a, 0, 'pos')).toBe(0)
    expect(readValue(a, 1, 'imm')).toBe(0)
    expect(readValue(a, 0, 'imm')).toBe(1)
  })
})

describe('writeValue', () => {
  const { writeValue } = require('../../src/modules/intCodeProcessor')

  test('should read correct values', () => {
    expect(writeValue(1, [1, 0, 0, 0, 99], 'pos', 5)).toStrictEqual([5, 0, 0, 0, 99])
    expect(writeValue(0, [1, 0, 0, 0, 99], 'pos', 5)).toStrictEqual([1, 5, 0, 0, 99])
    expect(writeValue(2, [1, 2, 0, 0, 99], 'imm', 5)).toStrictEqual([1, 2, 5, 0, 99])
    expect(writeValue(3, [1, 2, 3, 0, 99], 'imm', 5)).toStrictEqual([1, 2, 3, 5, 99])
  })
})
