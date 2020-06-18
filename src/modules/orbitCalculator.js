const logger = require('./logger').logger

const countOrbitCheckSums = (input) => {
  const x = input.split('\n').map(x => parseOrbital(x))
  logger.warn(x)
  logger.error('not implemetned.')
  return 42
}

const parseOrbital = (input) => {
  const objects = input.split(')')
  if (objects.length !== 2) {
    throw new Error(`wrong orbital input: ${input}`)
  }
  return { center: objects[0], satellite: objects[1] }
}

module.exports = {
  countOrbitCheckSums,
  parseOrbital
}
