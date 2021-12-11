import styled from 'styled-components'

export const ItemTitle = styled.h1`
  grid-area: title;
  padding: 0;
  margin: 0;
`
export const ItemCanvas = styled.div`
  grid-area: canvas;
  height: 100%;
  min-height: 250px;
  overflow-y: scroll;
  display: inline-block;
`
export const ItemLogPanel = styled.div`
  grid-area: logpanel;
`

export const Container = styled.main`
  padding: 25px;
  display: grid;
  gap: 25px;
  grid-template:
    'title title'
    'canvas logpanel'
    / 1fr auto;
  grid-template-rows: auto 1fr;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`
