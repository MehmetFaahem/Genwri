'use client'

import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import {
  DownloadOutlined,
  EyeOutlined,
  HistoryOutlined,
  PictureOutlined,
} from '@ant-design/icons'
import { Image as ImageType } from '@prisma/client'
import { Card, Col, Row, Space, Typography } from 'antd'
import { useParams, useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useCallback, useEffect, useState } from 'react'
import { Controlled as ControlledZoom } from 'react-medium-image-zoom'
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
  const [timer, setTimer] = useState(20)
  const [zoomedImages, setZoomedImages] = useState<{ [key: string]: boolean }>(
    {},
  )
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<{
    prompt: string
    url: string
  } | null>(null)
  const [loading, setLoading] = useState(true)

  const handleZoomChange = useCallback(
    (shouldZoom: boolean, imageId: string) => {
      setZoomedImages(prev => ({
        ...prev,
        [imageId]: shouldZoom,
      }))
    },
    [],
  )

  // Fetch user's image history
  const {
    data: images,
    refetch: refetchImages,
    isLoading,
  } = Api.image.findMany.useQuery({
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
            return 20
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
      a.download = `generated-image-from-genoai-${Date.now()}.png`
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
        <Title level={2} style={{ color: '#ffffff' }}>
          <PictureOutlined /> AI Image Generation
        </Title>
        <Text style={{ color: '#ffffff' }}>
          Create unique images using AI by describing what you want to see
        </Text>

        <Card
          style={{ marginTop: 24, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <textarea
              placeholder="Describe the image you want to generate..."
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              rows={4}
              className="w-full bg-gray-700/50 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />

            <Row gutter={16}>
              <Col xs={24} sm={12} style={{ marginTop: '10px' }}>
                <select
                  style={{ width: '100%' }}
                  value={style}
                  onChange={e => setStyle(e.target.value)}
                  className="w-full bg-gray-700/50 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                >
                  <option value="realistic">Realistic</option>
                  <option value="cartoon">Cartoon</option>
                  <option value="abstract">Abstract</option>
                  <option value="digital-art">Digital Art</option>
                </select>
              </Col>
              <Col xs={24} sm={12} style={{ marginTop: '10px' }}>
                <select
                  style={{ width: '100%' }}
                  value={theme}
                  onChange={e => setTheme(e.target.value)}
                  className="w-full bg-gray-700/50 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                >
                  <option value="modern">Modern</option>
                  <option value="vintage">Vintage</option>
                  <option value="minimalist">Minimalist</option>
                  <option value="fantasy">Fantasy</option>
                </select>
              </Col>
            </Row>

            <button
              onClick={handleGenerate}
              disabled={!prompt || generating}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {generating ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generating...
                </span>
              ) : (
                'Generate Image'
              )}
            </button>
          </Space>
        </Card>

        <div className="flex flex-col md:flex-row gap-4 mt-10 mb-10">
          <div className="w-full">
            <Title level={3} style={{ color: '#ffffff' }}>
              <HistoryOutlined /> Generation History
            </Title>
            <div className="flex flex-wrap gap-4">
              {isLoading
                ? Array(4)
                    .fill(null)
                    .map((_, index) => (
                      <div
                        key={`skeleton-${index}`}
                        className="cursor-pointer p-4 text-white rounded-lg border border-gray-600 bg-gray-700/50 min-h-[330px] h-auto w-full md:w-[calc(50%-16px)]"
                      >
                        <div className="animate-pulse">
                          <div className="w-full h-[200px] bg-gray-600 rounded-lg mb-4"></div>
                          <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-gray-600 rounded w-1/2"></div>
                          <div className="mt-5 flex justify-between">
                            <div className="h-8 bg-gray-600 rounded w-24"></div>
                            <div className="h-8 bg-gray-600 rounded w-24"></div>
                          </div>
                        </div>
                      </div>
                    ))
                : images?.map((image: ImageType) => (
                    <div
                      key={image.id}
                      className="cursor-pointer p-4 text-white rounded-lg border border-gray-600 bg-gray-700/50 min-h-[330px] h-auto w-full md:w-[calc(50%-16px)]"
                    >
                      <ControlledZoom
                        isZoomed={zoomedImages[image.id] || false}
                        onZoomChange={shouldZoom =>
                          handleZoomChange(shouldZoom, image.id)
                        }
                      >
                        <div className="w-full h-full flex justify-center items-center relative">
                          <img
                            alt={image.prompt}
                            src={image.imageUrl}
                            style={{
                              height: '200px',
                              objectFit: 'cover',
                              width: '100%',
                            }}
                          />
                          <EyeOutlined
                            size={44}
                            style={{
                              color: '#ffffff',
                              position: 'absolute',
                              top: '10px',
                              right: '10px',
                              cursor: 'pointer',
                              backgroundColor: '#00000080',
                              padding: '10px',
                              borderRadius: '50%',
                            }}
                            onClick={() => handleZoomChange(true, image.id)}
                          />
                        </div>
                      </ControlledZoom>
                      <p className="mt-2">{image.prompt.slice(0, 50)}...</p>

                      <p className=" text-gray-400">
                        {image.style && `Style: ${image.style}`}
                        <span className="text-gray-400 ml-2">
                          {image.theme && `Theme: ${image.theme}`}
                        </span>
                      </p>
                      <div className="flex justify-between items-center mt-5">
                        <button
                          key="download"
                          onClick={() => downloadImage(image.imageUrl)}
                          className="bg-transparent text-white border border-gray-600 rounded-lg px-4 py-2 -mt-2"
                        >
                          <span className="flex items-center gap-2">
                            <DownloadOutlined /> Download
                          </span>
                        </button>
                        <button
                          onClick={() =>
                            setSelectedImage({
                              prompt: image.prompt,
                              url: image.imageUrl,
                            })
                          }
                        >
                          <EyeOutlined /> View Prompt
                        </button>
                      </div>
                    </div>
                  ))}
              {images?.length === 0 && (
                <div className="flex flex-col justify-center items-center gap-4 h-full mt-6 w-full">
                  <div className="flex justify-center items-center">
                    <PictureOutlined
                      size={60}
                      style={{
                        color: '#dddddd',
                        marginBottom: '10px',
                        fontSize: '2rem',
                      }}
                    />
                  </div>
                  <Text type="secondary" style={{ color: '#dddddd' }}>
                    No images generated yet. Generate one above!
                  </Text>
                </div>
              )}
            </div>

            {/* Add modal for full prompt */}
            {selectedImage && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                onClick={() => setSelectedImage(null)}
              >
                <div
                  className="bg-transparent backdrop-blur-lg border border-gray-600 p-6 rounded-lg max-w-7xl w-full max-h-[90vh] overflow-y-auto"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
                    {/* Left side - Image with controls */}
                    <div className="lg:w-2/3 relative">
                      <div className="relative group">
                        <ControlledZoom
                          isZoomed={zoomedImages['modal-image'] || false}
                          onZoomChange={shouldZoom =>
                            handleZoomChange(shouldZoom, 'modal-image')
                          }
                          zoomMargin={40}
                        >
                          <div className="relative">
                            <img
                              src={selectedImage.url}
                              alt={selectedImage.prompt}
                              className="w-full rounded-lg object-cover max-h-[70vh]"
                            />
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() =>
                                  handleZoomChange(true, 'modal-image')
                                }
                                className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
                              >
                                <EyeOutlined
                                  style={{ color: 'white', fontSize: '20px' }}
                                />
                              </button>
                              <button
                                onClick={() => downloadImage(selectedImage.url)}
                                className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
                              >
                                <DownloadOutlined
                                  style={{ color: 'white', fontSize: '20px' }}
                                />
                              </button>
                            </div>
                          </div>
                        </ControlledZoom>
                      </div>
                    </div>

                    {/* Right side - Prompt and close button */}
                    <div className="lg:w-1/3 flex flex-col relative">
                      <h3 className="text-white text-xl mb-4 font-bold">
                        Full Prompt:
                      </h3>
                      <div className="flex-grow overflow-y-auto">
                        <p className="text-white text-lg">
                          {selectedImage.prompt}
                        </p>
                      </div>
                      <button
                        className="fixed top-3 right-2 bg-transparent text-white px-6 py-2 rounded-lg hover:backdrop-blur-lg transition-colors"
                        onClick={() => setSelectedImage(null)}
                      >
                        <svg
                          className="w-6 h-6 text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </PageLayout>
      <div
        style={{
          display: splashVisible ? 'flex' : 'none',
          height: '100vh',
          width: '100vw',
          backgroundColor: 'transparent',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1000,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        className="bg-transparent backdrop-blur-lg"
      >
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <Text style={{ fontSize: '6rem', color: '#ffffff' }}>
            {`00:${timer < 10 ? `0${timer}` : timer}`}
          </Text>
          <Title level={3} style={{ color: '#ffffff', paddingInline: '20px' }}>
            Please be patient, I&apos;m generating something amazing
          </Title>
        </div>
      </div>
    </>
  )
}
