
const logger = require('./modules/logger').logger
// const fs = require('fs')
const { run } = require('./modules/intCodeProcessor')

logger.info('solution workbench...')

const amplify = () => {
  const intCode = '3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0'

  const x = run(intCode, [1, 4])

  console.log(x)
}

amplify()
