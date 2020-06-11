const logger = require('./logger').logger

const run = (array) => {
  // if(typeof array === Array)
  let curr = 0
  let exit = true
  while (exit) {
    [exit, array] = operation(curr, array)
    curr += 4
  }
  return array
}

const operation = (curr, array) => {
  switch (array[curr]) {
    case 99:
      return [false, array]
    case 1:
      return [true, add(curr, array)]
    case 2:
      return [true, multiply(curr, array)]
    default:
      logger.error('unhandled opcode')
      return [false, array]
  }
}

const add = (curr, array) => {
  const firstIdx = array[curr + 1]
  const secondIdx = array[curr + 2]
  const resultIdx = array[curr + 3]

  const sum = array[firstIdx] + array[secondIdx]
  array[resultIdx] = sum
  return array
}

const multiply = (curr, array) => {
  const firstIdx = array[curr + 1]
  const secondIdx = array[curr + 2]
  const resultIdx = array[curr + 3]

  const sum = array[firstIdx] * array[secondIdx]
  array[resultIdx] = sum
  return array
}

module.exports = { run }
