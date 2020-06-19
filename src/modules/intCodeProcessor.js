const logger = require('./logger').logger
var readlineSync = require('readline-sync')

const validOpCodes = ['99', '01', '02', '03', '04', '05', '06', '07', '08']

const sleepValue = 5

class Processor {
  constructor (intCodeinput, name = 'dev') {
    this.array = intCodeinput.split(',').map(x => Number(x))
    this.name = name
    this.index = 0
    this.inputs = []
    this.outputs = []
    this.status = 0
  }

  async start () {
    logger.debug(`${this.name} started`)
    this.status = 1
    let next = parseIntCode(this.array[this.index])
    while (!shouldExit(next)) {
      logger.debug(`${this.name} index: ${this.index}, op:${next.opcode}-[${next.params}]`)
      await opcodeLookupProcessor[next.opcode](next, this)
      next = parseIntCode(this.array[this.index])
    }
    this.status = -1
  }

  input (inputs) {
    if (isIterable(inputs)) {
      for (const input of inputs) {
        this.inputs.push(input)
      }
    } else {
      this.inputs.push(inputs)
    }
  }

  async output () {
    while (this.status > -1 && this.outputs.length === 0) {
      // logger.debug(`(${intCodeObject.name}): waiting for output`)
      await wait(sleepValue)
    }
    return this.outputs.shift()
  }
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
    logger.debug('Exiting due to code 99')
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
  '01': async (next, intCodesObject) => opAdd(next, intCodesObject),
  '02': async (next, intCodesObject) => opMultiply(next, intCodesObject),
  '03': async (next, intCodesObject) => opInput(next, intCodesObject),
  '04': async (next, intCodesObject) => opOutput(next, intCodesObject),
  '05': async (next, intCodesObject) => opJumpIfTrue(next, intCodesObject),
  '06': async (next, intCodesObject) => opJumpIfFalse(next, intCodesObject),
  '07': async (next, intCodesObject) => opLessThan(next, intCodesObject),
  '08': async (next, intCodesObject) => opEquals(next, intCodesObject)
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

const opInput = async (next, intCodeObject) => {
  while (intCodeObject.inputs.length === 0) {
    logger.debug(`(${intCodeObject.name}): waiting for input`)
    await wait(sleepValue)
  }
  let x
  if (intCodeObject.inputs === null) {
    x = readlineSync.question(`(${intCodeObject.name}):Enter input for command (${intCodeObject.index})? `)
  } else {
    x = intCodeObject.inputs.shift()
  }

  logger.debug(`(${intCodeObject.name}):input is ${x}`)
  writeValue(intCodeObject.index + 1, intCodeObject.array, next.params[1], Number(x))
  intCodeObject.index += 2
}

const opOutput = (next, intCodeObject) => {
  const value = readValue(intCodeObject.index + 1, intCodeObject.array, next.params[0])
  logger.debug(`(${intCodeObject.name}):output is ${value}`)
  intCodeObject.outputs.push(value)
  intCodeObject.index += 2
}

const opJumpIfTrue = (next, intCodeObject) => {
  const valueToCheck = readValue(intCodeObject.index + 1, intCodeObject.array, next.params[0])
  // logger.info(`(${intCodeObject.name}):hello ${next.opcode}-${next.params} val: ${valueToCheck}`)

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

function wait (timeout) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, timeout)
  })
}

function isIterable (obj) {
  if (obj == null) {
    return false
  }
  return typeof obj[Symbol.iterator] === 'function'
}

module.exports = { Processor, parseIntCode, readValue, writeValue }
