const readfile = require('./readfile')

let positions
;(async () => {
  await readfile('0701.txt', (line) => {
    positions = line.split(',').map((val) => parseInt(val))
  })

  let min, max
  positions.forEach((val) => {
    min = min === undefined ? val : Math.min(min, val)
    max = max === undefined ? val : Math.max(max, val)
  })

  let minFuel = max * positions.length * 1000
  for (let position = min; position <= max; position++) {
    const fuel = positions
      .map((val) => {
        const diff = Math.abs(val - position)
        let fuel = 0
        for (let inc = 1; inc <= diff; inc++) {
          fuel += inc
        }
        return fuel
      })
      .reduce((acc, val) => acc + val)
    minFuel = Math.min(fuel, minFuel)
  }

  console.log('result:', minFuel)
})()
