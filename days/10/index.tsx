import ChallengeLayout from 'layouts/ChallengeLayout'
import type { NextPage } from 'next'
import Link from 'next/link'
import { MouseEventHandler, useEffect, useState } from 'react'
import { Button } from './10.styles'
import ChunksCanvas from './components/ChunkCanvas'
import { ChunksProcessor } from './lib/ChunkProcessor'
import { loadFile } from './lib/loadFile'
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
      title={
        <>
          <Link href="/">
            <a>&laquo;</a>
          </Link>
          <span> Day 10: </span>
          <a
            href="https://adventofcode.com/2021/day/10"
            target="_blank"
            rel="noreferrer"
          >
            Syntax Scoring
          </a>
        </>
      }
      canvas={chunks ? <ChunksCanvas stringChunks={stringChunks} /> : <div />}
    >
      <Button onClick={handleCorruptedClick}>START</Button>
    </ChallengeLayout>
  )
}

export default Day10
