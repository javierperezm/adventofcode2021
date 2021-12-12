import { ScoresList, ScoresTitle, ScoresValue } from 'components/Scores'
import IScores from 'days/9/lib/IScores'
import StepsIcon from 'icons/StepsIcon'

const ScoresUI = ({ scores }: { scores: IScores }) => {
  return (
    <div>
      <ScoresList>
        <ScoresTitle>
          <StepsIcon title="risk levels sum" />
        </ScoresTitle>
        <ScoresValue>{scores.riskLevelsSum}</ScoresValue>

        <ScoresTitle>
          <StepsIcon title="three largest basins" />
        </ScoresTitle>
        <ScoresValue>{scores.threeLargestBasins}</ScoresValue>
      </ScoresList>
    </div>
  )
}

export default ScoresUI
