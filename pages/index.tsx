import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Advent Of Code 2021 - Javier Pérez</title>
        <meta name="description" content="Advent Of Code 2021 - Javier Pérez" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Table>
          {['09', '10'].map((day) => (
            <React.Fragment key={day}>
              <Link href={`${day}-1`}>
                <a>Day {parseInt(day)} (I)</a>
              </Link>
              <Link href={`${day}-2`}>
                <a>Day {parseInt(day)} (II)</a>
              </Link>
              <a
                href={`https://adventofcode.com/2021/day/${parseInt(day)}`}
                target="_blank"
                rel="noreferrer"
              >
                instructions
              </a>
            </React.Fragment>
          ))}
        </Table>
      </main>

      <footer></footer>
    </div>
  )
}

const Table = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 300px);
  grid-template-rows: repeat(999, 40px);
`

export default Home
