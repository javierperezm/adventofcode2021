const { exit } = require('process')
const readfile = require('./readfile')

let fishes = Array.from({ length: 9 }, (v) => 0)

;(async () => {
  await readfile('0601.txt', (line) => {
    line.split(',').forEach((val) => {
      let fishTimer = parseInt(val)
      fishes[fishTimer] =
        fishes[fishTimer] === undefined ? 1 : fishes[fishTimer] + 1
    })
  })

  for (let day = 1; day <= 256; day++) {
    let previous = 0
    for (let timer = fishes.length - 1; timer >= 0; timer--) {
      const currentTimerFishes = fishes[timer]
      fishes[timer] = previous
      previous = currentTimerFishes

      if (timer === 0) {
        fishes[6] += currentTimerFishes
        fishes[8] += currentTimerFishes
      }
    }
  }

  const totalFishes = fishes.reduce((acc, val) => acc + val)
  console.log('result:', totalFishes)
})()
