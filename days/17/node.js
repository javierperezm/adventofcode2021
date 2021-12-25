'Day 17: Trick Shot'

const TEST_MODE = false

const parseTargetAreaString = (objectDefinition) => {
  let x1, x2, y1, y2
  objectDefinition.match(/(x|y)\=(\-?\d*)\.\.(\-?\d*)/g).forEach((match) => {
    const [axis, range] = match.split('=')
    const [r1, r2] = range
      .split('..')
      .map((val) => parseInt(val))
      .sort((a, b) => a - b)

    if (axis === 'x') {
      x1 = r1
      x2 = r2
    } else {
      y1 = r1
      y2 = r2
    }
  })
  return [x1, y1, x2, y2]
}

const tryShotWithVelocity = ({ x1, y1, x2, y2, vx, vy }) => {
  let x = 0
  let y = 0
  let velocity = [vx, vy]
  let maxY = 0

  process.stdout.write(`[${velocity[0]},${velocity[1]}] =>`)

  while (!(velocity[0] === 0 && x < x1) && x <= x2 && y >= y1) {
    process.stdout.write(` ${x},${y}`)

    // move
    x += velocity[0]
    y += velocity[1]
    maxY = Math.max(y, maxY)

    // hit?
    if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
      return maxY
    }

    // gravity
    velocity[0]--
    velocity[1]--
    if (velocity[0] < 0) velocity[0] = 0
  }

  process.stdout.write('\n')

  return null
}

const shot = (objectDefinition) => {
  const [x1, y1, x2, y2] = parseTargetAreaString(objectDefinition)

  let maxY = 0
  const counter = []

  for (let vy = 1000; vy >= -1000; vy--) {
    for (let vx = 1; vx <= 1000; vx++) {
      const tryShot = tryShotWithVelocity({ x1, y1, x2, y2, vx, vy })
      if (tryShot !== null) {
        counter.push([vx, vy])
        maxY = Math.max(maxY, tryShot)
      }
    }
  }

  return { maxY, counter }
}

if (TEST_MODE) {
  const targetAreaText = 'target area: x=20..30, y=-10..-5'

  const [x1, y1, x2, y2] = parseTargetAreaString(targetAreaText)
  console.assert(
    x1 === 20 && x2 === 30 && y1 === -10 && y2 === -5,
    'test failed (parseTargetAreaString)'
  )

  const { maxY, counter } = shot(targetAreaText)
  console.assert(maxY === 45, 'test failed (maxY)')
  console.assert(counter.length === 112, 'test failed (counter)')
} else {
  const { maxY, counter } = shot('target area: x=288..330, y=-96..-50')

  console.log(maxY)
  console.log(counter.length)
}
