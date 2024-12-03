import Image, { StaticImageData } from 'next/image'

export const BackgroundImage = ({ src }: { src: StaticImageData }) => {
  return (
    <Image
      src={src}
      alt="Background"
      fill
      className="object-cover opacity-100 blur-lg brightness-50"
      style={{
        animation: 'zoomInOut 30s infinite ease-in-out',
        transform: 'scale(1.05)', // Slightly scale to avoid edge artifacts
      }}
    />
  )
}

const styles = `
  @keyframes zoomInOut {
    0%, 100% {
      transform: scale(1.05); /* Match the initial scale */
    }
    50% {
      transform: scale(1.15); /* Add a slight zoom effect */
    }
  }
`

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.type = 'text/css'
  styleSheet.innerText = styles
  document.head.appendChild(styleSheet)
}
