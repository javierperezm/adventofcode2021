import Matrix from 'lib/Matrix'
import { IPoint, NumbersMatrix } from 'lib/types'

export class Stepper {
  matrix: Matrix

  constructor(matrixData: NumbersMatrix) {
    this.matrix = new Matrix(matrixData)
  }

  incEnergy = (points: IPoint[], flashed: IPoint[]): void => {
    for (let p = 0; p < points.length; p++) {
      const point = points[p]
      if (Stepper.isPointIncluded(point, flashed)) continue

      const energy = this.matrix.incValue(point) as number
      if (energy > 9) {
        flashed.push(point)
        this.incEnergy(this.matrix.getAdjacents(point), flashed)
      }
    }
  }

  nextStep = (): number => {
    const flashed: IPoint[] = []

    this.turnOffFlashes()

    for (let y = 0; y < this.matrix.height; y++) {
      for (let x = 0; x < this.matrix.width; x++) {
        const point = { x, y }
        this.incEnergy([point], flashed)
      }
    }

    return flashed.length
  }

  turnOffFlashes = (): void => {
    for (let y = 0; y < this.matrix.height; y++) {
      for (let x = 0; x < this.matrix.width; x++) {
        if (this.matrix.data[y][x] > 9) {
          this.matrix.data[y][x] = 0
        }
      }
    }
  }

  getMatrixSize = (): number => this.matrix.size

  static isPointIncluded = (point: IPoint, points: IPoint[]) => {
    for (let p = 0; p < points.length; p++) {
      if (points[p].x === point.x && points[p].y === point.y) {
        return true
      }
    }
    return false
  }
}
