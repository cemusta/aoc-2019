const logger = require('./logger').logger

const nearestIntersection = (first, second) => {
  let grid = {
    '0.0': 0
  }
  grid = mapWireGrid(first, grid, 1)
  grid = mapWireGrid(second, grid, 2)

  let minimumDistance = null
  let minimumSteps = null
  for (const coordinate in grid) {
    if (grid[coordinate] === 3) {
      const distance = calculateCoordinateDistance(coordinate)
      if (!minimumDistance || minimumDistance > distance) {
        minimumDistance = distance
      }
      const steps = calculateSteps(coordinate, first) + calculateSteps(coordinate, second)
      if (!minimumSteps || minimumSteps > steps) {
        minimumSteps = steps
      }
    }
  }
  return [minimumDistance, minimumSteps]
}

const mapWireGrid = (input, grid, cableId) => {
  grid.x = 0
  grid.y = 0

  for (const e of input.split(',')) {
    const direction = e.charAt(0)
    const number = Number(e.substr(1))
    for (let i = 0; i < number; i++) {
      grid = directions[direction](grid)
      grid = updateGrid(grid, cableId)
    }
    logger.info(`${direction} ${number}`)
  }

  delete grid.x
  delete grid.y
  return grid
}

const directions = {
  U: (grid) => { ++grid.x; return grid },
  D: (grid) => { --grid.x; return grid },
  R: (grid) => { ++grid.y; return grid },
  L: (grid) => { --grid.y; return grid }
}

const updateGrid = (grid, cableId) => {
  const current = grid[`${grid.x}.${grid.y}`]
  grid[`${grid.x}.${grid.y}`] = current ? current + cableId : cableId
  return grid
}

const calculateCoordinateDistance = (coordinateKey) => {
  const [x, y] = coordinateKey.split('.').map(x => Number(x))
  return Math.abs(x) + Math.abs(y)
}

const calculateSteps = (coordinate, wire) => {
  let grid = {
    x: 0,
    y: 0,
    '0.0': 0
  }

  let steps = 0

  for (const e of wire.split(',')) {
    const direction = e.charAt(0)
    const number = Number(e.substr(1))
    for (let i = 0; i < number; i++) {
      grid = directions[direction](grid)
      steps++
      if (coordinate === `${grid.x}.${grid.y}`) {
        return steps
      }
    }
  }

  return -1
}

module.exports = { nearestIntersection, calculateCoordinateDistance, calculateSteps }
