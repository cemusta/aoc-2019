const fs = require('fs')
const { calculateRecursiveFuel } = require('../src/modules/fuelCalculator')
const { run } = require('../src/modules/intCodeProcessor')
const { countOrbitCheckSums, minimumTransferNeeded } = require('../src/modules/orbitCalculator')
const { nearestIntersection } = require('../src/modules/wireOperator')
const { bruteForce } = require('../src/modules/passwordOperations')

describe('general solution', () => {
  test('should work without a problem', () => {
    require('../src/index.js')
  })
})

describe('day 1 part 2 solution', () => {
  test('should solve problem', () => {
    const starshipParts = fs.readFileSync('./inputs/day1.input', 'utf8').split('\n').map(x => Number(x))
    const fuelNeeded = starshipParts.reduce((accumulator, currentValue) => accumulator + calculateRecursiveFuel(currentValue), 0)
    // logger.info(`Day 1: Needed fuel for launch is ${fuelNeeded}`)
    expect(fuelNeeded).toBe(4995942)
  })
})

describe('day 2 part 1 solution', () => {
  test('should solve problem', () => {
    const codeArray = fs.readFileSync('./inputs/day2.input', 'utf8').split(',').map(x => Number(x))
    // manual override - 1202
    codeArray[1] = 12
    codeArray[2] = 2
    const result = run(codeArray.join(','))
    // logger.info(`Day 2: opCode result is ${result[0]}`)
    expect(result[0]).toBe(3101878)
  })
})

describe('day 2 part 2 solution', () => {
  test('should solve problem', () => {
    const searchedResult = 19690720
    // search for spesific IntCode output
    for (let noun = 0, verb = 0; verb < 100; verb++) {
      const codeArray = fs.readFileSync('./inputs/day2.input', 'utf8').split(',').map(x => Number(x))

      codeArray[1] = verb
      codeArray[2] = noun
      const result = run(codeArray.join(','))

      if (Number(result[0]) === searchedResult) {
        // logger.info(`${verb}:${noun} result ${result[0]} a match, result key: ${verb}${noun}`)
        expect(verb).toBe(84)
        expect(noun).toBe(44)
        return
      } else if (result[0] > searchedResult) {
        // logger.info(`${verb}:${noun} result ${result[0]} too big`)
        if (noun < 100) {
          noun++
          verb = 0
        } else {
          break
        }
      }
      // logger.info(`${verb}:${noun} result ${result[0]} too small`)
    }
    // logger.info(`Day 2: opCode result is ${result[0]}`)
  })
})

describe('day 3 part 1-2 solution', () => {
  test('should solve problem', () => {
    const wires = fs.readFileSync('./inputs/day3.input', 'utf8').split('\n')
    const result = nearestIntersection(wires[0], wires[1])
    // logger.info(`Day 3: closest wire intersection is ${result[0]}, shortest steps is ${result[1]}`)
    expect(result[0]).toBe(1225)
    expect(result[1]).toBe(107036)
  })
})

describe('day 4 part 2 solution', () => {
  test('should solve problem', () => {
    const result = bruteForce(347312, 805915)
    expect(result).toBe(364)
  })
})

describe('day 6 part 1 solution', () => {
  test('should solve problem', () => {
    // call needed operation here
    const orbits = fs.readFileSync('./inputs/day6.input', 'utf8')
    const count = countOrbitCheckSums(orbits)
    expect(count).toBe(295834)
  })
})

describe('day 6 part 2 solution', () => {
  test('should solve problem', () => {
    // call needed operation here
    const orbits = fs.readFileSync('./inputs/day6.input', 'utf8')
    const count = minimumTransferNeeded(orbits)
    expect(count).toBe(361)
  })
})
