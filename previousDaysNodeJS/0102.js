const fs = require('fs')
const readline = require('readline')

function Collector() {
  const containers = []

  this.add = (measurement) => {
    const pointer = containers.length
    containers[pointer] = []

    for (
      let idx = pointer;
      idx > pointer - 3 && idx >= 0 && containers[idx].length < 3;
      idx--
    ) {
      containers[idx].push(measurement)
    }
  }

  this.getSumData = () =>
    containers.map((tripplets) => tripplets.reduce((acc, value) => acc + value))
}

async function processLineByLine() {
  const fileStream = fs.createReadStream('0102.txt')

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  const collector = new Collector()

  for await (const line of rl) {
    const currentValue = parseInt(line)
    collector.add(currentValue)

    console.log(`${line}`)
  }

  const data = collector.getSumData()

  let previousValue = null
  let bigger = 0
  for (let idx = 0; idx < data.length; idx++) {
    const currentValue = data[idx]
    if (previousValue !== null && currentValue > previousValue) {
      bigger++
    }
    previousValue = currentValue
    console.log(`${currentValue} -> ${bigger}`)
  }
}

processLineByLine()
