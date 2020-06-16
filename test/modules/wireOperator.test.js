const { nearestIntersection, calculateCoordinateDistance, calculateSteps } = require('../../src/modules/wireOperator')

describe('nearestIntersection', () => {
  test('calculates nearest wire intersection correctly', () => {
    expect(nearestIntersection('R8,U5,L5,D3', 'U7,R6,D4,L4')).toStrictEqual([6, 30])
    expect(nearestIntersection('R75,D30,R83,U83,L12,D49,R71,U7,L72', 'U62,R66,U55,R34,D71,R55,D58,R83')).toStrictEqual([159, 610])
    expect(nearestIntersection('R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51', 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7')).toStrictEqual([135, 410])
  })
})

describe('calculateCoordinateDistance', () => {
  test('calculates distance to central point', () => {
    expect(calculateCoordinateDistance('5.6')).toBe(11)
    expect(calculateCoordinateDistance('3.3')).toBe(6)
    expect(calculateCoordinateDistance('-3.4')).toBe(7)
  })
})

describe('calculateSteps', () => {
  test('calculates steps to an intersection', () => {
    expect(calculateSteps('5.6', 'R8,U5,L5,D3')).toBe(15)
    expect(calculateSteps('3.3', 'R8,U5,L5,D3')).toBe(20)
    expect(calculateSteps('-3.4', 'R8,U5,L5,D3')).toBe(-1)

    expect(calculateSteps('5.6', 'U7,R6,D4,L4')).toBe(15)
    expect(calculateSteps('3.3', 'U7,R6,D4,L4')).toBe(20)
  })
})
