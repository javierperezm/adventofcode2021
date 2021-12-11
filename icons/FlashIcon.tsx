export default function FlashIcon({ title }: { title?: string }) {
  return (
    <img
      src="/icons/flash.png"
      alt="flash"
      style={{ filter: 'invert(1)', height: '25px' }}
      title={title}
    />
  )
}
