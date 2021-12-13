const readfile = require('./readfile')

class MatrixManager {
  data
  width
  height
  constructor(data) {
    this.data = data || []
    this.height = 0
    this.width = 0
  }

  add(point, value) {
    this.data[point.y] === undefined && (this.data[point.y] = [])
    this.data[point.y][point.x] = value

    this.width = Math.max(point.x + 1, this.width)
    this.height = Math.max(point.y + 1, this.height)
  }

  fold({ axis, value }) {
    const manager = new MatrixManager()

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.data[y] !== undefined && this.data[y][x] !== undefined) {
          if ((axis === 'x' && x < value) || (axis === 'y' && y < value)) {
            // normal
            manager.add({ x, y }, this.data[y][x])
          } else if (
            (axis === 'x' && x > value) ||
            (axis === 'y' && y > value)
          ) {
            // folded
            let targetX = axis === 'x' ? value * 2 - x : x
            let targetY = axis === 'y' ? value * 2 - y : y
            manager.add({ x: targetX, y: targetY }, this.data[y][x])
          }
        }
      }
    }

    return manager
  }

  getPointsWithValue(value) {
    const points = []
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.data[y] !== undefined && this.data[y][x] === value)
          points.push({ x, y })
      }
    }
    return points
  }

  print() {
    let text = []
    let line = ''
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        line +=
          this.data[y] !== undefined && this.data[y][x] !== undefined
            ? '#'
            : ' '
      }
      text.push(line)
      line = ''
    }
    return text.join('\n')
  }
}

;(async () => {
  const manager = new MatrixManager()
  const foldings = []
  let readingPointsMode = true
  await readfile('./algorithms/13.txt', (line) => {
    if (line === '') {
      readingPointsMode = false
    } else if (readingPointsMode) {
      const lineData = line.split(',').map((val) => parseInt(val))
      const point = {
        x: lineData[0],
        y: lineData[1],
      }
      manager.add(point, 1)
    } else {
      const lineData = line.split('=')
      const fold = {
        axis: lineData[0][lineData[0].length - 1],
        value: parseInt(lineData[1]),
      }
      foldings.push(fold)
    }
  })

  let newManager = manager
  foldings.forEach((folding, idx) => {
    newManager = newManager.fold(folding)
    // 1st -> 847
    if (idx === 0) console.log(newManager.getPointsWithValue(1).length)
  })

  // BCZRCEAB
  console.log(newManager.print())
})()
