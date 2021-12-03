const { exit } = require('process')
const readfile = require('./readfile')

//'hola mundo'.split('').forEach((bit, idx) => {
//  console.log(bit, idx)
//})
//exit()

;(async () => {
  let columns = []
  let lines = 0

  await readfile('0301.txt', (line) => {
    lines++
    line.split('').forEach((bit, idx) => {
      if (!columns[idx])
        columns[idx] = {
          0: 0,
          1: 0,
        }
      columns[idx][bit]++
    })
  })

  const gamma = parseInt(
    columns.map((bits) => (bits['0'] > bits['1'] ? '0' : '1')).join(''),
    2
  )
  const epsilon = parseInt(
    columns.map((bits) => (bits['0'] <= bits['1'] ? '0' : '1')).join(''),
    2
  )

  console.log('result = ', gamma * epsilon)
})()
