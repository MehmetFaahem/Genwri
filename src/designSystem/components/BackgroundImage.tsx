import Image, { StaticImageData } from 'next/image'

export const BackgroundImage = ({ src }: { src: StaticImageData }) => {
  return (
    <Image
      src={src}
      alt="Background"
      fill
      className="object-cover opacity-100 blur-sm brightness-50 scale-105"
      style={{
        animation: 'zoomInOut 30s infinite ease-in-out',
      }}
    />
  )
}

const styles = `
  @keyframes zoomInOut {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
`

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.type = 'text/css'
  styleSheet.innerText = styles
  document.head.appendChild(styleSheet)
}
