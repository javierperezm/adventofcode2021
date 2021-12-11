import { IMapStringNumber } from 'lib/types'
import { IChunkProcessorDoTick, IStringChunk } from '../types'
import { Chunk } from './Chunk'
import { ChunkLine } from './ChunkLine'

export class ChunksProcessor {
  static readonly INTERVAL_TICK = 1

  data: string[]
  lineIndex: number
  chunkLines: ChunkLine[]
  chunk: Chunk | undefined
  currentChunkLine: ChunkLine
  interval: NodeJS.Timer | undefined

  constructor(data: string[]) {
    this.data = data
    this.lineIndex = 0
    this.chunkLines = []

    this.currentChunkLine = new ChunkLine(this.data[this.lineIndex])
  }

  saveChunkLine = (type: number) => {
    // save current chunk-line
    this.currentChunkLine.setType(type)
    this.currentChunkLine.setChunk(this.chunk as Chunk)
    this.chunkLines.push(this.currentChunkLine)

    // next line
    this.lineIndex++
    if (this.lineIndex === this.data.length) {
      // end processing
      this.end()
      return
    }

    // new chunk-line
    this.currentChunkLine = new ChunkLine(this.data[this.lineIndex])
    this.chunk = undefined
  }

  tick = () => {
    if (this.lineIndex === this.data.length) return

    if (!this.currentChunkLine.hasChar()) {
      this.saveChunkLine(ChunkLine.TYPE_INCOMPLETED)
      if (this.lineIndex === this.data.length) return
    }

    // process a new character
    const char = this.currentChunkLine.nextChar()

    if (Chunk.isOpenerChar(char)) {
      // create new chunk
      this.chunk = new Chunk(char, this.chunk)
    } else {
      // we should close the current chunk; try it:
      if ((this.chunk as Chunk).close(char)) {
        // chunk closed, going back to the parent
        this.chunk = (this.chunk as Chunk).parent
      } else {
        this.saveChunkLine(ChunkLine.TYPE_CORRUPTED)
      }
    }
  }

  start = (ticker: IChunkProcessorDoTick) => {
    this.interval = setInterval(() => {
      this.tick()

      ticker(
        this.lineIndex < this.data.length
          ? this.generateStringChunks()
          : [
              ...this.generateStringChunks(),
              {
                processed: 'corrupted: ',
                current: `${this.generateCorruptedSolution()}`,
                corrupted: '',
              },
              {
                processed: 'incompleted: ',
                current: `${this.generateIncompletedSolution()}`,
                corrupted: '',
              },
            ]
      )
    }, ChunksProcessor.INTERVAL_TICK)
  }

  end = () => {
    console.log('END!!!')
    clearInterval(this.interval as NodeJS.Timer)
  }

  generateIncompletedSolution = (): number => {
    const INCOMPLETED_POINTS: IMapStringNumber = {
      ')': 1,
      ']': 2,
      '}': 3,
      '>': 4,
    }

    const scores = this.chunkLines
      .filter((chunkLine) => chunkLine.type === ChunkLine.TYPE_INCOMPLETED)
      .map((chunkLine) => {
        let chunk: Chunk = chunkLine.chunk as Chunk
        let score = 0
        while (chunk) {
          const key = chunk.closer ?? ''
          score = score * 5 + INCOMPLETED_POINTS[key]
          chunk = chunk.parent as Chunk
        }
        return score
      })

    // calculate the middle incompleted score
    for (let x = 0; x < scores.length; x++) {
      const xval = scores[x]
      let side1 = 0
      let side2 = 0
      for (let y = 0; y < scores.length; y++) {
        const yval = scores[y]
        if (xval > yval) {
          side1++
        } else if (xval < yval) {
          side2++
        }
      }
      if (side1 === side2) {
        return xval
      }
    }

    return -1
  }

  generateCorruptedSolution = (): number => {
    const corruptedChars: IMapStringNumber = {}

    this.chunkLines
      .filter((chunkLine) => chunkLine.type === ChunkLine.TYPE_CORRUPTED)
      .map((chunkLine) => chunkLine.line[chunkLine.index])
      .forEach((char) => {
        if (corruptedChars[char] === undefined) {
          corruptedChars[char] = 1
        } else {
          corruptedChars[char]++
        }
      })

    const CORRUPTED_POINTS: IMapStringNumber = {
      ')': 3,
      ']': 57,
      '}': 1197,
      '>': 25137,
    }

    return Object.keys(corruptedChars)
      .map((char) => corruptedChars[char] * CORRUPTED_POINTS[char])
      .reduce((acc, val) => acc + val)
  }

  generateStringChunks = (): IStringChunk[] => {
    return [...this.chunkLines, this.currentChunkLine]
      .filter((chunkLine) => !!chunkLine.line)
      .map((chunkLine) => {
        return {
          processed:
            chunkLine.index > 0
              ? chunkLine.line.substring(0, chunkLine.index)
              : null,
          current:
            chunkLine.type === ChunkLine.TYPE_NEW && chunkLine.index >= 0
              ? chunkLine.line[chunkLine.index]
              : null,
          corrupted:
            chunkLine.type === ChunkLine.TYPE_CORRUPTED
              ? chunkLine.line.substring(chunkLine.index + 1)
              : null,
        }
      })
  }
}
