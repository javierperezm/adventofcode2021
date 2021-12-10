export interface IChunkProcessorDoTick {
  (stringChunks: IStringChunk[]): void
}

export interface IStringChunk {
  processed: string | null
  current: string | null
  corrupted: string | null
}

export interface IMapStringNumber {
  [key: string]: number
}

export interface IOnLoad {
  (data: string[]): void
}
