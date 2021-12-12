import Matrix from 'lib/Matrix'
import { IPoint, NumbersMatrix } from 'lib/types'

export default class BasinsManager {
  matrix: Matrix
  constructor(data: NumbersMatrix) {
    this.matrix = new Matrix(data)
  }

  getLowestPoints = (): IPoint[] => {
    let points: IPoint[] = []

    for (let y = 0; y < this.matrix.height; y++) {
      for (let x = 0; x < this.matrix.width; x++) {
        const point: IPoint = { x, y }

        const adjacents = this.getCrossAdjacents(point)

        if (this.isTheLowest(point, adjacents)) {
          points.push(point)
        }
      }
    }

    return points
  }

  isTheLowest = (point: IPoint, points: IPoint[]): boolean => {
    const value = this.matrix.getValue(point) as number

    for (let p = 0; p < points.length; p++) {
      const pointValue = this.matrix.getValue(points[p])
      if (pointValue === null || value >= pointValue) return false
    }

    return true
  }

  getCrossAdjacents = (point: IPoint): IPoint[] => {
    return [
      { x: point.x, y: point.y - 1 },
      { x: point.x, y: point.y + 1 },
      { x: point.x - 1, y: point.y },
      { x: point.x + 1, y: point.y },
    ].filter(this.matrix.isValid)
  }

  setPointsValue = (points: IPoint[], value: number): void => {
    points.forEach((point) => this.matrix.setValue(point, value))
  }

  getValue = (point: IPoint): number => this.matrix.getValue(point) as number

  createBasin = (point: IPoint, points: IPoint[]): IPoint[] => {
    if (
      this.matrix.isValid(point) &&
      this.getValue(point) < 9 &&
      !BasinsManager.isPointIncluded(point, points)
    ) {
      points.push(point)

      points = this.createBasin({ x: point.x, y: point.y - 1 }, points)
      points = this.createBasin({ x: point.x, y: point.y + 1 }, points)
      points = this.createBasin({ x: point.x - 1, y: point.y }, points)
      points = this.createBasin({ x: point.x + 1, y: point.y }, points)
    }

    return points
  }

  getBasins = (point: IPoint): IPoint[] => {
    return this.createBasin(point, [])
  }

  static isPointIncluded = (point: IPoint, points: IPoint[]) => {
    for (let p = 0; p < points.length; p++) {
      if (points[p].x === point.x && points[p].y === point.y) {
        return true
      }
    }
    return false
  }
}
