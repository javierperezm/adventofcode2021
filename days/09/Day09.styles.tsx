import styled from 'styled-components'

export const PanelContainer = styled.div`
  display: grid;
  gap: 25px;
  padding: 25px;
  grid-template-columns: auto 100px;
  grid-auto-rows: 1.5rem;
`

export const Result = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  font-family: 'Courier New', Courier, monospace;
  text-align: right;
`
