'use client'

import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import {
  FileSyncOutlined,
  FileTextOutlined,
  PictureOutlined,
  ProfileOutlined,
} from '@ant-design/icons'
import { Card, Col, Row, Typography } from 'antd'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'

import 'react-medium-image-zoom/dist/styles.css'

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
        <h1 className="text-white text-4xl md:text-7xl font-bold">
          Welcome to Content Creation Hub
        </h1>
        <p className="text-white text-xl md:text-2xl mt-4">
          Generate stunning AI images or write compelling articles with our
          creative tools
        </p>
      </div>

      {/* Main Features */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12}>
          <Card
            hoverable
            onClick={() => navigateToFeature('/image-generation')}
            style={{
              height: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}
          >
            <PictureOutlined
              style={{ fontSize: 48, color: '#1890ff', marginBottom: 16 }}
            />
            <Title level={3} style={{ color: 'white' }}>
              AI Image Generation
            </Title>
            <Text style={{ color: 'white' }}>
              Create unique images from text descriptions using advanced AI. An
              image will be generated for each prompt.
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card
            hoverable
            onClick={() => navigateToFeature('/article-writing')}
            style={{
              height: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}
          >
            <FileTextOutlined
              style={{ fontSize: 48, color: '#1890ff', marginBottom: 16 }}
            />
            <Title level={3} style={{ color: 'white' }}>
              AI SEO Article Writing
            </Title>
            <Text style={{ color: 'white' }}>
              Generate well-structured articles with AI assistance. An SEO-
              optimized article will be generated for each prompt.
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card
            hoverable
            onClick={() => navigateToFeature('/document-writing')}
            style={{
              height: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}
          >
            <FileSyncOutlined
              style={{ fontSize: 48, color: '#1890ff', marginBottom: 16 }}
            />
            <Title level={3} style={{ color: 'white' }}>
              AI Document Writing
            </Title>
            <Text style={{ color: 'white' }}>
              Generate well-structured documents with AI assistance. A document
              will be generated for each prompt.
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card
            hoverable
            onClick={() => navigateToFeature('/script-writing')}
            style={{
              height: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}
          >
            <ProfileOutlined
              style={{ fontSize: 48, color: '#1890ff', marginBottom: 16 }}
            />
            <Title level={3} style={{ color: 'white' }}>
              AI Script Writing
            </Title>
            <Text style={{ color: 'white' }}>
              Generate well-structured scripts with AI assistance. A script will
              be generated for each prompt.
            </Text>
          </Card>
        </Col>
      </Row>

      {/* Recent Content */}
      {/* <div style={{ marginTop: 48, marginBottom: 48 }}>
        <Title
          level={2}
          style={{
            color: 'GrayText',
          }}
        >
          <HistoryOutlined /> Previous Contents
        </Title>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '20px',
          }}
        >
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
              // onClick={() => navigateToFeature(`/image-generation`)}
            >
              <Card size="small" title="Generated Image">
                <Zoom>
                  <img
                    src={image.imageUrl}
                    alt={image.prompt}
                    style={{ width: '100%', height: 150, objectFit: 'cover' }}
                  />
                </Zoom>
                <Text
                  ellipsis
                  style={{
                    marginTop: '10px',
                  }}
                >
                  {image.prompt}
                </Text>
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
      </div> */}

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
