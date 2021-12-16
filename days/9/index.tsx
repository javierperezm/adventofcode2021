import Loading from 'components/Loading'
import ChallengePageLayout from 'layouts/ChallengePageLayout'
import { NumbersMatrix } from 'lib/types'
import { NextPage } from 'next'
import { useState } from 'react'
import BasinMatrixCanvas from './components/BasinMatrixCanvas'
import BasinsManager from './lib/BasinsManager'
import IScores from './lib/IScores'

const Day9: NextPage = () => {
  const [data, setData] = useState<NumbersMatrix>()
  const [scores, setScores] = useState<IScores>({
    riskLevelsSum: 0,
    threeLargestBasins: 0,
  })

  const handleOnRun = () => {
    const newScores: IScores = {
      riskLevelsSum: 0,
      threeLargestBasins: 0,
    }
    const manager = new BasinsManager(data as NumbersMatrix)

    const lowestPoints = manager.getLowestPoints()

    newScores.riskLevelsSum = lowestPoints
      .map((val) => manager.getValue(val) + 1)
      .reduce((acc, val) => acc + val)

    manager.setPointsValue(lowestPoints, 10)

    const basins = lowestPoints.map((point) => {
      const basin = manager.getBasins(point)
      manager.setPointsValue(basin, 10)
      return basin
    })

    newScores.threeLargestBasins = basins
      .map((val) => val.length)
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((a, b) => a * b)

    setScores(newScores)
  }

  return (
    <ChallengePageLayout
      day={9}
      title="Smoke Basin"
      onLoadFile={(data) =>
        setData(data.map((line) => line.split('').map((val) => parseInt(val))))
      }
      onRun={handleOnRun}
    >
      {data ? <BasinMatrixCanvas matrix={data} scores={scores} /> : <Loading />}
    </ChallengePageLayout>
  )
}

export default Day9
