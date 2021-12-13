import { IScores } from 'days/12/lib/types'
import styled from 'styled-components'
import { colors } from 'styles/theme'

interface ICavesPathsCanvasProps {
  scores: IScores
}
const CavesPathsCanvas = ({ scores }: ICavesPathsCanvasProps) => {
  return (
    <>
      <Score>
        <ScoreTitle>part I</ScoreTitle>
        <ScoreDigital>{scores.part1}</ScoreDigital>

        <ScoreTitle>part II</ScoreTitle>
        <ScoreDigital>{scores.part2}</ScoreDigital>
      </Score>
    </>
  )
}

const Score = styled.dl``
const ScoreTitle = styled.dt``

const ScoreDigital = styled.dd`
  font-family: 'Digital Mono';
  font-size: 3em;
  margin: 0 0 25px;
  background: black;
  padding: 15px 30px;
  min-width: 6em;
  text-align: right;
  display: inline-block;
`

export default CavesPathsCanvas
