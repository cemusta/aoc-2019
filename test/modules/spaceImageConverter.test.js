const fs = require('fs')
const { decode } = require('../../src/modules/spaceImageConverter')

describe('decode', () => {
  test('should solve day 8 problem correctly', () => {
    const sum = decode(25, 6, fs.readFileSync('./inputs/day8.input', 'utf8'))
    expect(sum).toBe(1742)
  })
})
