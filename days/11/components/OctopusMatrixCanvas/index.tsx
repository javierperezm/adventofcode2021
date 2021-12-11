import { IScores } from 'days/11/lib/IScores'
import { NumbersMatrix } from 'lib/types'
import OctopusMatrix from '../OctopusMatrix'
import ScoresUI from '../ScoresUI'

interface IOctopusMatrixCanvasProps {
  matrix: NumbersMatrix
  scores: IScores
}
const OctopusMatrixCanvas = ({ matrix, scores }: IOctopusMatrixCanvasProps) => {
  return (
    <div>
      <ScoresUI scores={scores} />
      <OctopusMatrix matrix={matrix} />
    </div>
  )
}

export default OctopusMatrixCanvas
