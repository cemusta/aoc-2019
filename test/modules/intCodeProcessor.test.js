const { run } = require('../../src/modules/intCodeProcessor')

describe('run', () => {
  test('solves intCode operation correctly', () => {
    expect(run('1,0,0,0,99'.split(',').map(x => Number(x))).join(','))
      .toBe('2,0,0,0,99')
    expect(run('2,3,0,3,99'.split(',').map(x => Number(x))).join(','))
      .toBe('2,3,0,6,99')
    expect(run('1,1,1,4,99,5,6,0,99'.split(',').map(x => Number(x))).join(','))
      .toBe('30,1,1,4,2,5,6,0,99')
    expect(run('1,9,10,3,2,3,11,0,99,30,40,50'.split(',').map(x => Number(x))).join(','))
      .toBe('3500,9,10,70,2,3,11,0,99,30,40,50')
  })
})
