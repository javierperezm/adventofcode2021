import styled from 'styled-components'
import { colors } from 'styles/theme'

export const ChunkStringProcessed = styled.span`
  color: ${colors.primaryText};
`
export const ChunkStringCurrent = styled.span`
  font-weight: bold;
  font-size: 1.25em;
  color: ${colors.boldLink};
  text-shadow: 0 0 2px ${colors.boldLink}, 0 0 5px ${colors.boldLink};
`
export const ChunkStringCorrupted = styled.span`
  color: ${colors.errorText};
`

export const CanvasContainer = styled.div`
  width: 100%;
  line-height: 18px;

  & dl {
    margin: 0;
  }

  & dl dt {
    display: inline-block;
    font-size: 15px;
    color: ${colors.boldText};
    min-width: 2em;
    text-align: right;
  }

  & dl dd {
    font-size: 10px;
    display: inline;
    margin: 0 0 0 1em;
  }
`
