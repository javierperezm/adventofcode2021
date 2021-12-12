const readfile = require('./readfile')

const filterByCommon = (data, column, mostCommon) => {
  let selectedBit
  let bits = { 0: 0, 1: 0 }
  data.forEach((line) => {
    let bit = line.split('')[column]
    bits[bit]++
  })

  console.log(bits)

  if (mostCommon) {
    // most common or 1
    selectedBit = bits[1] - bits[0] >= 0 ? '1' : '0'
  } else {
    // less common or 0
    selectedBit = bits[0] - bits[1] <= 0 ? '0' : '1'
  }
  console.log(selectedBit)

  return data.filter((line) => line.split('')[column] === selectedBit)
}

;(async () => {
  let lines = []

  await readfile('0301.txt', (line) => {
    lines.push(line)
  })

  let o2 = lines
  let co2 = lines

  let column = 0
  while (o2.length > 1) {
    o2 = filterByCommon(o2, column, true)
    column++
  }

  column = 0
  while (co2.length > 1) {
    co2 = filterByCommon(co2, column, false)
    column++
  }

  console.log('result = ', parseInt(o2[0], 2) * parseInt(co2[0], 2))
})()
