
const logger = require('./modules/logger').logger
const { calculateRecursiveFuel } = require('./modules/fuelCalculator')

const fs = require('fs')

logger.info('task starting')

const launchCalculation = () => {
  const starshipParts = fs.readFileSync('./inputs/day1.input', 'utf8').split('\n').map(x => Number(x))
  const fuelNeeded = starshipParts.reduce((accumulator, currentValue) => accumulator + calculateRecursiveFuel(currentValue), 0)
  logger.info(`Needed fuel for launch is ${fuelNeeded}`)
}

launchCalculation()
