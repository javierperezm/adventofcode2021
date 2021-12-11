import styled from 'styled-components'

export const ScoresList = styled.dl`
  margin: 0 0 25px 0;
  height: 25px;
  display: flex;
  gap: 25px;
`
export const ScoresTitle = styled.dt`
  margin: 0;
  display: inline-block;
  height: 1em;
  line-height: 1em;
  font-size: 25px;
`
interface IScoresValueProps {
  color: string
}
export const ScoresValue = styled.dd<IScoresValueProps>`
  margin: 0;
  display: inline-block;
  height: 1em;
  line-height: 1em;
  font-size: 25px;
  min-width: 6em;
  color: ${(p) => (p.color ? p.color : 'inherit')};
`
