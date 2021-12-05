const { exit } = require('process')
const readfile = require('./readfile')

class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  static fromString(point) {
    const [x, y] = point.split(',').map((value) => parseInt(value))
    return new Point(x, y)
  }

  toString() {
    return `${this.x},${this.y}`
  }
}
class Vector {
  constructor(point1, point2) {
    this.point1 = point1
    this.point2 = point2
  }

  static fromString(vector) {
    const [point1, point2] = vector.split(' -> ').map(Point.fromString)
    return new Vector(point1, point2)
  }

  isValid() {
    return this.point1.x === this.point2.x || this.point1.y === this.point2.y
  }

  collectLinePoints() {
    const dx = Math.abs(this.point2.x - this.point1.x)
    const dy = Math.abs(this.point2.y - this.point1.y)
    let points = []

    if (dx === 0) {
      let yOrigin = Math.min(this.point1.y, this.point2.y)
      for (let y = 0; y <= dy; y++) {
        points.push(new Point(this.point1.x, yOrigin + y).toString())
      }
    } else if (dy === 0) {
      let xOrigin = Math.min(this.point1.x, this.point2.x)
      for (let x = 0; x <= dx; x++) {
        points.push(new Point(xOrigin + x, this.point1.y).toString())
      }
    }

    return points
  }

  toString() {
    return `${this.point1.x},${this.point1.y} -> ${this.point2.x},${this.point2.y}`
  }
}

const matrix = {}
addVector = (vector) => {
  if (!vector.isValid()) {
    return
  }
  vector.collectLinePoints().forEach((key) => {
    matrix[key] = matrix[key] === undefined ? 1 : matrix[key] + 1
  })
}
;(async () => {
  await readfile('0501.txt', (line) => {
    addVector(Vector.fromString(line))
  })

  const result = Object.keys(matrix).filter(
    (key) => matrix[key] !== undefined && matrix[key] >= 2
  ).length
  console.log('result =', result)
})()
