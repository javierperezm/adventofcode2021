import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
export const Title = styled.div``

interface IScoreProps {
  digits: number
  color: string
  bright: boolean
}
export const Score = styled.div<IScoreProps>`
  font-family: 'Digital Mono';
  font-size: 50px;
  margin: 0 0 25px;
  color: ${(p) => p.color};
  background: black;
  padding: 15px 30px;
  min-width: ${(p) => p.digits}em;
  text-align: right;
  display: inline-block;
  ${(p) =>
    p.bright ? `text-shadow: 0 0 2px ${p.color}, 0 0 5px ${p.color};` : ''}

  > .disabled {
    color: #333;
    text-shadow: none;
  }
`
