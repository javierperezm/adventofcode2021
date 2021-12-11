import { IPoint, NumbersMatrix } from 'lib/types'
import { Matrix } from './Matrix'

export class Stepper {
  matrix: Matrix

  constructor(matrixData: NumbersMatrix) {
    this.matrix = new Matrix(matrixData)
  }

  setMatrix = (matrix: Matrix): void => {
    this.matrix = matrix
  }

  incEnergy = (points: IPoint[], flashed: IPoint[]): void => {
    for (let p = 0; p < points.length; p++) {
      const point = points[p]
      if (Stepper.isPointIncluded(point, flashed)) continue

      const energy = this.matrix.incValue(point) as number
      if (energy > 9 && !Stepper.isPointIncluded(point, flashed)) {
        // flash
        flashed.push(point)
        const adjacents = this.matrix.getAdjacents(point)
        this.incEnergy(adjacents, flashed)
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

    // set flashed octopuses to 0
    //for (let f = 0; f < flashed.length; f++) this.matrix.setPower(flashed[f], 0)

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

  getMatrixData = (): NumbersMatrix => this.matrix.data.map((val) => val)
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
