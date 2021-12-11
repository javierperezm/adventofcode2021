import OctopusIcon from 'icons/OctopusIcon'
import { NumbersMatrix } from 'lib/types'
import { OctopusMatrixContainer } from './OctopusMatrix.styles'

const OctopusMatrix = ({ matrix }: { matrix: NumbersMatrix }) => {
  return (
    <OctopusMatrixContainer>
      {matrix.map((line, y) =>
        line.map((energy, x) => (
          <OctopusIcon key={`${x}:${y}`} energy={energy} />
        ))
      )}
    </OctopusMatrixContainer>
  )
}

export default OctopusMatrix
