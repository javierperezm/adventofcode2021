import { IOnLoad } from './types'

export const loadFile = (filename: string, onLoad: IOnLoad) => {
  fetch(filename).then((response) =>
    response.text().then((text) => onLoad(text.split('\n')))
  )
}
