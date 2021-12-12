const readfile = require('./readfile')

;(async () => {
  let hor = 0
  let ver = 0
  let aim = 0

  await readfile('0201.txt', (line) => {
    const [order, amountRaw] = line.split(' ')
    const amount = parseInt(amountRaw)

    switch (order) {
      case 'forward':
        hor += amount
        ver += amount * aim
        break
      case 'down':
        aim += amount
        break
      case 'up':
        aim -= amount
        break
    }

    // console.log(`${order} => ${amount}`)
  })

  console.log('result = ', hor * ver)
})()
