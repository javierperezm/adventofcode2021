export class Chunk {
  static readonly STATUS_NEW = 0
  static readonly STATUS_OPEN = 1
  static readonly STATUS_CLOSED = 2

  parent: Chunk | undefined
  type: string
  status: number

  constructor(openerChar: string, parent: Chunk | undefined) {
    this.parent = parent
    this.type = openerChar
    this.status =
      openerChar === undefined ? Chunk.STATUS_NEW : Chunk.STATUS_OPEN
  }

  static isOpenerChar = (char: string) => {
    return '({[<'.includes(char)
  }

  getRoot = (): Chunk => {
    let item: Chunk = this
    while (item.parent !== undefined) item = item.parent
    return item
  }

  open = (char: string) => {
    if (this.status !== Chunk.STATUS_NEW || !Chunk.isOpenerChar(char)) {
      return false
    }

    this.type = char
    this.status = Chunk.STATUS_OPEN
    return true
  }

  close = (char: string) => {
    if (this.status !== Chunk.STATUS_OPEN || !this.isValidCloser(char)) {
      return false
    }
    this.status = Chunk.STATUS_CLOSED
    return true
  }

  isValidCloser = (char: string) => {
    return this.closer === char
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
}
