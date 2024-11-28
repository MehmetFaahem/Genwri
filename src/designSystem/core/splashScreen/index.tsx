import { BackgroundImage } from '@/designSystem/components/BackgroundImage'
import { LoadingOutlined } from '@ant-design/icons'
import { Layout, Spin } from 'antd'
import React, { useEffect, useState } from 'react'

import pictureUrl from '/public/bg.jpg'

export const MrbSplashScreen: React.FC = () => {
  const [isPageInitialised, setPageInitialised] = useState(false)

  useEffect(() => {
    setPageInitialised(true)
  }, [])

  if (!isPageInitialised) {
    return null
  }

  return (
    <Layout
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <BackgroundImage src={pictureUrl} />
      <Spin
        indicator={<LoadingOutlined spin />}
        size="large"
        style={{ color: '#ffffff' }}
      />
    </Layout>
  )
}
