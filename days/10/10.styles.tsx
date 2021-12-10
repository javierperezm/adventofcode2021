import styled from 'styled-components'
import { colors } from 'styles/theme'

export const Button = styled.button`
  padding: 25px;
  cursor: pointer;
  border: 0;
  background-color: ${colors.primaryLink};

  &:hover {
    background-color: ${colors.hoverLink};
  }

  &:disabled {
    background-color: ${colors.background};
    color: ${colors.primaryText};
    cursor: default;
  }
`
