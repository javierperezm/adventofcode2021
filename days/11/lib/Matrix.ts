import { IPoint, NumbersMatrix } from 'lib/types'

export class Matrix {
  data: NumbersMatrix

  constructor(data: NumbersMatrix) {
    //this.data = data.map((line) => line.split('').map((val) => parseInt(val)))
    this.data = data
  }

  getValue = (point: IPoint): number | null => {
    return this.isValid(point) ? this.data[point.y][point.x] : null
  }

  setValue = (point: IPoint, value: number): number | null => {
    return this.isValid(point) ? (this.data[point.y][point.x] = value) : null
  }

  incValue = (point: IPoint): number | null => {
    return this.isValid(point) ? ++this.data[point.y][point.x] : null
  }

  getAdjacents = ({ x, y }: IPoint): IPoint[] => {
    return [
      { x: x, y: y - 1 },
      { x: x, y: y + 1 },
      { x: x - 1, y: y },
      { x: x - 1, y: y - 1 },
      { x: x - 1, y: y + 1 },
      { x: x + 1, y: y },
      { x: x + 1, y: y - 1 },
      { x: x + 1, y: y + 1 },
    ].filter((point) => this.isValid(point))
  }

  isValid = ({ x, y }: IPoint): boolean => {
    return x >= 0 && y >= 0 && x < this.width && y < this.height
  }

  get width(): number {
    return this.height ? this.data[0].length : 0
  }

  get height(): number {
    return this.data.length
  }

  get size(): number {
    return this.width * this.height
  }
}
