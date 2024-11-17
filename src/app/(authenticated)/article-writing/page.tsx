'use client'

import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import {
  EditOutlined,
  FileTextOutlined,
  HistoryOutlined,
} from '@ant-design/icons'
import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Typography,
} from 'antd'
import dayjs from 'dayjs'
import { Document, Packer, Paragraph, TextRun } from 'docx'
import { saveAs } from 'file-saver'
import dynamic from 'next/dynamic'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
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
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [topic, setTopic] = useState('')
  const [keywords, setKeywords] = useState('')
  const [length, setLength] = useState<number>(200)
  const [tone, setTone] = useState('professional')
  const [content, setContent] = useState('')
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
      const prompt = `Craft an exceptional, ${tone} article on ${topic}, optimized for SEO. Ensure the following keywords are seamlessly integrated throughout the content: ${keywords}. The article should be approximately ${length} words long, well-structured, engaging, and include headings, subheadings, and a strong call-to-action where appropriate. Focus on readability, keyword density, and delivering value to the target audience.`

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
    if (articleId) {
      const article = articles?.find(a => a.id === articleId)
      if (article) {
        handleSelectArticle(article)
      }
    }
  }, [articleId])

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
        <Title level={2}>
          <FileTextOutlined /> Article Writing
        </Title>
        <Text>Generate SEO-friendly articles with AI assistance</Text>

        <Card style={{ marginTop: 24 }}>
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Input
              placeholder="Enter topic"
              value={topic}
              onChange={e => setTopic(e.target.value)}
            />
            <Input
              placeholder="Enter keywords (comma-separated)"
              value={keywords}
              onChange={e => setKeywords(e.target.value)}
            />
            <Row gutter={16}>
              <Col span={12}>
                <InputNumber
                  style={{ width: '100%' }}
                  min={100}
                  max={5000}
                  value={length}
                  onChange={value => setLength(value || 200)}
                  addonAfter="words"
                />
              </Col>
              <Col span={12}>
                <Select
                  style={{ width: '100%' }}
                  value={tone}
                  onChange={setTone}
                  options={[
                    { value: 'professional', label: 'Professional' },
                    { value: 'casual', label: 'Casual' },
                    { value: 'formal', label: 'Formal' },
                  ]}
                />
              </Col>
            </Row>
            <Button
              type="primary"
              onClick={handleGenerate}
              loading={isGenerating}
              block
            >
              Generate Article
            </Button>
          </Space>
        </Card>

        <Divider>
          <HistoryOutlined /> Article History
        </Divider>

        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Card>
              {articles?.map(article => (
                <div
                  key={article.id}
                  style={{
                    cursor: 'pointer',
                    padding: '8px',
                    backgroundColor:
                      selectedArticle === article.id
                        ? '#f0f0f0'
                        : 'transparent',
                  }}
                  onClick={() => {
                    handleSelectArticle(article)
                  }}
                >
                  <Text strong>{article.title}</Text>
                  <br />
                  <Text type="secondary">
                    {dayjs(article.createdAt).format('MMM D, YYYY')}
                  </Text>
                </div>
              ))}
              {articles?.length === 0 && (
                <Text type="secondary">
                  No articles found. Generate one above!
                </Text>
              )}
            </Card>
          </Col>
          <Col span={16}>
            <Card
              title={
                <Space>
                  <EditOutlined /> Editor
                </Space>
              }
              extra={
                <Space>
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
          </Col>
        </Row>
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
          <Text style={{ fontSize: '8rem' }}>
            {`00:${timer < 10 ? `0${timer}` : timer}`}
          </Text>
          <Title level={3}>
            Please be patient, I&apos;m generating something amazing
          </Title>
        </div>
      </div>
    </>
  )
}
