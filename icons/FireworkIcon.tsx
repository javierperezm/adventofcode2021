export default function FireworkIcon({ title }: { title?: string }) {
  return (
    <img
      src="/icons/firework.png"
      alt="steps"
      style={{ filter: 'invert(1)', height: '25px' }}
      title={title}
    />
  )
}
