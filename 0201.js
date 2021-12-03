const fs = require('fs')
const readline = require('readline')

async function processLineByLine(file, callback) {
  const fileStream = fs.createReadStream(file)

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  for await (const line of rl) {
    callback(line)
  }
}

;(async () => {
  let hor = 0
  let ver = 0
  await processLineByLine('0201.txt', (line) => {
    const [order, amountRow] = line.split(' ')
    const amount = parseInt(amountRow)

    switch (order) {
      case 'forward':
        hor += amount
        break
      case 'down':
        ver += amount
        break
      case 'up':
        ver -= amount
        break
    }

    // console.log(`${order} => ${amount}`)
  })

  console.log('result = ', hor * ver)
})()
