import styled from 'styled-components'
import { GradientColors } from 'styles/theme'

interface IBasinMatrixContainerProps {
  width: number
}
export const BasinMatrixContainer = styled.div<IBasinMatrixContainerProps>`
  display: grid;
  grid-template-columns: repeat(${(p) => p.width}, 5px);
  grid-auto-rows: 5px;
  gap: 1px;
`

interface IBasinPointProps {
  value: number
}
export const BasinPoint = styled.span<IBasinPointProps>`
  display: inline-block;
  background-color: ${(p) => GradientColors[p.value]};
`
