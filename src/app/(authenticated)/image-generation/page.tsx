'use client'

import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import {
  DownloadOutlined,
  HistoryOutlined,
  PictureOutlined,
} from '@ant-design/icons'
import { Image as ImageType } from '@prisma/client'
import { Button, Card, Col, Input, Row, Select, Space, Typography } from 'antd'
import { useParams, useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const { Title, Text } = Typography

export default function ImageGenerationPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState<string>('realistic')
  const [theme, setTheme] = useState<string>('modern')
  const [generating, setGenerating] = useState(false)
  const [splashVisible, setSplashVisible] = useState(false)
  const [timer, setTimer] = useState(50)

  // Fetch user's image history
  const { data: images, refetch: refetchImages } = Api.image.findMany.useQuery({
    where: { userId: user?.id },
    orderBy: { createdAt: 'desc' },
  })

  // Mutations
  const createImage = Api.image.create.useMutation()
  const generateImage = Api.ai.generateImage.useMutation()

  const handleGenerate = async () => {
    if (!prompt) {
      enqueueSnackbar('Please enter a description', { variant: 'error' })
      return
    }

    try {
      setGenerating(true)
      setSplashVisible(true)
      const { url } = await generateImage.mutateAsync({ prompt })

      await createImage.mutateAsync({
        data: {
          prompt,
          style,
          theme,
          imageUrl: url,
          status: 'COMPLETED',
          userId: user?.id as string,
        },
      })

      enqueueSnackbar('Image generated successfully!', { variant: 'success' })
      refetchImages()
    } catch (error) {
      enqueueSnackbar('Failed to generate image', { variant: 'error' })
    } finally {
      setGenerating(false)
    }
  }

  useEffect(() => {
    if (splashVisible) {
      const countdown = setInterval(() => {
        setTimer(prev => {
          if (prev === 1) {
            clearInterval(countdown)
            setSplashVisible(false)
            return 50
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(countdown)
    }
  }, [splashVisible])

  const downloadImage = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'generated-image.png'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      enqueueSnackbar('Failed to download image', { variant: 'error' })
    }
  }

  return (
    <>
      <PageLayout layout="narrow">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <Title level={2}>AI Image Generation</Title>
            <Text>
              Create unique images using AI by describing what you want to see
            </Text>
          </div>

          <Card>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Input.TextArea
                placeholder="Describe the image you want to generate..."
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                rows={4}
              />

              <Row gutter={16}>
                <Col xs={24} sm={12} style={{ marginTop: '10px' }}>
                  <Select
                    style={{ width: '100%' }}
                    value={style}
                    onChange={setStyle}
                    options={[
                      { value: 'realistic', label: 'Realistic' },
                      { value: 'cartoon', label: 'Cartoon' },
                      { value: 'abstract', label: 'Abstract' },
                      { value: 'digital-art', label: 'Digital Art' },
                    ]}
                  />
                </Col>
                <Col xs={24} sm={12} style={{ marginTop: '10px' }}>
                  <Select
                    style={{ width: '100%' }}
                    value={theme}
                    onChange={setTheme}
                    options={[
                      { value: 'modern', label: 'Modern' },
                      { value: 'vintage', label: 'Vintage' },
                      { value: 'minimalist', label: 'Minimalist' },
                      { value: 'fantasy', label: 'Fantasy' },
                    ]}
                  />
                </Col>
              </Row>

              <Button
                type="primary"
                icon={<PictureOutlined />}
                onClick={handleGenerate}
                loading={generating}
                block
              >
                Generate Image
              </Button>
            </Space>
          </Card>

          <div>
            <Title level={4}>
              <HistoryOutlined /> Generation History
            </Title>
            <Row gutter={[16, 16]}>
              {images?.map((image: ImageType) => (
                <Col xs={24} sm={12} md={8} key={image.id}>
                  <Card
                    cover={
                      <Zoom>
                        <img
                          alt={image.prompt}
                          src={image.imageUrl}
                          style={{
                            height: 200,
                            objectFit: 'cover',
                            width: '100%',
                          }}
                        />
                      </Zoom>
                    }
                    actions={[
                      <Button
                        key="download"
                        icon={<DownloadOutlined />}
                        onClick={() => downloadImage(image.imageUrl)}
                      >
                        Download
                      </Button>,
                    ]}
                  >
                    <Card.Meta
                      title={image.prompt}
                      description={
                        <Space>
                          {image.style && (
                            <Text type="secondary">Style: {image.style}</Text>
                          )}
                          {image.theme && (
                            <Text type="secondary">Theme: {image.theme}</Text>
                          )}
                        </Space>
                      }
                    />
                  </Card>
                </Col>
              ))}
              {images?.length === 0 && (
                <Col xs={24}>
                  <Text>No images generated yet</Text>
                </Col>
              )}
            </Row>
          </div>
        </Space>
      </PageLayout>
      <div
        style={{
          display: splashVisible ? 'flex' : 'none',
          height: '100vh',
          width: '100vw',
          backgroundColor: 'white',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1000,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <Text style={{ fontSize: '6rem' }}>
            {`00:${timer < 10 ? `0${timer}` : timer}`}
          </Text>
          <Title level={3} style={{ color: 'GrayText', paddingInline: '20px' }}>
            Please be patient, I&apos;m generating something amazing
          </Title>
        </div>
      </div>
    </>
  )
}
