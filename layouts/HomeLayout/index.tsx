import Footer from 'components/Footer'
import Head from 'next/head'
import Link from 'next/link'
import {
  Calendar,
  CalendarDay,
  Container,
  HomeTitle,
  Main,
} from './HomeLayout.styles'

interface IHomeLayoutProps {
  availableDays: number[]
}
const HomeLayout = ({ availableDays }: IHomeLayoutProps) => {
  return (
    <Container>
      <Head>
        <title>Advent Of Code 2021 - Javier Pérez</title>
        <meta name="description" content="Advent Of Code 2021 - Javier Pérez" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <HomeTitle>
          <a
            href="https://adventofcode.com/2021/"
            target="_blank"
            rel="noreferrer"
          >
            Advent Of Code
          </a>
        </HomeTitle>

        <Calendar dowStart={3}>
          {Array.from({ length: 25 }, (_, i) => i + 1).map((day) => {
            return (
              <CalendarDay key={day}>
                {availableDays.includes(day) ? (
                  <Link href={`/${day}`}>
                    <a>{day}</a>
                  </Link>
                ) : (
                  day
                )}
              </CalendarDay>
            )
          })}
        </Calendar>
      </Main>

      <Footer />
    </Container>
  )
}

export default HomeLayout
