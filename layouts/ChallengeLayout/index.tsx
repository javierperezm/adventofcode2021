import Link from 'next/link'
import { ReactElement } from 'react'
import {
  Container,
  ItemCanvas,
  ItemLogPanel,
  ItemTitle,
} from './ChallengeLayout.styles'

interface IChallengeLayoutProps {
  title: string | ReactElement
  day: number
  canvas?: any
  children?: any
}

const ChallengeLayout = ({
  title,
  day,
  canvas,
  children,
}: IChallengeLayoutProps) => {
  return (
    <Container>
      <ItemTitle>
        <Link href="/">
          <a>&laquo;</a>
        </Link>
        &nbsp;
        <span>Day {day}: </span>
        <a
          href={`https://adventofcode.com/2021/day/${day}`}
          target="_blank"
          rel="noreferrer"
        >
          {title}
        </a>
      </ItemTitle>
      <ItemCanvas>{canvas}</ItemCanvas>
      <ItemLogPanel>{children}</ItemLogPanel>
    </Container>
  )
}

export default ChallengeLayout
