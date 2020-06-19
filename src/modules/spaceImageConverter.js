
const logger = require('./logger').logger

logger.info('solution workbench...')

const decode = (w, h, input) => {
  const size = w * h

  const layers = []

  while (input) {
    const layer = input.substr(0, size)
    input = input.substr(size)
    layers.push(layer)
  }

  logger.info(`total layers:${layers.length}`)

  const sum = getChecksum(layers, size)
  logger.info(`result is ${sum}`)

  const image = calculateImage(layers, size)

  for (let i = 0; i < h; i++) {
    logger.info(image.substr(i * w, w))
  }

  return sum
}

const calculateImage = (layers, size) => {
  const image = []

  for (let i = 0; i < size; i++) {
    for (const layer of layers) {
      if (layer[i] !== '2') {
        image[i] = (layer[i] === '1') ? 'X' : ' '
        break
      }
    }
  }
  return image.join('')
}

const getChecksum = (layers, size) => {
  let best = size
  let sum = 0
  layers.forEach(x => {
    const result = { }
    for (var i = 0; i < x.length; ++i) {
      if (!result[x[i]]) { result[x[i]] = 0 }
      ++result[x[i]]
    }

    if (result['0'] < best) {
      best = result['0']
      sum = result['1'] * result['2']
      logger.debug(`new better: 0:${result['0']} 1:${result['1']} 2:${result['2']} chk:${sum}`)
    }
  })
  return sum
}

module.exports = {
  decode
}
