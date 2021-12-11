import { Button } from './ActionButton.styles'

export default function ActionButton({
  children,
  onClick,
}: React.HTMLProps<HTMLButtonElement>) {
  return <Button onClick={onClick}>{children}</Button>
}
