export interface IMapStringNumber {
  [key: string]: number
}

export interface IOnLoad {
  (data: string[]): void
}

export interface IPoint {
  x: number
  y: number
}

export type NumbersMatrix = number[][]

export interface ISize {
  width: number
  height: number
}

export interface IStringStringMap {
  [key: string]: string
}

export interface IStringNumberMap {
  [key: string]: number
}
