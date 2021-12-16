'use strict'

var Heap = require('heap')

const TEST_MODE = false
const readfile = require('../../lib/readfile')
const dataFile = './public/data/15' + (TEST_MODE ? 'test' : '') + '.txt'

;(async () => {
  const matrix = []
  await readfile(dataFile, (line) => {
    matrix.push(line.split('').map((val) => parseInt(val)))
  })

  const DIRECTIONS = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ]

  const solve = (multiverso) => {
    const HEIGHT = matrix.length
    const WIDTH = HEIGHT ? matrix[0].length : 0
    const MHEIGHT = HEIGHT * multiverso
    const MWIDTH = WIDTH * multiverso
    const cache = {}

    const getCachedTotal = (x, y) =>
      cache[x + ':' + y] ?? Number.MAX_SAFE_INTEGER
    const saveCacheTotal = (x, y, total) => (cache[x + ':' + y] = total)
    const getPoint = (x, y) => {
      let value =
        matrix[y % HEIGHT][x % WIDTH] +
        Math.floor(x / WIDTH) +
        Math.floor(y / HEIGHT)
      while (value > 9) value -= 9
      return value
    }

    const heap = new Heap((t1, t2) => t1.t - t2.t)
    heap.push({ x: 0, y: 0, t: 0 })

    while (!heap.empty()) {
      const { x, y, t } = heap.pop()
      if (x < 0 || x >= MWIDTH || y < 0 || y >= MHEIGHT) continue
      const total = getPoint(x, y) + t

      if (total + t < getCachedTotal(x, y)) {
        saveCacheTotal(x, y, total)
      } else {
        continue
      }

      if (x === MWIDTH - 1 && y === MHEIGHT - 1) {
        return total - getPoint(0, 0)
      }

      DIRECTIONS.forEach((val) => {
        const [incx, incy] = val
        heap.push({ x: x + incx, y: y + incy, t: total })
      })
    }
  }

  console.log(solve(1))
  console.log(solve(5))
})()
