const { exit } = require('process')
const readfile = require('./readfile')

class Matrix {
  data
  constructor() {
    this.data = []
  }
  addLine = (line) => {
    this.data.push(line.split('').map((val) => parseInt(val)))
  }
  getPower = (point) => {
    return this.isValid(point) ? this.data[point.y][point.x] : null
  }
  setPower = (point, power) => {
    return this.isValid(point) ? (this.data[point.y][point.x] = power) : null
  }
  incPower = (point) => {
    return this.isValid(point) ? ++this.data[point.y][point.x] : null
  }
  getAdjacents = ({ x, y }) => {
    return [
      { x: x, y: y - 1 },
      { x: x, y: y + 1 },
      { x: x - 1, y: y },
      { x: x - 1, y: y - 1 },
      { x: x - 1, y: y + 1 },
      { x: x + 1, y: y },
      { x: x + 1, y: y - 1 },
      { x: x + 1, y: y + 1 },
    ].filter((point) => this.isValid(point))
  }
  isValid = ({ x, y }) => {
    return x >= 0 && y >= 0 && x < this.width && y < this.height
  }
  get width() {
    return this.height ? this.data[0].length : 0
  }
  get height() {
    return this.data.length
  }
  get size() {
    return this.width * this.height
  }
}

class Stepper {
  matrix
  constructor(matrix) {
    this.matrix = matrix
  }

  incPower = (points, flashed) => {
    for (let p = 0; p < points.length; p++) {
      const point = points[p]
      if (isPointIncluded(point, flashed)) continue

      const power = this.matrix.incPower(point)
      if (power > 9 && !isPointIncluded(point, flashed)) {
        // flash
        flashed.push(point)
        const adjacents = this.matrix.getAdjacents(point)
        this.incPower(adjacents, flashed)
      }
    }
  }

  nextStep = () => {
    const flashed = []
    for (let y = 0; y < this.matrix.height; y++) {
      for (let x = 0; x < this.matrix.width; x++) {
        const point = { x, y }
        this.incPower([point], flashed)
      }
    }

    for (let f = 0; f < flashed.length; f++) this.matrix.setPower(flashed[f], 0)

    return flashed.length
  }
}

const isPointIncluded = (point, points) => {
  if (points.length === 0) return false
  for (let p = 0; p < points.length; p++) {
    if (points[p].x === point.x && points[p].y === point.y) {
      return true
    }
  }
  return false
}

;(async () => {
  const matrix = new Matrix()

  await readfile('./previousDaysNodeJS/11.txt', (line) => {
    matrix.addLine(line)
  })

  const stepper = new Stepper(matrix)
  let flashedResult = 0
  for (let x = 1; x <= 999; x++) {
    const stepFlashes = stepper.nextStep()

    flashedResult += stepFlashes
    if (x === 100) {
      // 1743 -> ok!
      console.log('total flashes after 100 steps:', flashedResult)
    }

    if (stepFlashes === matrix.size) {
      // 364 -> ok!
      console.log('all octopus flashed after x steps:', x)
      exit(0)
    }
  }
})()
