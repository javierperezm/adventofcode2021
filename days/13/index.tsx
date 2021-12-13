import Loading from 'components/Loading'
import ChallengePageLayout from 'layouts/ChallengePageLayout'
import { NextPage } from 'next'
import { useState } from 'react'
import { IPoint, ISize, NumbersMatrix } from 'lib/types'
import WorkerManager from 'lib/WorkerManager'
import calculateMatrixSize from 'lib/calculateMatrixSize'
import CanvasContainer from './components/CanvasContainer'

interface IFold {
  axis: string
  value: number
}

interface IWorkerFoldReturnData {
  action: string
  points: IPoint[]
}

const Day13: NextPage = () => {
  const [points, setPoints] = useState<IPoint[]>()
  const [foldings, setFoldings] = useState<IFold[]>()
  const [canvasSize, setCanvasSize] = useState<ISize>()

  const onLoad = (data: string[]): void => {
    const points: IPoint[] = []
    const foldings: IFold[] = []
    let readingPointsMode = true

    data.forEach((line) => {
      if (line === '') {
        readingPointsMode = false
      } else if (readingPointsMode) {
        const lineData = line.split(',').map((val) => parseInt(val))
        const point: IPoint = {
          x: lineData[0],
          y: lineData[1],
        }
        points.push(point)
      } else {
        const lineData = line.split('=')
        const fold: IFold = {
          axis: lineData[0][lineData[0].length - 1],
          value: parseInt(lineData[1]),
        }
        foldings.push(fold)
      }
    })

    setPoints(points)
    setFoldings(foldings)

    setCanvasSize(calculateMatrixSize(points))
  }

  const handleRun = () => {
    let nextFold = (foldings as IFold[]).shift()

    const worker = new WorkerManager('/workers/13.js')

    let foldedPoints = points

    const interval = setInterval(() => {
      worker.post(
        { action: 'fold', points: foldedPoints, fold: nextFold },
        (data: IWorkerFoldReturnData) => {
          foldedPoints = data.points
          setPoints(foldedPoints)
          nextFold = (foldings as IFold[]).shift()
          if (!nextFold) clearInterval(interval)
        }
      )
    }, 1000)
  }

  return (
    <ChallengePageLayout
      day={13}
      title="Transparent Origami"
      onRun={handleRun}
      onLoadFile={onLoad}
    >
      {canvasSize ? (
        <CanvasContainer canvasSize={canvasSize} points={points as IPoint[]} />
      ) : (
        <Loading />
      )}
    </ChallengePageLayout>
  )
}

export default Day13
