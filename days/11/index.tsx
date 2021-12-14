import ActionButton from 'components/ActionButton'
import Loading from 'components/Loading'
import ChallengeLayout from 'layouts/ChallengeLayout'
import ChallengePageLayout from 'layouts/ChallengePageLayout'
import loadFile from 'lib/loadFile'
import { NumbersMatrix } from 'lib/types'
import { NextPage } from 'next'
import { MouseEventHandler, useEffect, useState } from 'react'
import OctopusMatrixCanvas from './components/OctopusMatrixCanvas'
import { IScores } from './lib/IScores'
import { Stepper } from './lib/Stepper'

const TICKER_MILISECONDS = 200
const MAX_STEPS = 999

const Day11: NextPage = () => {
  const [matrix, setMatrix] = useState<NumbersMatrix>()
  const [scores, setScores] = useState<IScores>({
    steps: 0,
    flashes: 0,
    totalFlashesAt100: 0,
    stepsAllFlashed: 0,
  })

  const handleOnRun = () => {
    let newScores: IScores = scores
    let matrixData: NumbersMatrix = matrix as NumbersMatrix

    const interval = setInterval(() => {
      const stepper = new Stepper(matrixData)
      const stepFlashes = stepper.nextStep()

      newScores = {
        steps: newScores.steps + 1,
        flashes: newScores.flashes + stepFlashes,
        totalFlashesAt100: newScores.totalFlashesAt100,
        stepsAllFlashed: newScores.stepsAllFlashed,
      }
      if (newScores.steps === 100) {
        newScores.totalFlashesAt100 = newScores.flashes
      }
      if (
        stepFlashes === stepper.getMatrixSize() &&
        !newScores.stepsAllFlashed
      ) {
        newScores.stepsAllFlashed = newScores.steps
      }
      setScores(newScores)

      if (newScores.steps === MAX_STEPS || newScores.stepsAllFlashed > 0) {
        clearInterval(interval)
      }
    }, TICKER_MILISECONDS)
  }

  return (
    <ChallengePageLayout
      day={11}
      title="Dumbo Octopus"
      onLoadFile={(data) =>
        setMatrix(
          data.map((line) => line.split('').map((val) => parseInt(val)))
        )
      }
      onRun={handleOnRun}
    >
      {matrix ? (
        <OctopusMatrixCanvas matrix={matrix} scores={scores} />
      ) : (
        <Loading />
      )}
    </ChallengePageLayout>
  )
}

export default Day11
