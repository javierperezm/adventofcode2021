import styled from 'styled-components'
import { colors } from 'styles/theme'

export const HomeTitle = styled.h1`
  text-align: center;
`

/* 1: 1st is monday */
/* 2: 1st is tuesday */
export const Calendar = styled.div<{ dowStart: number }>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin: 0 auto;
  max-width: 750px;
  width: 75%;

  & span:first-child {
    grid-column: ${(p) => p.dowStart};
  }
`

export const CalendarDay = styled.span`
  text-align: center;
  font-size: 1.5em;
`

export const Main = styled.main`
  width: 600px;
  margin: 0 auto;
`

export const Footer = styled.footer`
  width: 600px;
  margin: 0 auto;
  padding: 25px 0;
  text-align: center;
`
