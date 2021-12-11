import { IScores } from 'days/11/lib/IScores'
import FireworkIcon from 'icons/FireworkIcon'
import FlashIcon from 'icons/FlashIcon'
import HundredIcon from 'icons/HundredIcon'
import StepsIcon from 'icons/StepsIcon'
import { colors } from 'styles/theme'
import { ScoresList, ScoresTitle, ScoresValue } from './ScoresUI.styles'

const ScoresUI = ({ scores }: { scores: IScores }) => {
  return (
    <div>
      <ScoresList>
        <ScoresTitle>
          <StepsIcon title="total steps" />
        </ScoresTitle>
        <ScoresValue>{scores.steps}</ScoresValue>

        <ScoresTitle>
          <FlashIcon title="total flashes" />
        </ScoresTitle>
        <ScoresValue>{scores.flashes}</ScoresValue>

        {scores.totalFlashesAt100 ? (
          <>
            <ScoresTitle>
              <HundredIcon title="total flashes at 100 steps" />
            </ScoresTitle>
            <ScoresValue color={colors.star}>
              {scores.totalFlashesAt100}
            </ScoresValue>
          </>
        ) : null}

        {scores.stepsAllFlashed ? (
          <>
            <ScoresTitle>
              <FireworkIcon title="steps until all octopus flashed" />
            </ScoresTitle>
            <ScoresValue color={colors.star}>
              {scores.stepsAllFlashed}
            </ScoresValue>
          </>
        ) : null}
      </ScoresList>
    </div>
  )
}

export default ScoresUI
