import { useEffect, useState } from 'react'
import { isPromise } from 'util/types'

export type TMatrixData = number[][]

export interface IPoint {
  x: number
  y: number
}

interface IGetHeight {
  (point: IPoint): number
}

interface IGetLowestPoints {
  (): IPoint[]
}

interface IMarkPoints {
  (points: IPoint[], height: number): void
}

interface IGetBasins {
  (point: IPoint): IPoint[]
}

interface IRestore {
  (data: TMatrixData): void
}

interface IBackup {
  (): TMatrixData
}

interface ISetPoints {
  (data: TMatrixData, points: IPoint[], height: number): void
}

export interface IUseMatrix {
  readonly isLoading: boolean
  readonly size: number
  readonly data: TMatrixData | undefined
  readonly matrixHeight: number
  readonly matrixWidth: number
  getLowestPoints: IGetLowestPoints
  markPoints: IMarkPoints
  getHeight: IGetHeight
  getBasins: IGetBasins
  restore: IRestore
  backup: IBackup
  setPoints: ISetPoints
}

const useMatrix = (filename: string): IUseMatrix => {
  const [data, setData] = useState<TMatrixData>()

  const matrixHeight = data ? data.length : 0
  const matrixWidth = data && data.length > 0 ? data[0].length : 0

  useEffect(() => {
    fetch(filename).then((response) => {
      response.text().then((text) => {
        const matrix: number[][] = text
          .split('\n')
          .map((line) => line.split('').map((val) => parseInt(val)))

        setData(matrix)
      })
    })
  }, [filename])

  const getLowestPoints: IGetLowestPoints = (): IPoint[] => {
    let points: IPoint[] = []

    for (let y = 0; y < matrixHeight; y++) {
      for (let x = 0; x < matrixWidth; x++) {
        const point: IPoint = { x, y }

        const adjacents = getAdjacentsPoints(point)

        if (isTheLowest(point, adjacents)) {
          points.push(point)
        }
      }
    }

    return points
  }

  const getHeight: IGetHeight = (point: IPoint): number => {
    return data && isValid(point) ? data[point.y][point.x] : -1
  }

  const isTheLowest = (point: IPoint, points: IPoint[]): boolean => {
    const height: number = getHeight(point)

    for (let p = 0; p < points.length; p++) {
      const pointHeight = getHeight(points[p])
      if (pointHeight === null || height >= pointHeight) return false
    }

    return true
  }

  const isValid = (point: IPoint): boolean => {
    return (
      point.x >= 0 &&
      point.y >= 0 &&
      point.y < matrixHeight &&
      point.x < matrixWidth
    )
  }

  const getAdjacentsPoints = (point: IPoint): IPoint[] => {
    return [
      { x: point.x, y: point.y - 1 },
      { x: point.x, y: point.y + 1 },
      { x: point.x - 1, y: point.y },
      { x: point.x + 1, y: point.y },
    ].filter(isValid)
  }

  const markPoints: IMarkPoints = (points: IPoint[], height: number): void => {
    const newData = data?.map((row, y) =>
      row.map((value, x) => {
        for (let p = 0; p < points.length; p++) {
          if (x === points[p].x && y === points[p].y) return height
        }
        return value
      })
    )
    setData(newData)
  }

  const setPoints: ISetPoints = (
    data: TMatrixData,
    points: IPoint[],
    height: number
  ): void => {
    for (let p = 0; p < points.length; p++) {
      const { x, y } = points[p]
      data[y][x] = height
    }
  }

  const hasPoint = (point: IPoint, inPoints: IPoint[]): boolean => {
    for (let p = 0; p < inPoints.length; p++) {
      if (point.x === inPoints[p].x && point.y === inPoints[p].y) return true
    }
    return false
  }

  const createBasin = (point: IPoint, points: IPoint[]): IPoint[] => {
    if (isValid(point) && getHeight(point) < 9 && !hasPoint(point, points)) {
      points.push(point)

      points = createBasin({ x: point.x, y: point.y - 1 }, points)
      points = createBasin({ x: point.x, y: point.y + 1 }, points)
      points = createBasin({ x: point.x - 1, y: point.y }, points)
      points = createBasin({ x: point.x + 1, y: point.y }, points)
    }

    return points
  }

  const getBasins = (point: IPoint): IPoint[] => {
    return createBasin(point, [])
  }

  const backup: IBackup = () => {
    return [...(data as TMatrixData)]
  }

  const restore: IRestore = (data: TMatrixData) => {
    setData(data)
  }

  return {
    isLoading: !data,
    size: data ? data.length * data[0].length : 0,
    data,
    matrixHeight,
    matrixWidth,
    getLowestPoints,
    markPoints,
    getHeight,
    getBasins,
    backup,
    restore,
    setPoints,
  }
}
export default useMatrix
