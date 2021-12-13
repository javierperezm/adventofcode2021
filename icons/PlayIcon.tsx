export default function PlayIcon({ title }: { title?: string }) {
  return (
    <img
      src="/icons/play.png"
      alt="play"
      style={{ filter: 'invert(0)', height: '25px' }}
      title={title}
    />
  )
}
