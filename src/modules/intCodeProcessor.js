const logger = require('./logger').logger

const validOpCodes = ['99', '01', '02', '03', '04']

// gets string input and returns and array of integers.
const run = (input) => {
  let array = input.split(',').map(x => Number(x))
  let curr = 0
  while (true) {
    const next = parseIntCode(array[curr])
    logger.info(`cur: ${curr}, op:${next.opcode}`)
    if (shouldExit(next, array)) {
      logger.info('breaking')
      break
    }
    array = opcodeLookupProcessor[next.opcode](next, curr, array)
    curr += 4
  }
  logger.info('returning')
  logger.info(array)
  return array
}

// returns opcode with params
const parseIntCode = (input) => {
  const code = `${input}`
  const [e, d, c, b, a] = code.split('').reverse()
  const opcode = [d || 0, e || 0].join('')
  return {
    opcode,
    params: [c || '0', b || '0', a || '0']
  }
}

const opcodeLookupProcessor = {
  99: (next, curr, array) => { return array },
  '01': (next, curr, array) => { return add(next, curr, array) },
  '02': (next, curr, array) => { return multiply(next, curr, array) }
  // '03': (next, curr, array) => { logger.error('not implemented') },
  // '04': (next, curr, array) => { logger.error('not implemented') }
}

const shouldExit = (input, array) => {
  if (input.opcode === '99') {
    logger.info('Exiting due to code 99')
    return true
  }
  if (!validOpCodes.includes(input.opcode)) {
    logger.error(`invalid opcode found: ${input.opcode}. ${array}`)
    return true
  }
  return false
}

const add = (next, curr, array) => {
  const firstIdx = array[curr + 1]
  const secondIdx = array[curr + 2]
  const resultIdx = array[curr + 3]

  const sum = array[firstIdx] + array[secondIdx]
  array[resultIdx] = sum
  return array
}

const multiply = (next, curr, array) => {
  const firstIdx = array[curr + 1]
  const secondIdx = array[curr + 2]
  const resultIdx = array[curr + 3]

  const sum = array[firstIdx] * array[secondIdx]
  array[resultIdx] = sum
  return array
}

const readValue = (index, array, mode) => {
  if (mode === '0') {
    return array[array[index]]
  } else if (mode === '1') {
    return array[index]
  }
  throw new Error('unknown parameter mode')
}

const writeValue = (index, array, mode, value) => {
  if (mode === '0') {
    array[array[index]] = value
    return
  } else if (mode === '1') {
    array[index] = value
    return
  }
  throw new Error('unknown parameter mode')
}

module.exports = { run, parseIntCode, readValue, writeValue }
