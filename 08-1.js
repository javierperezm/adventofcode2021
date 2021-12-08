const readfile = require('./readfile')

let counter = 0
;(async () => {
  await readfile('08.txt', (line) => {
    const [signalPatterns, outputValue] = line.split(' | ')
    outputValue.split(' ').forEach((val) => {
      if ([2, 3, 4, 7].includes(val.length)) counter++
    })
  })

  console.log('result:', counter)
})()
