const logger = require('./logger').logger

const calculateFuel = (input) => {
  return Number(Math.floor(input / 3) - 2)
}

const calculateRecursiveFuel = (input) => {
  let x = calculateFuel(input)
  let additional = x
  do {
    additional = calculateFuel(additional)
    if (additional > 0) { x += additional }
  } while (additional > 0)
  return x > 0 ? x : 0
}

module.exports = { calculateFuel, calculateRecursiveFuel }
