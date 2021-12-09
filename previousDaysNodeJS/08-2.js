const readfile = require('./readfile')

class EncodedDigits {
  constructor(signalPatterns) {
    this.digits = []
    this.signalPatterns = signalPatterns.split(' ')

    this.extractQuery(1, 2) // digit "1" has 2 segments
    this.extractQuery(4, 4) // digit "4" has 4 segments
    this.extractQuery(7, 3) // digit "7" has 3 segments
    this.extractQuery(8, 7) // digit "8" has 7 segments
    this.extractQuery(9, 6, 4) // digit "9" has 6 segments and the same as "7"
    this.extractQuery(0, 6, 7) // digit "0" has 6 segments and the same as "1"
    this.extractQuery(6, 6) // digit "6" has 6 segments and it is the last one
    this.extractQuery(3, 5, 7) // digit "3" has 5 segments and the same as "7"
    this.extractQuery(5, 5, 9) // digit "5" has 5 segments and it looks like a "9"
    this.extractQuery(2, 5) // digit "2" has 5 segments and it is the last one
  }

  extractQuery(digit, length, matchDigit) {
    const code = this.signalPatterns.find(
      (val) =>
        val.length === length &&
        (matchDigit === undefined ||
          this.matchSegments(val, this.digits[matchDigit]))
    )

    this.digits[digit] = code
    this.signalPatterns = this.signalPatterns.filter((val) => val !== code)
  }

  matchSegments(code1, code2) {
    const main = code1.length > code2.length ? code1 : code2
    const segments =
      code1.length > code2.length ? code2.split('') : code1.split('')

    for (let idx = 0; idx < segments.length; idx++) {
      if (!main.includes(segments[idx])) return false
    }

    return true
  }

  findDigit(val) {
    for (let digit = 0; digit <= this.digits.length; digit++) {
      if (
        val.length === this.digits[digit].length &&
        this.matchSegments(val, this.digits[digit])
      ) {
        return digit
      }
    }
    return -1
  }

  getNumber(outputValue) {
    return parseInt(
      outputValue
        .split(' ')
        .map((val) => this.findDigit(val))
        .join('')
    )
  }
}

let counter = 0
;(async () => {
  await readfile('08.txt', (line) => {
    const [signalPatterns, outputValue] = line.split(' | ')
    const digits = new EncodedDigits(signalPatterns)
    const number = digits.getNumber(outputValue)

    counter += number
  })

  console.log('result:', counter)
})()
