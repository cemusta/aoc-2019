const logger = require('./logger').logger
var readlineSync = require('readline-sync')

const validOpCodes = ['99', '01', '02', '03', '04', '05', '06', '07', '08']

// gets string input and returns and array of integers.
const run = (intCodeinput, inputs = null) => {
  const array = intCodeinput.split(',').map(x => Number(x))
  const index = 0
  const intCodeObject = { index, array, inputs, outputs: [] }
  let next = parseIntCode(intCodeObject.array[intCodeObject.index])
  while (!shouldExit(next)) {
    logger.debug(`index: ${intCodeObject.index}, op:${next.opcode}-[${next.params}]`)
    opcodeLookupProcessor[next.opcode](next, intCodeObject)
    next = parseIntCode(intCodeObject.array[intCodeObject.index])
  }
  return intCodeObject
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
  '04': (next, intCodesObject) => opOutput(next, intCodesObject),
  '05': (next, intCodesObject) => opJumpIfTrue(next, intCodesObject),
  '06': (next, intCodesObject) => opJumpIfFalse(next, intCodesObject),
  '07': (next, intCodesObject) => opLessThan(next, intCodesObject),
  '08': (next, intCodesObject) => opEquals(next, intCodesObject)
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
  let x
  if (intCodeObject.inputs === null) {
    x = readlineSync.question(`Enter input for command (${intCodeObject.index})? `)
  } else {
    x = intCodeObject.inputs.shift()
  }

  logger.info(`input is ${x}`)
  writeValue(intCodeObject.index + 1, intCodeObject.array, next.params[1], Number(x))
  intCodeObject.index += 2
}

const opOutput = (next, intCodeObject) => {
  const value = readValue(intCodeObject.index + 1, intCodeObject.array, next.params[0])
  logger.warn(`output is ${value}`)
  intCodeObject.outputs.push(value)
  intCodeObject.index += 2
}

const opJumpIfTrue = (next, intCodeObject) => {
  const valueToCheck = readValue(intCodeObject.index + 1, intCodeObject.array, next.params[0])
  // logger.info(`hello ${next.opcode}-${next.params} val: ${valueToCheck}`)

  if (valueToCheck !== 0) {
    const toJump = readValue(intCodeObject.index + 2, intCodeObject.array, next.params[1])
    intCodeObject.index = toJump
  } else {
    intCodeObject.index += 3
  }
}

const opJumpIfFalse = (next, intCodeObject) => {
  const valueToCheck = readValue(intCodeObject.index + 1, intCodeObject.array, next.params[0])
  if (valueToCheck === 0) {
    const toJump = readValue(intCodeObject.index + 2, intCodeObject.array, next.params[1])
    intCodeObject.index = toJump
  } else {
    intCodeObject.index += 3
  }
}

const opLessThan = (next, intCodeObject) => {
  const first = readValue(intCodeObject.index + 1, intCodeObject.array, next.params[0])
  const second = readValue(intCodeObject.index + 2, intCodeObject.array, next.params[1])
  writeValue(intCodeObject.index + 3, intCodeObject.array, next.params[2], (first < second) ? 1 : 0)
  intCodeObject.index += 4
}

const opEquals = (next, intCodeObject) => {
  const first = readValue(intCodeObject.index + 1, intCodeObject.array, next.params[0])
  const second = readValue(intCodeObject.index + 2, intCodeObject.array, next.params[1])
  writeValue(intCodeObject.index + 3, intCodeObject.array, next.params[2], (first === second) ? 1 : 0)
  intCodeObject.index += 4
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
