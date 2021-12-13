import styled from 'styled-components'

export const Container = styled.div`
  text-align: center;
  width: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`

export const HomeTitle = styled.h1`
  margin: 0 0 50px;
`

/* dowStart: */
/* 1: 1st is monday */
/* 2: 1st is tuesday */
export const Calendar = styled.div<{ dowStart: number }>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  & span:first-child {
    grid-column: ${(p) => p.dowStart};
  }
`

export const CalendarDay = styled.span`
  font-size: 1.5em;
  padding: 15px 5px;
`

export const Main = styled.main``
