import { Flex, Typography } from 'antd'
import { useRouter } from 'next/navigation'
import MainLogo from 'public/Logo.png'
import React, { ImgHTMLAttributes } from 'react'

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  isLabel?: boolean
}

export const Logo: React.FC<Props> = ({
  height = 50,
  isLabel = false,
  style,
  ...props
}) => {
  const router = useRouter()

  const goTo = (url: string) => {
    router.push(url)
  }

  return (
    <Flex align="center" gap={10}>
      <img
        src={MainLogo.src}
        {...props}
        alt="Logo"
        height={height}
        style={{
          borderRadius: '5px',
          cursor: 'pointer',
          objectFit: 'contain',
          height: `${height}px`,
          ...style,
        }}
        onClick={() => goTo('/home')}
      />
      {isLabel && (
        <Typography.Title level={4} style={{ margin: '0px' }}>
          Geno.AI
        </Typography.Title>
      )}
    </Flex>
  )
}
