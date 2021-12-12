import { NumbersMatrix } from 'lib/types'
import { BasinMatrixContainer, BasinPoint } from './BasinMatrix.styles'

const BasinMatrix = ({ matrix }: { matrix: NumbersMatrix }) => {
  return (
    <BasinMatrixContainer width={matrix.length ? matrix[0].length : 0}>
      {matrix.map((line, y) =>
        line.map((value, x) => <BasinPoint key={`${x}:${y}`} value={value} />)
      )}
    </BasinMatrixContainer>
  )
}

export default BasinMatrix
