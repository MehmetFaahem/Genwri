'use client'

import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import {
  FileTextOutlined,
  HistoryOutlined,
  PictureOutlined,
} from '@ant-design/icons'
import { Button, Card, Col, Divider, Row, Typography } from 'antd'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
const { Title, Text } = Typography

const dummyImages = [
  'https://cdn.pixabay.com/photo/2024/03/04/14/17/ai-generated-8612487_640.jpg',
  'https://cdn.pixabay.com/photo/2022/11/15/04/54/automotive-7593064_640.jpg',
  'https://cdn.pixabay.com/photo/2022/09/29/17/15/halloween-7487706_640.jpg',
  'https://cdn.pixabay.com/photo/2024/01/20/12/12/ai-generated-8520972_640.png',
  'https://cdn.pixabay.com/photo/2022/09/16/23/10/temple-7459835_640.jpg',
  'https://cdn.pixabay.com/photo/2024/05/21/11/46/house-8777647_640.jpg',
]

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
    take: 12,
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
      <div style={{ marginTop: 48, marginBottom: 48 }}>
        <Title level={2}>
          <HistoryOutlined /> Recent Content
        </Title>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Title level={3}>Recent Images</Title>
          <Button
            type="link"
            onClick={() => navigateToFeature('/image-generation')}
          >
            Create New
          </Button>
        </div>
        <Row gutter={[24, 24]}>
          {recentImages?.map(image => (
            <Col
              xs={24}
              sm={8}
              key={image.id}
              onClick={() => navigateToFeature(`/image-generation`)}
              className="cursor-pointer"
            >
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
          {recentImages?.length === 0 &&
            dummyImages.map((image, index) => (
              <Col xs={24} sm={8} key={index}>
                <Card size="default">
                  <img
                    src={image}
                    alt="Generated Image"
                    style={{
                      width: '100%',
                      height: 250,
                      objectFit: 'cover',
                      borderRadius: 8,
                    }}
                  />
                </Card>
              </Col>
            ))}
          <Divider />
        </Row>

        <Title level={3}>Recent Articles</Title>
        <Row gutter={[24, 24]}>
          {recentArticles?.map(article => (
            <Col
              xs={24}
              sm={8}
              key={article.id}
              onClick={() =>
                navigateToFeature(`/article-writing?articleId=${article.id}`)
              }
              className="cursor-pointer"
            >
              <Card size="small" title="Written Article">
                <Title level={5} ellipsis>
                  {article.title}
                </Title>
                <Text ellipsis>{article.content.substring(0, 100)}...</Text>
              </Card>
            </Col>
          ))}
          {recentArticles?.length === 0 && (
            <Col xs={24} sm={8}>
              <Text>
                No recent articles. Generate an article to see it here.
              </Text>
            </Col>
          )}
        </Row>
      </div>

      {/* Quick-start Templates */}
      {/* <div style={{ marginTop: 48 }}>
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
      </div> */}
    </PageLayout>
  )
}
