// const logger = require('./logger').logger

const calculateFuel = (input) => {
  return Number(Math.floor(input / 3) - 2)
}

const calculateRecursiveFuel = (input) => {
  let fuelNeeded = calculateFuel(input)
  let additional = fuelNeeded
  do {
    additional = calculateFuel(additional)
    if (additional > 0) { fuelNeeded += additional }
  } while (additional > 0)
  return fuelNeeded > 0 ? fuelNeeded : 0
}

module.exports = { calculateFuel, calculateRecursiveFuel }
