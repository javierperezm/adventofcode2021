import Loading from 'components/Loading'
import ChallengePageLayout from 'layouts/ChallengePageLayout'
import { NextPage } from 'next'
import { useState } from 'react'
import CavesPathsCanvas from './components/CavesPathsCanvas'
import dataLoader from './lib/dataLoader'
import { ICaveNodesList, IScores } from './lib/types'

const Day12: NextPage = () => {
  const [nodes, setNodes] = useState<ICaveNodesList>()
  const [scores, setScores] = useState<IScores>({
    part1: 0,
    part2: 0,
  })

  const launchWorker = (exception: boolean, pathsPerMessage: number) => {
    setTimeout(() => {
      const worker = new Worker('./workers/12.js')
      worker.onmessage = (msg) => {
        setScores((prevState) => ({
          part1: msg.data.exception ? prevState.part1 : msg.data.paths,
          part2: msg.data.exception ? msg.data.paths : prevState.part2,
        }))
      }
      worker.postMessage({ nodes, exception, pathsPerMessage })
    }, 0)
  }

  const handleStartClick = () => {
    launchWorker(false, 1)
    launchWorker(true, 37)
  }

  return (
    <ChallengePageLayout
      day={12}
      title="Passage Pathing"
      onRun={handleStartClick}
      onLoadFile={(data) => setNodes(dataLoader(data))}
    >
      {nodes ? <CavesPathsCanvas scores={scores} /> : <Loading />}
    </ChallengePageLayout>
  )
}

export default Day12
