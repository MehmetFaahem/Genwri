'use client'

import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import {
  EditOutlined,
  FileTextOutlined,
  HistoryOutlined,
} from '@ant-design/icons'
import { Button, Card, Col, Row, Space, Typography } from 'antd'
import dayjs from 'dayjs'
import { Document, Packer, Paragraph, TextRun } from 'docx'
import { saveAs } from 'file-saver'
import dynamic from 'next/dynamic'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { ImFilesEmpty } from 'react-icons/im'
import 'react-quill/dist/quill.snow.css' // Import Quill styles
import './styles.css'

const { Title, Text } = Typography

// Import ReactQuill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading Editor...</p>,
})

// Quill editor modules configuration
const quillModules = {
  toolbar: [
    [{ header: [3, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['clean'],
  ],
}

// Quill editor formats configuration
const quillFormats = [
  'header',
  'bold',
  'italic',
  'underline',
  'list',
  'bullet',
  'align',
  'link',
]

const formatContent = (rawContent: string) => {
  // If the content is a JSON string, parse it
  let content = rawContent
  if (typeof rawContent === 'string' && rawContent.trim().startsWith('{')) {
    try {
      const parsed = JSON.parse(rawContent)
      content = parsed.answer || rawContent
    } catch (e) {
      content = rawContent
    }
  }

  // Split content into paragraphs
  const paragraphs = content.split(/\n\n+/)

  // Process each paragraph
  const processedParagraphs = paragraphs.map(paragraph => {
    // Skip empty paragraphs
    if (!paragraph.trim()) return ''

    // Check if it's a header (starts with "Step" or has ** around it)
    if (paragraph.includes('Step ') || paragraph.match(/\*\*(.*?)\*\*/)) {
      return `<h3>${paragraph.replace(/\*\*/g, '')}</h3>`
    }

    // Check if it's a list
    if (paragraph.includes('* ')) {
      const listItems = paragraph
        .split('* ')
        .filter(item => item.trim())
        .map(item => `<li>${item.trim()}</li>`)
        .join('')
      return `<ul>${listItems}</ul>`
    }

    // Regular paragraph
    return `<p>${paragraph}</p>`
  })

  // Join all processed paragraphs
  let formatted = processedParagraphs.join('\n')

  // Clean up any remaining asterisks
  formatted = formatted.replace(/\*/g, '')

  // Clean up any double spaces
  formatted = formatted.replace(/\s+/g, ' ')

  // Fix any broken lists (where items got split across paragraphs)
  formatted = formatted.replace(/<\/ul>\s*<ul>/g, '')

  // Clean up any empty paragraphs
  formatted = formatted.replace(/<p>\s*<\/p>/g, '')

  return formatted
}

const downloadAsDocx = async (title: string, content: string) => {
  // Strip HTML tags for plain text
  const plainText = content.replace(/<[^>]+>/g, '\n')

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: title,
                bold: true,
                size: 32,
              }),
            ],
          }),
          new Paragraph({
            children: [new TextRun('')], // Empty line after title
          }),
          ...plainText.split('\n').map(
            text =>
              new Paragraph({
                children: [
                  new TextRun({
                    text: text.trim(),
                    size: 24,
                  }),
                ],
              }),
          ),
        ],
      },
    ],
  })

  const buffer = await Packer.toBuffer(doc)
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  })
  saveAs(blob, `${title.toLowerCase().replace(/\s+/g, '-')}.docx`)
}

export default function ArticleWritingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const articleId = searchParams.get('articleId')
  console.log(articleId)
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [topic, setTopic] = useState('')
  const [keywords, setKeywords] = useState('')
  const [length, setLength] = useState<number | null>(null)
  const [tone, setTone] = useState('professional')
  const [content, setContent] = useState(
    'Your generated article will appear here',
  )
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null)
  const [splashVisible, setSplashVisible] = useState(false)
  const [timer, setTimer] = useState(30)

  const { data: articles, refetch } = Api.article.findMany.useQuery({
    where: { userId: user?.id },
    orderBy: { createdAt: 'desc' },
  })

  const createArticle = Api.article.create.useMutation()
  const updateArticle = Api.article.update.useMutation()
  const generateText = Api.ai.generateText.useMutation()
  const createDownload = Api.download.create.useMutation()

  const handleGenerate = async () => {
    try {
      setIsGenerating(true)
      setSplashVisible(true)
      const prompt = `Craft an exceptional, ${tone} article on ${topic}, optimized for SEO. Ensure the following keywords are seamlessly integrated throughout the content: ${keywords}. The article should be approximately ${
        length >= 100 ? length : 200
      } words long, well-structured, engaging, and include headings, subheadings, and a strong call-to-action where appropriate. Focus on readability, keyword density, and delivering value to the target audience.`

      const response = await generateText.mutateAsync({ prompt })
      console.log(response)
      const formattedContent = formatContent(response.answer)
      setContent(formattedContent)

      const article = await createArticle.mutateAsync({
        data: {
          title: topic,
          topic,
          keywords,
          content: formattedContent,
          length,
          tone,
          status: 'completed',
          userId: user?.id,
        },
      })

      enqueueSnackbar('Article generated successfully!', { variant: 'success' })
      handleSelectArticle(article)
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to generate article', { variant: 'error' })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSaveEdit = async () => {
    if (!selectedArticle) return
    try {
      await updateArticle.mutateAsync({
        where: { id: selectedArticle },
        data: { content },
      })
      enqueueSnackbar('Article updated successfully!', { variant: 'success' })
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to update article', { variant: 'error' })
    }
  }

  const handleDownload = async (format: string) => {
    if (!selectedArticle || !content) return
    try {
      // downloadAsFormat(content, format)
      enqueueSnackbar(`Article downloaded as ${format}`, { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to download article', { variant: 'error' })
    }
  }

  const handleSelectArticle = (article: any) => {
    setSelectedArticle(article.id)
    setContent(formatContent(article.content))
  }

  useEffect(() => {
    if (articleId && articles) {
      const article = articles.find(a => a.id === articleId)
      if (article) {
        handleSelectArticle(article)
      }
    }
  }, [articleId, articles])

  useEffect(() => {
    if (splashVisible) {
      const countdown = setInterval(() => {
        setTimer(prev => {
          if (prev === 1) {
            clearInterval(countdown)
            setSplashVisible(false)
            return 30
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(countdown)
    }
  }, [splashVisible])

  return (
    <>
      <PageLayout layout="narrow">
        <Title level={2} style={{ color: '#ffffff' }}>
          <FileTextOutlined /> AI Article Writer
        </Title>
        <Text style={{ color: '#ffffff' }}>
          Generate SEO-friendly articles with AI assistance
        </Text>

        <Card
          style={{ marginTop: 24, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <input
              type="text"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              className="w-full bg-gray-700/50 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              placeholder="Enter your topic"
            />
            <input
              type="text"
              value={keywords}
              onChange={e => setKeywords(e.target.value)}
              className="w-full bg-gray-700/50 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              placeholder="Enter keywords (comma-separated)"
            />
            <Row gutter={16}>
              <Col span={12}>
                <input
                  type="number"
                  value={length}
                  onChange={e => setLength(parseInt(e.target.value))}
                  className="w-full bg-gray-700/50 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="Enter article length (Default: 200)"
                  min={1}
                />
              </Col>
              <Col span={12}>
                <select
                  value={tone}
                  onChange={e => setTone(e.target.value)}
                  className="w-full bg-gray-700/50 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                >
                  {['professional', 'casual', 'formal'].map(option => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              </Col>
            </Row>
            <button
              onClick={handleGenerate}
              disabled={!topic || isGenerating}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isGenerating ? (
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
                'Generate Article'
              )}
            </button>
          </Space>
        </Card>

        <div className="flex flex-col md:flex-row gap-4 mt-10">
          <div className="md:w-1/3 w-full">
            <Title level={3} style={{ color: '#ffffff' }}>
              <HistoryOutlined /> Article History
            </Title>
            <Card
              style={{
                minHeight: articles?.length > 0 ? 'auto' : '230px',
                overflowY: 'auto',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
              }}
            >
              {articles?.map(article => (
                <div
                  key={article.id}
                  style={{
                    cursor: 'pointer',
                    padding: '8px',
                    backgroundColor:
                      selectedArticle === article.id
                        ? '#ffffff10'
                        : 'transparent',
                    color: '#ffffff',
                  }}
                  onClick={() => {
                    handleSelectArticle(article)
                  }}
                >
                  <Text strong style={{ color: '#ffffff', fontSize: '1.2rem' }}>
                    {article.title.slice(0, 50)}
                  </Text>
                  <br />
                  <Text type="secondary" style={{ color: '#ffffff80' }}>
                    {dayjs(article.createdAt).format('MMM D, YYYY')}
                  </Text>
                </div>
              ))}
              {articles?.length === 0 && (
                <div className="flex flex-col justify-center items-center gap-4 h-full mt-6">
                  <div className="flex justify-center items-center">
                    <ImFilesEmpty size={60} style={{ color: '#dddddd' }} />
                  </div>
                  <Text type="secondary" style={{ color: '#dddddd' }}>
                    No articles found. Generate one above!
                  </Text>
                </div>
              )}
            </Card>
          </div>
          <div className="md:w-2/3 w-full">
            <Title level={3} style={{ color: '#ffffff' }}>
              <EditOutlined /> Article Editor
            </Title>
            <Card
              title={
                <Space style={{ color: '#ffffff' }}>
                  <EditOutlined />
                </Space>
              }
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
              }}
              extra={
                <Space style={{ color: '#ffffff' }}>
                  <Button onClick={handleSaveEdit} disabled={!selectedArticle}>
                    Save Changes
                  </Button>
                  <Button
                    onClick={() => {
                      const article = articles?.find(
                        a => a.id === selectedArticle,
                      )
                      if (article) {
                        downloadAsDocx(article.title, content)
                      }
                    }}
                    disabled={!selectedArticle}
                    icon={<FileTextOutlined />}
                  >
                    Download DOCX
                  </Button>
                </Space>
              }
            >
              <div
                className="quill-editor"
                style={{
                  pointerEvents:
                    !selectedArticle || isGenerating ? 'none' : 'auto',
                }}
              >
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={quillModules}
                  formats={quillFormats}
                  style={{ height: 'auto' }}
                />
              </div>
            </Card>
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
