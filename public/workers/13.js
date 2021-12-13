class MatrixManager {
  data
  width
  height
  constructor(data) {
    this.data = data || []
    this.width = 0
    this.height = 0
    this.data.forEach((point) => this.add(point, 1))
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

    return manager.getPointsWithValue(1)
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

onmessage = (message) => {
  switch (message.data.action) {
    case 'fold':
      postMessage({
        action: 'fold',
        points: new MatrixManager(message.data.points).fold(message.data.fold),
      })
      break
  }
}
