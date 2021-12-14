import Loading from 'components/Loading'
import ScoreDigital from 'components/ScoreDigital'
import ChallengePageLayout from 'layouts/ChallengePageLayout'
import { IStringStringMap } from 'lib/types'
import { NextPage } from 'next'
import { useState } from 'react'
import { colors } from 'styles/theme'
import Polymer, { IPolymerStepResults } from './lib/Polymer'

const INTERVAL_TICK = 50

interface IScore {
  step: number
  result: number
}

const Day14: NextPage = () => {
  const [polymer, setPolymer] = useState<Polymer>()
  const [results, setResults] = useState<IPolymerStepResults>()
  const [scores, setScores] = useState<IScore[]>([])

  const handleOnLoad = (data: string[]): void => {
    const polymerChain: string = data.shift() as string
    data.shift()

    const insertionRules: IStringStringMap = {}
    data.forEach((line) => {
      const [molecule, atom] = line.split(' -> ')
      insertionRules[molecule] = atom
    })

    setPolymer(new Polymer(polymerChain, insertionRules))
  }

  const handleOnRun = () => {
    const interval = setInterval(() => {
      const results = polymer?.doStep()

      setResults(results)

      if (results?.step === 10 || results?.step === 40) {
        setScores((scores) => [
          ...scores,
          { step: results.step, result: results.result },
        ])
        if (results?.step === 40) clearInterval(interval)
      }
    }, INTERVAL_TICK)
  }

  return (
    <ChallengePageLayout
      day={14}
      title="Extended Polymerization"
      onRun={handleOnRun}
      onLoadFile={handleOnLoad}
    >
      {polymer ? (
        <>
          <ScoreDigital
            score={(results?.result as number) ?? 0}
            title={`processor : step ${results?.step ?? 0}`}
            digits={13}
          />

          {scores.map((score, idx) => (
            <ScoreDigital
              key={idx}
              score={score.result}
              title={`Step ${score.step}`}
              digits={13}
              color={colors.primaryLink}
              bright={true}
            />
          ))}
        </>
      ) : (
        <Loading />
      )}
    </ChallengePageLayout>
  )
}

export default Day14
