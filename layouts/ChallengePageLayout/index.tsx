import Footer from 'components/Footer'
import RunButton from 'components/RunButton'
import PlayIcon from 'icons/PlayIcon'
import loadFile from 'lib/loadFile'
import { IOnLoad } from 'lib/types'
import Link from 'next/link'
import { MouseEventHandler, ReactElement, useEffect } from 'react'
import { Container, ItemCanvas, ItemTitle } from './ChallengePageLayout.styles'

interface IOnRun {
  (): void
}

interface IChallengePageLayoutProps {
  title: string | ReactElement
  day: number
  onRun: IOnRun
  onLoadFile: IOnLoad
  children?: any
}

const ChallengePageLayout = ({
  title,
  day,
  onRun,
  onLoadFile,
  children,
}: IChallengePageLayoutProps) => {
  useEffect(() => {
    loadFile(`/data/${day}.txt`, onLoadFile)
  }, [])

  const handleClickEvent: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    ;(e.target as HTMLButtonElement).disabled = true
    onRun()
  }

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
        <RunButton onClick={handleClickEvent} />
      </ItemTitle>
      <ItemCanvas>{children}</ItemCanvas>
      <Footer />
    </Container>
  )
}

export default ChallengePageLayout
