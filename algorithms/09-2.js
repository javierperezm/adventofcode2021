const readfile = require('./readfile')

class Matrix {
  constructor() {
    this.data = []
  }

  getHeight({ x, y }) {
    return x >= 0 && y >= 0 && y < this.data.length && x < this.data[y].length
      ? this.data[y][x]
      : undefined
  }

  addRow(row) {
    this.data.push(row)
  }
  getLowestPoints() {
    let points = []
    for (let y = 0; y < this.data.length; y++) {
      for (let x = 0; x < this.data[y].length; x++) {
        const height = this.getHeight({ x, y })
        const adjacents = this.getAdjacentsPoints({ x, y })
        if (this.isTheLowest(height, adjacents)) {
          points.push({ x, y })
          console.log(
            'new point(',
            height,
            '=>',
            x,
            ',',
            y,
            ') => ',
            adjacents
              .map(({ x, y }) => `${x},${y}(${this.getHeight({ x, y })})`)
              .join(' ')
          )
        }
      }
    }

    return points
  }

  getBasin(point) {
    const adjacents = this.getAdjacentsPoints(point)
    const height = this.getHeight(point) + 1
    let basins = [point]
    if (height < 9) {
      for (let p = 0; p < adjacents.length; p++) {
        if (this.getHeight(adjacents[p]) === height) {
          basins.push(adjacents[p])

          const childBasins = this.getBasin(adjacents[p])
          for (let c = 0; c < childBasins.length; c++) {
            let found = false
            for (let idx = 0; idx < basins.length; idx++) {
              if (
                basins[idx].x === childBasins[c].x &&
                basins[idx].y === childBasins[c].y
              ) {
                found = true
                break
              }
            }
            if (!found) basins.push(childBasins[c])
          }
        }
      }
    }
    return basins
  }

  isTheLowest(height, points) {
    for (let p = 0; p < points.length; p++) {
      if (height >= this.getHeight(points[p])) return false
    }
    return true
  }

  getAdjacentsPoints({ x, y }) {
    return [
      [x, y - 1],
      [x, y + 1],
      [x - 1, y],
      [x + 1, y],
    ]
      .map(([x, y]) =>
        x >= 0 && y >= 0 && y < this.data.length && x < this.data[y].length
          ? { x, y }
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
    .map((point) => {
      const basins = matrix.getBasin(point)
      console.log(point, ' => ', basins)
      return basins.length
    })
    .sort((a, b) => b - a)

  console.log(result)

  console.log(
    'result: ',
    result.slice(0, 3).reduce((a, b) => a * b)
  )

  // 660480 -> too low
})()
