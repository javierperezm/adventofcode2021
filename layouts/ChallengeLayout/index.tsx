import { ReactElement } from 'react'
import {
  Container,
  ItemCanvas,
  ItemLogPanel,
  ItemTitle,
} from './ChallengeLayout.styles'

interface IChallengeLayoutProps {
  title: string | ReactElement
  canvas?: any
  children?: any
}

const ChallengeLayout = ({
  title,
  canvas,
  children,
}: IChallengeLayoutProps) => {
  return (
    <Container>
      <ItemTitle>{title}</ItemTitle>
      <ItemCanvas>{canvas}</ItemCanvas>
      <ItemLogPanel>{children}</ItemLogPanel>
    </Container>
  )
}

export default ChallengeLayout
