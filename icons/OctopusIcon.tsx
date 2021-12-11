interface IOctopusIconProps {
  energy: number
}
export default function OctopusIcon({ energy }: IOctopusIconProps) {
  let filter = ''

  if (energy <= 9) {
    // normal
    const brightness = (energy + 1) / 10
    filter = `brightness(${brightness}) grayscale(1)`
  }

  return (
    <img
      src="/icons/octopus.png"
      alt={`${energy}`}
      style={{ filter: filter, height: '25px', transition: 'filter .25s' }}
    />
  )
}
