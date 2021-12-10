import { IStringChunk } from 'days/10/types'
import { useEffect, useRef } from 'react'
import {
  CanvasContainer,
  ChunkStringCorrupted,
  ChunkStringCurrent,
  ChunkStringProcessed,
} from './ChunkCanvas.styles'

interface ICanvasProps {
  stringChunks: IStringChunk[]
}
const ChunksCanvas = ({ stringChunks }: ICanvasProps) => {
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvasElement = canvasRef.current as HTMLDivElement
    if (canvasElement) {
      const containerElement = canvasElement.parentElement
      if (containerElement) {
        containerElement.scrollTop = containerElement.scrollHeight
      }
    }
  }, [stringChunks.length])

  return (
    <CanvasContainer ref={canvasRef}>
      {stringChunks.map((chunk, idx) => (
        <dl key={idx}>
          <dt>{idx}</dt>
          <dd>
            <ChunkStringProcessed>{chunk.processed}</ChunkStringProcessed>
            <ChunkStringCurrent>{chunk.current}</ChunkStringCurrent>
            <ChunkStringCorrupted>{chunk.corrupted}</ChunkStringCorrupted>
          </dd>
        </dl>
      ))}
    </CanvasContainer>
  )
}

export default ChunksCanvas
