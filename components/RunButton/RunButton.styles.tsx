import styled from 'styled-components'
import { colors } from 'styles/theme'

export const Button = styled.button`
  padding: 5px 15px;
  cursor: pointer;
  border: 0;
  background-color: ${colors.primaryLink};
  font-size: 1em;
  line-height: 1em;
  margin-left: 25px;
  font-family: 'Source Code Pro', monospace;

  &:hover {
    background-color: ${colors.hoverLink};
  }

  &:disabled {
    background-color: ${colors.background};
    color: ${colors.disabledText};
    cursor: default;
  }
`
