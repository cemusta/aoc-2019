
const logger = require('./modules/logger').logger
const { calculateRecursiveFuel } = require('./modules/fuelCalculator')
const { run } = require('./modules/intCodeProcessor')
const { nearestIntersection } = require('./modules/wireOperator')
const { bruteForce } = require('./modules/passwordOperations')

const fs = require('fs')

const launchCalculation = () => {
  const starshipParts = fs.readFileSync('./inputs/day1.input', 'utf8').split('\n').map(x => Number(x))
  const fuelNeeded = starshipParts.reduce((accumulator, currentValue) => accumulator + calculateRecursiveFuel(currentValue), 0)
  logger.info(`Day 1: Needed fuel for launch is ${fuelNeeded}`)
}

const runIntCode = () => {
  const codeArray = fs.readFileSync('./inputs/day2.input', 'utf8').split(',').map(x => Number(x))
  // manual override - 1202
  codeArray[1] = 82
  codeArray[2] = 62
  const result = run(codeArray)
  logger.info(`Day 2: opCode result is ${result[0]}`)
  return result[0]
}

const searchForOutput = (searchedResult = 19690720) => {
  logger.info(`searching verb and noun for ${searchedResult}`)
  // search for spesific IntCode output
  for (let noun = 0, verb = 0; verb < 100; verb++) {
    const codeArray = fs.readFileSync('./inputs/day2.input', 'utf8').split(',').map(x => Number(x))

    codeArray[1] = verb
    codeArray[2] = noun
    const result = run(codeArray)

    if (Number(result[0]) === searchedResult) {
      logger.info(`${verb}:${noun} result ${result[0]} a match, result key: ${verb}${noun}`)
      return
    } else if (result[0] > searchedResult) {
      logger.info(`${verb}:${noun} result ${result[0]} too big`)
      if (noun < 100) {
        noun++
        verb = 0
      } else {
        break
      }
    }
    logger.info(`${verb}:${noun} result ${result[0]} too small`)
  }
}

const findWireIntersection = () => {
  const wires = fs.readFileSync('./inputs/day3.input', 'utf8').split('\n')
  const result = nearestIntersection(wires[0], wires[1])
  logger.info(`Day 3: closest wire intersection is ${result[0]}, shortest steps is ${result[1]}`)
  return result
}

logger.info('task starting')
// call needed operation here

module.exports = {
  launchCalculation,
  runIntCode,
  searchForOutput,
  findWireIntersection,
  bruteForce
}
