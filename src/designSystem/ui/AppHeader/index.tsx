import { Logo } from '@/designSystem/layouts/NavigationLayout/components/Logo'
import { Flex, Typography } from 'antd'
import React from 'react'

const { Text, Title } = Typography

type Props = {
  title?: string
  description?: string
}

export const AppHeader: React.FC<Props> = ({
  title = 'Genwri',
  description,
}) => {
  return (
    <>
      <Flex justify="center">
        <Logo height="100" />
      </Flex>

      <Flex vertical align="center">
        <Title level={3} style={{ margin: 0, color: '#ffffff' }}>
          {title}
        </Title>
        {description && (
          <Text type="secondary" style={{ color: '#ffffff' }}>
            {description}
          </Text>
        )}
      </Flex>
    </>
  )
}
