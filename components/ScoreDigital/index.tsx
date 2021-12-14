import { colors } from 'styles/theme'
import { Container, Score, Title } from './ScoreDigital.styles'

interface IScoreDigitalProps {
  score: number
  title: string
  digits?: number
  color?: string | null
  bright?: boolean
}

export default function ScoreDigital({
  score,
  title,
  digits = 6,
  color = null,
  bright = false,
}: IScoreDigitalProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <Score
        digits={Math.floor(digits / 2)}
        color={color ?? colors.primaryText}
        bright={bright}
      >
        <span className="disabled">
          {Array.from(
            { length: digits - (score + '').length },
            (_) => '0'
          ).join('')}
        </span>
        <span>{score}</span>
      </Score>
    </Container>
  )
}
