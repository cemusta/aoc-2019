
const logger = require('./modules/logger').logger
// const fs = require('fs')
const { Processor } = require('./modules/intCodeProcessor')

const permute = (inputArr) => {
  const result = []

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        const curr = arr.slice()
        const next = curr.splice(i, 1)
        permute(curr.slice(), m.concat(next))
      }
    }
  }

  permute(inputArr)

  return result
}

logger.info('solution workbench...')

const amplifyNormal = async (phase = null) => {
  const intCode = '3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0'
  //   const intCode = '3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0'
  //   const intCode = '3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0'
  //   const intCode = fs.readFileSync('./inputs/day7.input', 'utf8')

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

  A.input(0)

  B.input(await A.output())
  C.input(await B.output())
  D.input(await C.output())
  E.input(await D.output())

  const final = await E.output()
  //   console.log(finalOutput)
  return { final, phase }
}

// amplifyNormal([0, 1, 2, 3, 4])

const findMaxThrusterPhase = async () => {
  const allConfig = permute([0, 1, 2, 3, 4])

  let max = 0
  let best = null

  const promises = []
  for (const phase of allConfig) {
    promises.push(amplifyNormal(phase))
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
}

findMaxThrusterPhase()

// const amplifyFeedback = async (phase = null) => {
//   const intCode = '3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5'

//   //   const intCode = fs.readFileSync('./inputs/day7.input', 'utf8')

//   const A = new Processor(intCode, 'A')
//   const B = new Processor(intCode, [phase[1]], 'B')
//   const C = new Processor(intCode, [phase[2]], 'C')
//   const D = new Processor(intCode, [phase[3]], 'D')
//   const E = new Processor(intCode, [phase[4]], 'E')

//   A.input(1)
//   A.input(2)
//   const Astop = A.start()

//   A.input(3)

//   let x = await A.output()
//   A.input(x)
//   x = await A.output()
//   A.input(x)
//   x = await A.output()
//   A.input(x)
//   x = await A.output()
//   A.input(x)
//   //   console.log('x', x)

//   //   const finalOutput = E.outputs.shift()
//   console.log(Astop)

//   await Astop
//   console.log('x')
// //   return finalOutput
// }

// amplifyFeedback([9, 8, 7, 6, 5])

// const findMaxThrusterPhaseFeedback = () => {
//   const allConfig = permute([5, 6, 7, 8, 9])

//   let max = 0
//   let best = null

//   for (const phase of allConfig) {
//     const x = amplifyFeedback(phase)
//     if (x > max) {
//       max = x
//       best = phase
//       console.log('new best', x, phase)
//     }
//   }

//   console.log('the best', max, best)
// }

// findMaxThrusterPhaseFeedback()
