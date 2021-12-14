import calculateMatrixSize from 'lib/calculateMatrixSize'
import { IPoint, ISize } from 'lib/types'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'

interface ICanvasContainerProps {
  points: IPoint[]
  canvasSize: ISize
}
const CanvasContainer = ({ points, canvasSize }: ICanvasContainerProps) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = (canvasRef.current as HTMLCanvasElement).getContext(
        '2d'
      ) as CanvasRenderingContext2D

      ctx.beginPath()
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, canvasSize.width, canvasSize.height)
      ctx.fill()

      const newSize = calculateMatrixSize(points)
      const pixelWidth = Math.floor(canvasSize.width / newSize.width)
      const pixelHeight = Math.floor(canvasSize.height / newSize.height)
      const pixelSize = Math.min(pixelWidth, pixelHeight)

      // TODO: move to center & zoom

      points.forEach((point) => {
        ctx.beginPath()
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(
          point.x * pixelSize,
          point.y * pixelSize,
          pixelSize,
          pixelSize
        )
        ctx.fill()
      })
    }
  }, [points])

  return (
    <Canvas
      ref={canvasRef}
      width={canvasSize.width}
      height={canvasSize.height}
    />
  )
}

const Canvas = styled.canvas`
  border: 1px dotted #ffffff;
`

export default CanvasContainer
