
const logger = require('./modules/logger').logger
const { calculateRecursiveFuel } = require('./modules/fuelCalculator')
const { run } = require('./modules/intCodeProcessor')

const fs = require('fs')

logger.info('task starting')

const launchCalculation = () => {
  const starshipParts = fs.readFileSync('./inputs/day1.input', 'utf8').split('\n').map(x => Number(x))
  const fuelNeeded = starshipParts.reduce((accumulator, currentValue) => accumulator + calculateRecursiveFuel(currentValue), 0)
  logger.info(`Day 1: Needed fuel for launch is ${fuelNeeded}`)
}

const runIntCode = () => {
  const codeArray = fs.readFileSync('./inputs/day2.input', 'utf8').split(',').map(x => Number(x))
  // manual override - 1202
  codeArray[1] = 12
  codeArray[2] = 2
  const result = run(codeArray)
  logger.info(`Day 2: opCode result is ${result[0]}`)
}

launchCalculation()
runIntCode()
