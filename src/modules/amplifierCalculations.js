const logger = require('./logger').logger
const { permute } = require('./helpers')
const { Processor } = require('./intCodeProcessor')

const amplify = async (intCode, phase = null) => {
  const A = new Processor(intCode, 'A')
  const B = new Processor(intCode, 'B')
  const C = new Processor(intCode, 'C')
  const D = new Processor(intCode, 'D')
  const E = new Processor(intCode, 'E')

  A.input(phase[0])
  B.input(phase[1])
  C.input(phase[2])
  D.input(phase[3])
  E.input(phase[4])

  A.start()
  B.start()
  C.start()
  D.start()
  E.start()

  let val = 0

  do {
    A.input(val)
    B.input(await A.output())
    C.input(await B.output())
    D.input(await C.output())
    E.input(await D.output())
    val = await E.output()
  } while (A.status >= 0)

  logger.debug(`final ${val}`)
  return { final: val, phase }
}

const findMaxThrusterPhase = async (intCode, permuteArray) => {
  //   const allConfig = permute([0, 1, 2, 3, 4])
  const allConfig = permute(permuteArray)
  // const intCode = fs.readFileSync('./inputs/day7.input', 'utf8')

  let max = 0
  let best = null

  const promises = []
  for (const phase of allConfig) {
    promises.push(amplify(intCode, phase))
  }

  const results = await Promise.all(promises)

  for (const result of results) {
    if (result.final > max) {
      max = result.final
      best = result.phase
      logger.debug('new best', result.final, result.phase)
    }
  }
  logger.info(`max thruster value is ${max}, phase:[${best}]`)
  return max
}

module.exports = {
  amplify,
  findMaxThrusterPhase
}
