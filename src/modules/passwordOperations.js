const logger = require('./logger').logger

const hasAdjecentSame = (password) => {
  let pass = false
  password.split('').forEach((x, i, arr) => {
    if (x === arr[i + 1]) {
      pass = true
    }
  })
  return pass
}

const hasAdjecentDoubleOnly = (password) => {
  let pass = false
  let last = null
  let count = 1
  password.split('').forEach((x) => {
    if (last === x) {
      count++
    } else {
      if (count === 2) {
        pass = true
      }
      count = 1
    }
    last = x
  })
  return pass || (count === 2)
}

const everIncrising = (password) => {
  let pass = true
  password.split('').forEach((x, i, arr) => {
    if (x > arr[i + 1]) {
      pass = false
    }
  })
  return pass
}

const bruteForce = (start, end) => {
  logger.info(`brute force starting at ${start}`)
  let matches = 0
  for (let curr = start; curr < end; curr++) {
    if (hasAdjecentDoubleOnly(`${curr}`) && everIncrising(`${curr}`)) {
      matches++
    }
  }

  logger.info(`brute force ended (at ${end}), ${matches} matching password.`)
  return matches
}

module.exports = {
  hasAdjecentSame,
  hasAdjecentDoubleOnly,
  everIncrising,
  bruteForce
}
