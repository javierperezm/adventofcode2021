import styled from 'styled-components'
import { GradientColors } from 'styles/theme'

export const MatrixLayout = styled.div`
  display: flex;
`

interface IMatrixContainerProps {
  width: number
  height: number
}
export const MatrixContainer = styled.div<IMatrixContainerProps>`
  display: grid;
  grid-template-columns: repeat(${(p) => p.width}, 10px);
  grid-template-rows: repeat(${(p) => p.height}, 10px);
  gap: 0px;
`

interface IMatrixElementProps {
  height: number
}
export const MatrixElement = styled.div<IMatrixElementProps>`
  font-size: 0.75rem;
  color: transparent;
  background-color: ${(p) => GradientColors[p.height]};
`
