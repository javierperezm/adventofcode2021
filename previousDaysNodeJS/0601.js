const readfile = require('./readfile')

let fishes = []

;(async () => {
  await readfile('0601.txt', (line) => {
    fishes = line.split(',').map((val) => parseInt(val))
  })

  for (let day = 1; day <= 80; day++) {
    let newFishes = []
    fishes = fishes.map((val) => {
      val--
      if (val < 0) {
        newFishes.push(8)
        val = 6
      }
      return val
    })

    fishes = [...fishes, ...newFishes]
  }

  console.log(fishes.length)
})()
