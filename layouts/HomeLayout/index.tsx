import Head from 'next/head'
import Link from 'next/link'
import {
  Calendar,
  CalendarDay,
  Footer,
  HomeTitle,
  Main,
} from './HomeLayout.styles'

const HomeLayout = () => {
  const availableDays = [10]

  return (
    <div>
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

      <Footer>
        <h4>
          2021{' '}
          <a
            href="https://github.com/javierperezm/"
            target="_blank"
            rel="noreferrer"
          >
            Javier Pérez
          </a>
        </h4>
      </Footer>
    </div>
  )
}

export default HomeLayout
