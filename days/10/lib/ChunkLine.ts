import { Chunk } from './Chunk'

export class ChunkLine {
  static readonly TYPE_NEW = 0
  static readonly TYPE_CORRUPTED = 1
  static readonly TYPE_INCOMPLETED = 2

  line: string
  type: number
  index: number
  chunk?: Chunk

  constructor(line: string) {
    this.line = line
    this.index = -1
    this.type = ChunkLine.TYPE_NEW
  }
  setChunk = (chunk: Chunk): void => {
    this.chunk = chunk
  }
  setType = (type: number): void => {
    this.type = type
  }
  setIndex = (index: number): void => {
    this.index = index
  }
  hasChar = (): boolean => this.index < this.line.length - 1
  nextChar = (): string => this.line[++this.index]
}
