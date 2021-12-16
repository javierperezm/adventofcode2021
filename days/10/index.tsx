import ChallengePageLayout from 'layouts/ChallengePageLayout'
import type { NextPage } from 'next'
import { useState } from 'react'
import ChunksCanvas from './components/ChunkCanvas'
import { ChunksProcessor } from './lib/ChunkProcessor'
import { IStringChunk } from './types'

const Day10: NextPage = () => {
  const [chunks, setChunks] = useState<ChunksProcessor>()
  const [stringChunks, setStringChunks] = useState<IStringChunk[]>([])

  const handleOnRun = () => {
    ;(chunks as ChunksProcessor).start(setStringChunks)
  }

  return (
    <ChallengePageLayout
      title="Syntax Scoring"
      day={10}
      onRun={handleOnRun}
      onLoadFile={(data) => setChunks(new ChunksProcessor(data))}
    >
      {chunks ? <ChunksCanvas stringChunks={stringChunks} /> : <div />}
    </ChallengePageLayout>
  )
}

export default Day10
