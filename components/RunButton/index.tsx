import PlayIcon from 'icons/PlayIcon'
import { Button } from './RunButton.styles'

export default function RunButton({
  onClick,
}: React.HTMLProps<HTMLButtonElement>) {
  return (
    <Button onClick={onClick}>
      <PlayIcon /> RUN
    </Button>
  )
}
