'use client'

import {
  Button,
  Input,
  Select,
  InputNumber,
  Space,
  Card,
  Typography,
  Row,
  Col,
  Divider,
} from 'antd'
import { Editor } from '@tinymce/tinymce-react'
import { downloadAsFormat } from '@/core/helpers/file/download'
import { useState } from 'react'
import {
  FileTextOutlined,
  HistoryOutlined,
  EditOutlined,
  DownloadOutlined,
} from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
const { TextArea } = Input
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function ArticleWritingPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [topic, setTopic] = useState('')
  const [keywords, setKeywords] = useState('')
  const [length, setLength] = useState<number>(500)
  const [tone, setTone] = useState('professional')
  const [content, setContent] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null)

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
      const prompt = `Write a ${tone} article about ${topic} with the following keywords: ${keywords}. The article should be approximately ${length} words.`

      const response = await generateText.mutateAsync({ prompt })
      setContent(response.answer)

      const article = await createArticle.mutateAsync({
        data: {
          title: topic,
          topic,
          keywords,
          content: response.answer,
          length,
          tone,
          status: 'completed',
          userId: user?.id,
        },
      })

      enqueueSnackbar('Article generated successfully!', { variant: 'success' })
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
        downloadAsFormat(content, format)
        enqueueSnackbar(`Article downloaded as ${format}`, { variant: 'success' })
      } catch (error) {
        enqueueSnackbar('Failed to download article', { variant: 'error' })
      }
    }

  return (
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
                onChange={value => setLength(value || 500)}
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
                    selectedArticle === article.id ? '#f0f0f0' : 'transparent',
                }}
                onClick={() => {
                  setSelectedArticle(article.id)
                  setContent(article.content)
                }}
              >
                <Text strong>{article.title}</Text>
                <br />
                <Text type="secondary">
                  {dayjs(article.createdAt).format('MMM D, YYYY')}
                </Text>
              </div>
            ))}
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
                <Select
                  defaultValue="docx"
                  style={{ width: 100 }}
                  onChange={handleDownload}
                  disabled={!selectedArticle}
                >
                  <Select.Option value="html">HTML</Select.Option>
                  <Select.Option value="docx">DOCX</Select.Option>
                  <Select.Option value="pdf">PDF</Select.Option>
                  <Select.Option value="txt">TXT</Select.Option>
                </Select>
              </Space>
            }
          >
            <Editor
              value={content}
              onEditorChange={(content) => setContent(content)}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                  'undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help'
              }}
            />
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
