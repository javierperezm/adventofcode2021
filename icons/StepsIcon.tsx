export default function StepsIcon({ title }: { title?: string }) {
  return (
    <img
      src="/icons/man-climbing-stairs.png"
      alt="steps"
      style={{ filter: 'invert(1)', height: '25px' }}
      title={title}
    />
  )
}
