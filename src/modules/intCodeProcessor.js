const logger = require('./logger').logger
var readlineSync = require('readline-sync')

const validOpCodes = ['99', '01', '02', '03', '04']

// gets string input and returns and array of integers.
const run = (input) => {
  const array = input.split(',').map(x => Number(x))
  const index = 0
  const intCodeObject = { index, array }
  while (true) {
    const next = parseIntCode(intCodeObject.array[intCodeObject.index])
    logger.debug(`index: ${intCodeObject.index}, op:${next.opcode}`)
    if (shouldExit(next)) {
      break
    }
    opcodeLookupProcessor[next.opcode](next, intCodeObject)
  }
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

const shouldExit = (input) => {
  if (input.opcode === '99') {
    logger.info('Exiting due to code 99')
    return true
  }
  if (!validOpCodes.includes(input.opcode)) {
    logger.error(`invalid opcode found: ${input.opcode}.`)
    return true
  }
  return false
}

const opcodeLookupProcessor = {
  99: () => { },
  '01': (next, intCodesObject) => opAdd(next, intCodesObject),
  '02': (next, intCodesObject) => opMultiply(next, intCodesObject),
  '03': (next, intCodesObject) => opInput(next, intCodesObject),
  '04': (next, intCodesObject) => opOutput(next, intCodesObject)
}

const opAdd = (next, intCodeObject) => {
  const index = intCodeObject.index
  const array = intCodeObject.array
  const sum = readValue(index + 1, array, next.params[0]) + readValue(index + 2, array, next.params[1])
  writeValue(index + 3, intCodeObject.array, next.params[2], sum)
  intCodeObject.index += 4
}

const opMultiply = (next, intCodeObject) => {
  const index = intCodeObject.index
  const array = intCodeObject.array
  const sum = readValue(index + 1, array, next.params[0]) * readValue(index + 2, array, next.params[1])
  writeValue(index + 3, intCodeObject.array, next.params[2], sum)
  intCodeObject.index += 4
}

const opInput = (next, intCodeObject) => {
  const x = readlineSync.question(`Enter input for command (${intCodeObject.index})? `)
  logger.info(`input is ${x}`)
  writeValue(intCodeObject.index + 1, intCodeObject.array, next.params[1], Number(x))
  intCodeObject.index += 2
}

const opOutput = (next, intCodeObject) => {
  const value = readValue(intCodeObject.index + 1, intCodeObject.array, next.params[0])
  logger.warn(`output is ${value}`)
  intCodeObject.index += 2
}

const readValue = (index, array, mode) => {
  if (mode === '0') {
    return array[array[index]]
  } else if (mode === '1') {
    return array[index]
  }
  throw new Error(`unknown parameter mode: ${mode}`)
}

const writeValue = (index, array, mode, value) => {
  if (mode === '0') {
    array[array[index]] = value
    return array
  } else if (mode === '1') {
    array[index] = value
    return array
  }
  throw new Error(`unknown parameter mode: ${mode}`)
}

module.exports = { run, parseIntCode, readValue, writeValue }
