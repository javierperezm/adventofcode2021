import { NumbersMatrix } from 'lib/types'
import styled from 'styled-components'
import { GradientColors } from 'styles/theme'

interface IMatrixGridProps {
  matrix: NumbersMatrix
}
const MatrixGrid = ({ matrix }: IMatrixGridProps) => {
  const width = matrix[0] ? matrix[0].length : 0
  const height = matrix.length

  return (
    <MatrixContainer width={width} height={height}>
      {matrix.map((line, y) =>
        line.map((value, x) => {
          return (
            <MatrixElement key={y * line.length + x} value={value}>
              {value}
            </MatrixElement>
          )
        })
      )}
    </MatrixContainer>
  )
}

export default MatrixGrid

interface IMatrixContainerProps {
  width: number
  height: number
}
const MatrixContainer = styled.div<IMatrixContainerProps>`
  display: grid;
  grid-template-columns: repeat(${(p) => p.width}, 10px);
  grid-template-rows: repeat(${(p) => p.height}, 10px);
  gap: 0px;
`

interface IMatrixElementProps {
  value: number
}
const MatrixElement = styled.div<IMatrixElementProps>`
  font-size: 0.75rem;
  color: transparent;
  background-color: ${(p) => GradientColors[p.value]};
`
