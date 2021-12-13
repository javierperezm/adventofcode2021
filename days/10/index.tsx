import ActionButton from 'components/ActionButton'
import ChallengeLayout from 'layouts/ChallengeLayout'
import loadFile from 'lib/loadFile'
import type { NextPage } from 'next'
import { MouseEventHandler, useEffect, useState } from 'react'
import ChunksCanvas from './components/ChunkCanvas'
import { ChunksProcessor } from './lib/ChunkProcessor'
import { IStringChunk } from './types'

const Day10: NextPage = () => {
  const [chunks, setChunks] = useState<ChunksProcessor>()
  const [stringChunks, setStringChunks] = useState<IStringChunk[]>([])
  const filename = '/10.txt'

  useEffect(() => {
    loadFile(filename, (data) => setChunks(new ChunksProcessor(data)))
  }, [filename])

  const handleCorruptedClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    ;(e.target as HTMLButtonElement).disabled = true
    ;(chunks as ChunksProcessor).start(setStringChunks)
  }

  return (
    <ChallengeLayout
      title="Syntax Scoring"
      day={10}
      canvas={chunks ? <ChunksCanvas stringChunks={stringChunks} /> : <div />}
    >
      <ActionButton onClick={handleCorruptedClick}>START</ActionButton>
    </ChallengeLayout>
  )
}

export default Day10
