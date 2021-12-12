const { exit } = require('process')
const readfile = require('./readfile')

function Card() {
  this.numbers = []
  this.marked = []
  this.rows = Array.from({ length: 5 }, (v) => 0)
  this.columns = Array.from({ length: 5 }, (v) => 0)

  this.addNumbers = (numbers) => {
    this.numbers.push(numbers)
  }

  this.newBall = (number) => {
    // rows
    for (let y = 0; y < this.numbers.length; y++) {
      // cols
      for (let x = 0; x < this.numbers[y].length; x++) {
        if (number === this.numbers[y][x]) {
          const key = `${x}:${y}`
          this.marked.push(key)
          this.rows[y] = (this.rows[y] ?? 0) + 1
          this.columns[x] = (this.columns[x] ?? 0) + 1
          if (
            this.rows[y] === this.numbers.length ||
            this.columns[x] === this.numbers[y].length
          ) {
            return true
          }
        }
      }
    }
    return false
  }

  this.sumNotMarked = () => {
    console.log(this.marked)
    let sum = 0
    // rows
    for (let y = 0; y < this.numbers.length; y++) {
      // cols
      for (let x = 0; x < this.numbers[y].length; x++) {
        const key = `${x}:${y}`
        const marked = this.marked.includes(key)
        if (!marked) {
          sum += this.numbers[y][x]
        }
      }
    }
    return sum
  }
}

;(async () => {
  // load balls and cards
  let balls
  let card
  let cards = []
  await readfile('0401.txt', (line) => {
    if (balls === undefined) {
      balls = line.split(',').map((value) => parseInt(value))
    } else if (!line) {
      if (card) cards.push(card)
      card = new Card()
    } else {
      card.addNumbers(
        line
          .split(' ')
          .filter((value) => !!value)
          .map((value) => parseInt(value))
      )
    }
  })

  // get balls
  for (let n = 0; n < balls.length; n++) {
    for (let c = 0; c < cards.length; c++) {
      if (cards[c].newBall(balls[n])) {
        const sum = cards[c].sumNotMarked()
        console.log(cards[c])

        console.log('response = ', sum * balls[n])
        exit(0)
      }
    }
  }

  console.log('no winner :(')
})()
