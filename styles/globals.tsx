import { createGlobalStyle } from 'styled-components'
import { colors } from './theme'

export const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'Digital Mono';
  src:  url('/fonts/digital-7-mono.ttf');
}

html,
body {
  padding: 0;
  margin: 0;
  font-family: "Source Code Pro", monospace;
    background: ${colors.background};
    color: ${colors.primaryText}
}

a {
  color: ${colors.primaryLink};
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: ${colors.hoverLink};
  }
}

h1 {

    & > a {
        color: ${colors.boldLink};
        text-shadow: 0 0 2px ${colors.boldLink}, 0 0 5px ${colors.boldLink}
    }
}

h2 {
    color: ${colors.boldText};
}

* {
  box-sizing: border-box;
}
`
