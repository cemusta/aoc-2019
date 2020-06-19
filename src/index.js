
require('dotenv').config()
const logger = require('./modules/logger').logger
const { Processor } = require('./modules/intCodeProcessor')

// const fs = require('fs')

logger.info('solution workbench...')

const test = async () => {
  const processor = new Processor('109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99')
  //   const processor = new Processor(fs.readFileSync('./inputs/day9.input', 'utf8'))
  processor.input(1)

  await processor.start()
  console.log(processor.outputs)
}

test()
