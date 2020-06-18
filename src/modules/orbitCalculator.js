const logger = require('./logger').logger

const countOrbitCheckSums = (input) => {
  const orbitLookup = createLookup(input)

  let orbits = 0

  for (const key in orbitLookup) {
    let search = key
    while (orbitLookup[search] !== null) {
      const next = orbitLookup[search]
      if (next === search) {
        logger.error(`deadlock in orbital input ${search}->${next}`)
        throw new Error(`deadlock in orbital input ${search}->${next}`)
      }
      search = next
      orbits++
    }
  }

  return orbits
}

const minimumTransferNeeded = (input) => {
  const orbitLookup = createLookup(input)

  const me = createOrbitsList('YOU', orbitLookup)
  const santa = createOrbitsList('SAN', orbitLookup)

  let intersection = null
  for (const orbit of santa) {
    if (me.includes(orbit)) {
      intersection = orbit
      break
    }
  }

  const result = me.indexOf(intersection) + santa.indexOf(intersection)
  return result
}

const createLookup = (input) => {
  const parsedOrbits = input.split('\n').map(x => parseOrbital(x))

  const orbitLookup = {
    COM: null
  }
  parsedOrbits.forEach(e => {
    orbitLookup[e.satellite] = e.center
  })
  return orbitLookup
}

const createOrbitsList = (search, orbitLookup) => {
  const orbits = []
  while (orbitLookup[search] !== null) {
    const next = orbitLookup[search]
    if (next === search) {
      logger.error(`deadlock in orbital input ${search}->${next}`)
      throw new Error(`deadlock in orbital input ${search}->${next}`)
    }
    search = next
    orbits.push(search)
  }
  return orbits
}

const parseOrbital = (input) => {
  const objects = input.split(')').map(x => x.replace('\r', ''))
  if (objects.length !== 2) {
    throw new Error(`wrong orbital input: ${input}`)
  }
  return { center: objects[0], satellite: objects[1] }
}

module.exports = {
  countOrbitCheckSums,
  minimumTransferNeeded,
  parseOrbital
}
