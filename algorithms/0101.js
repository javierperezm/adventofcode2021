const fs = require('fs')
const readline = require('readline')

async function processLineByLine() {
  const fileStream = fs.createReadStream('0101.txt')

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  let previousValue = null
  let bigger = 0
  for await (const line of rl) {
    const currentValue = parseInt(line)
    if (previousValue !== null && currentValue > previousValue) {
      bigger++
    }
    previousValue = currentValue
    console.log(`${line} -> ${bigger}`)
  }
}

processLineByLine()
