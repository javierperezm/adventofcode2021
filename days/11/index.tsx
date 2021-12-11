import ActionButton from 'components/ActionButton'
import Loading from 'components/Loading'
import ChallengeLayout from 'layouts/ChallengeLayout'
import { loadFile } from 'lib/loadFile'
import { NumbersMatrix } from 'lib/types'
import { NextPage } from 'next'
import { MouseEventHandler, useEffect, useState } from 'react'
import OctopusMatrixCanvas from './components/OctopusMatrixCanvas'
import { IScores } from './lib/IScores'
import { Stepper } from './lib/Stepper'

const TICKER_MILISECONDS = 250
const MAX_STEPS = 999

const Day11: NextPage = () => {
  const [matrix, setMatrix] = useState<NumbersMatrix>()
  const [scores, setScores] = useState<IScores>({
    steps: 0,
    flashes: 0,
    totalFlashesAt100: 0,
    stepsAllFlashed: 0,
  })
  const [tickInterval, setTickInterval] = useState<NodeJS.Timer>()

  useEffect(() => {
    loadFile('/11.txt', (data) => {
      setMatrix(data.map((line) => line.split('').map((val) => parseInt(val))))
    })
  }, [])

  const handleStartClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    ;(e.target as HTMLButtonElement).disabled = true

    let newScores: IScores = scores
    let matrixData: NumbersMatrix = matrix as NumbersMatrix

    const interval = setInterval(() => {
      const stepper = new Stepper(matrixData)
      const stepFlashes = stepper.nextStep()
      setMatrix(stepper.getMatrixData())

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

    setTickInterval(interval)
  }

  return (
    <ChallengeLayout
      day={11}
      title="Dumbo Octopus"
      canvas={
        matrix ? (
          <OctopusMatrixCanvas matrix={matrix} scores={scores} />
        ) : (
          <Loading />
        )
      }
    >
      <ActionButton onClick={handleStartClick}>START</ActionButton>
    </ChallengeLayout>
  )
}

export default Day11
