'use strict'
'Day 25: Sea Cucumber'

const fs = require('fs')

const input = fs.readFileSync('./public/data/25.txt', 'utf8').trimEnd()

const inputTest = `v...>>.vv>
.vv>>.vv..
>>.>v>...v
>>v>>.>.v.
v>v.vv.v..
>.>>..v...
.vv..>.>v.
v.v..>>v.v
....v..v.>`

const solve = async (input) => {
  const CUCUMBER_R = '>'
  const CUCUMBER_D = 'v'
  const EMPTY = '.'

  const matrix = {
    data: input.split('\n').map((line) => line.split('')),
    width: null,
    height: null,
    hasMoved: false,
    moveRight: function () {
      const previous = this.data
        .map((line) => line.join('#'))
        .join('@')
        .split('@')
        .map((line) => line.split('#').join(''))

      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          if (this.data[y][x] === CUCUMBER_R) {
            const nextX = x + 1 === this.width ? 0 : x + 1
            if (previous[y][nextX] === EMPTY) {
              this.data[y][nextX] = CUCUMBER_R
              this.data[y][x] = EMPTY
              this.hasMoved = true
              x++
            }
          }
        }
      }
    },
    moveDown: function () {
      const previous = this.data
        .map((line) => line.join('#'))
        .join('@')
        .split('@')
        .map((line) => line.split('#').join(''))

      for (let x = 0; x < this.width; x++) {
        for (let y = 0; y < this.height; y++) {
          if (this.data[y][x] === CUCUMBER_D) {
            const nextY = y + 1 === this.height ? 0 : y + 1
            if (previous[nextY][x] === EMPTY) {
              this.data[nextY][x] = CUCUMBER_D
              this.data[y][x] = EMPTY
              this.hasMoved = true
              y++
            }
          }
        }
      }
    },

    print: function () {
      console.clear()
      console.log(this.data.map((line) => line.join('')).join('\n'))
    },
  }

  matrix.height = matrix.data.length
  matrix.width = matrix.data[0].length

  matrix.print()
  console.log(0)

  let step = 0
  do {
    step++

    matrix.hasMoved = false
    matrix.moveRight()
    matrix.moveDown()

    matrix.print()
    await sleep(10)
  } while (matrix.hasMoved)

  console.log(step)
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

solve(input)
