const readfile = require('./readfile')

class Matrix {
  constructor() {
    this.data = []
  }
  addRow(row) {
    this.data.push(row)
  }
  getLowestPoints() {
    let points = []
    for (let y = 0; y < this.data.length; y++) {
      for (let x = 0; x < this.data[y].length; x++) {
        const adjacents = this.getAdjacentsPoints(x, y)
        if (this.isTheLowest(this.data[y][x], adjacents)) {
          points.push(this.data[y][x])
          console.log(
            'new point(',
            this.data[y][x],
            '=>',
            x,
            ',',
            y,
            ') => ',
            adjacents.join(',')
          )
        }
      }
    }

    return points
  }

  isTheLowest(height, points) {
    for (let p = 0; p < points.length; p++) {
      if (height >= points[p]) return false
    }
    return true
  }

  getAdjacentsPoints(x, y) {
    return [
      [x, y - 1],
      [x, y + 1],
      [x - 1, y],
      [x + 1, y],
    ]
      .map(([x, y]) =>
        x >= 0 && y >= 0 && y < this.data.length && x < this.data[y].length
          ? this.data[y][x]
          : undefined
      )
      .filter((val) => val !== undefined)
  }
}

const matrix = new Matrix()

;(async () => {
  await readfile('09.txt', (line) => {
    matrix.addRow(line.split('').map((val) => parseInt(val)))
  })

  const result = matrix
    .getLowestPoints()
    .map((val) => val + 1)
    .reduce((acc, val) => acc + val)

  console.log('result: ', result)
})()
