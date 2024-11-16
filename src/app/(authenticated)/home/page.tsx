'use client'

import { Typography, Card, Row, Col, Button } from 'antd'
import {
  PictureOutlined,
  FileTextOutlined,
  HistoryOutlined,
  RocketOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  // Fetch recent content
  const { data: recentImages } = Api.image.findMany.useQuery({
    where: { userId: user?.id },
    orderBy: { createdAt: 'desc' },
    take: 3,
  })

  const { data: recentArticles } = Api.article.findMany.useQuery({
    where: { userId: user?.id },
    orderBy: { createdAt: 'desc' },
    take: 3,
  })

  // Fetch quick-start templates
  const { data: templates } = Api.template.findMany.useQuery({
    where: {
      OR: [{ type: 'image' }, { type: 'article' }],
    },
    take: 4,
  })

  const navigateToFeature = (path: string) => {
    router.push(path)
  }

  return (
    <PageLayout layout="narrow">
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <Title level={1}>Welcome to Content Creation Hub</Title>
        <Text>
          Generate stunning AI images or write compelling articles with our
          creative tools
        </Text>
      </div>

      {/* Main Features */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12}>
          <Card
            hoverable
            onClick={() => navigateToFeature('/image-generation')}
            style={{ height: '100%' }}
          >
            <PictureOutlined
              style={{ fontSize: 48, color: '#1890ff', marginBottom: 16 }}
            />
            <Title level={3}>AI Image Generation</Title>
            <Text>
              Create unique images from text descriptions using advanced AI
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card
            hoverable
            onClick={() => navigateToFeature('/article-writing')}
            style={{ height: '100%' }}
          >
            <FileTextOutlined
              style={{ fontSize: 48, color: '#52c41a', marginBottom: 16 }}
            />
            <Title level={3}>Article Writing</Title>
            <Text>Generate well-structured articles with AI assistance</Text>
          </Card>
        </Col>
      </Row>

      {/* Recent Content */}
      <div style={{ marginTop: 48 }}>
        <Title level={2}>
          <HistoryOutlined /> Recent Content
        </Title>
        <Row gutter={[24, 24]}>
          {recentImages?.map(image => (
            <Col xs={24} sm={8} key={image.id}>
              <Card size="small" title="Generated Image">
                <img
                  src={image.imageUrl}
                  alt={image.prompt}
                  style={{ width: '100%', height: 150, objectFit: 'cover' }}
                />
                <Text ellipsis>{image.prompt}</Text>
              </Card>
            </Col>
          ))}
          {recentArticles?.map(article => (
            <Col xs={24} sm={8} key={article.id}>
              <Card size="small" title="Written Article">
                <Title level={5} ellipsis>
                  {article.title}
                </Title>
                <Text ellipsis>{article.content.substring(0, 100)}...</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Quick-start Templates */}
      <div style={{ marginTop: 48 }}>
        <Title level={2}>
          <RocketOutlined /> Quick-start Templates
        </Title>
        <Row gutter={[24, 24]}>
          {templates?.map(template => (
            <Col xs={24} sm={12} md={6} key={template.id}>
              <Card
                hoverable
                onClick={() =>
                  navigateToFeature(
                    template.type === 'image'
                      ? '/image-generation'
                      : '/article-writing',
                  )
                }
              >
                <Title level={4}>{template.name}</Title>
                <Text>{template.description}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </PageLayout>
  )
}
