import IScores from 'days/9/lib/IScores'
import { NumbersMatrix } from 'lib/types'
import BasinMatrix from '../BasinMatrix'
import ScoresUI from '../ScoresUI'

interface IBasinMatrixCanvasProps {
  matrix: NumbersMatrix
  scores: IScores
}
const BasinMatrixCanvas = ({ matrix, scores }: IBasinMatrixCanvasProps) => {
  return (
    <div>
      <ScoresUI scores={scores} />
      <BasinMatrix matrix={matrix} />
    </div>
  )
}

export default BasinMatrixCanvas
