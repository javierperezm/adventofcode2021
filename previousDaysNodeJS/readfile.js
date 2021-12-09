const fs = require('fs')
const readline = require('readline')

module.exports = async (file, callback) => {
  const fileStream = fs.createReadStream(file)

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  for await (const line of rl) {
    callback(line)
  }
}
