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
    if (hasAdjecentSame(`${curr}`) && everIncrising(`${curr}`)) {
      matches++
    }
  }

  logger.info(`brute force ended (at ${end}), ${matches} matching password.`)
  return matches
}

module.exports = {
  hasAdjecentSame,
  everIncrising,
  bruteForce
}
