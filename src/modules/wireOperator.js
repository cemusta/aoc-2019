const logger = require('./logger').logger

const nearestIntersection = (first, second) => {
  let grid = {
    '0.0': 0
  }
  grid = mapGrip(first, grid, 1)
  grid = mapGrip(second, grid, 2)

  let min = null
  for (const coordinate in grid) {
    if (grid[coordinate] === 3) {
      const value = calculateCoordinateDistance(coordinate)
      if (!min || min > value) {
        min = value
      }
    }
  }
  return min
}

const mapGrip = (input, grid, cableId) => {
  grid.x = 0
  grid.y = 0

  input.split(',').forEach(e => {
    const direction = e.charAt(0)
    const number = Number(e.substr(1))
    for (let i = 0; i < number; i++) {
      grid = directions[direction](grid)
      grid = updateGrid(grid, cableId)
    }
    logger.info(`${direction} ${number}`)
  })
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

module.exports = { nearestIntersection, calculateCoordinateDistance }
