import { IPoint, ISize } from './types'

export default function calculateMatrixSize(points: IPoint[]): ISize {
  let width = 0
  let height = 0

  points.forEach((point) => {
    width = Math.max(width, point.x + 1)
    height = Math.max(height, point.y + 1)
  })
  return { width, height }
}
