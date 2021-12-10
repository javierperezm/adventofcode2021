const readfile = require('./readfile')

const RESULT_CORRUPTED = 339477
const RESULT_INCOMPLETED = 3049320156

const STATUS_NEW = 0
const STATUS_OPEN = 1
const STATUS_CLOSED = 2

class Chunk {
  constructor(openerChar, parent) {
    this.parent = parent
    this.type = openerChar
    this.status = openerChar === undefined ? STATUS_NEW : STATUS_OPEN
  }

  open(char) {
    if (this.status !== STATUS_NEW || !isOpenerChar(char)) {
      return false
    }

    this.type = char
    this.status = STATUS_OPEN
    return true
  }

  close(char) {
    if (this.status !== STATUS_OPEN || !this.isSameType(char)) {
      return false
    }
    this.status = STATUS_CLOSED
    return true
  }

  get opener() {
    return this.type
  }
  get closer() {
    switch (this.type) {
      case '(':
        return ')'
      case '[':
        return ']'
      case '{':
        return '}'
      case '<':
        return '>'
    }
  }

  isSameType(char) {
    return this.closer === char
  }
}

const isOpenerChar = (char) => {
  return '({[<'.includes(char)
}

let corruptedChars = {}
let incompletedLinesScores = []

const INCOMPLETED_POINTS = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
}

const CORRUPTED_POINTS = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

;(async () => {
  await readfile('./previousDaysNodeJS/10.txt', (line) => {
    let chunk
    let corrupted = undefined
    let chars = line.split('')
    for (let c = 0; corrupted === undefined && c < chars.length; c++) {
      let char = chars[c]

      if (isOpenerChar(char)) {
        // create new chunk
        chunk = new Chunk(char, chunk)
      } else {
        // we should close the current chunk; try it:
        if (chunk.close(char)) {
          // chunk closed, going back to the parent
          chunk = chunk.parent
        } else {
          // chunk corrupted, exit line processor
          corrupted = char
          break
        }
      }
    }

    if (corrupted) {
      // corrupted line
      if (corruptedChars[corrupted] === undefined) {
        corruptedChars[corrupted] = 1
      } else {
        corruptedChars[corrupted]++
      }
    } else {
      // incompleted line
      let score = 0
      while (chunk) {
        score = score * 5 + INCOMPLETED_POINTS[chunk.closer]
        chunk = chunk.parent
      }
      incompletedLinesScores.push(score)
    }
  })

  // calculate corrupted points
  const resultCorrupted = Object.keys(corruptedChars)
    .map((char) => corruptedChars[char] * CORRUPTED_POINTS[char])
    .reduce((acc, val) => acc + val)

  console.log(
    'corrupted:',
    resultCorrupted,
    ' ==> ',
    resultCorrupted === RESULT_CORRUPTED ? 'OK' : 'FAIL'
  )

  // calculate the middle incompleted score
  for (let x = 0; x < incompletedLinesScores.length; x++) {
    const xval = incompletedLinesScores[x]
    let side1 = 0
    let side2 = 0
    for (let y = 0; y < incompletedLinesScores.length; y++) {
      const yval = incompletedLinesScores[y]
      if (xval > yval) {
        side1++
      } else if (xval < yval) {
        side2++
      }
    }
    if (side1 === side2) {
      console.log(
        'incompleted:',
        xval,
        ' ==> ',
        xval === RESULT_INCOMPLETED ? 'OK' : 'FAIL'
      )
      break
    }
  }
})()
