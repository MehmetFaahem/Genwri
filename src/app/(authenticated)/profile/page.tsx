'use client'

import { useUserContext } from '@/core/context'
import { Utility } from '@/core/helpers/utility'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { User } from '@prisma/client'
import { Avatar, Button, Card, Form, Space, Typography } from 'antd'
import { signOut } from 'next-auth/react'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'

const { Title, Text } = Typography

export default function ProfilePage() {
  const { enqueueSnackbar } = useSnackbar()
  const { user, refetch: refetchUser } = useUserContext()

  const [form] = Form.useForm()

  const [isLoading, setLoading] = useState(false)
  const [isLoadingLogout, setLoadingLogout] = useState(false)

  const { mutateAsync: updateUser } = Api.user.update.useMutation()

  useEffect(() => {
    form.setFieldsValue(user)
  }, [user])

  const handleSubmit = async (values: Partial<User>) => {
    setLoading(true)

    try {
      await updateUser({
        where: { id: user.id },
        data: {
          email: values.email,
          name: values.name,
          pictureUrl: values.pictureUrl,
        },
      })

      refetchUser()
    } catch (error) {
      enqueueSnackbar(`Could not save user: ${error.message}`, {
        variant: 'error',
      })
    }

    setLoading(false)
  }

  const handleClickLogout = async () => {
    setLoadingLogout(true)

    try {
      await signOut({ callbackUrl: '/login' })
    } catch (error) {
      enqueueSnackbar(`Could not logout: ${error.message}`, {
        variant: 'error',
      })

      setLoadingLogout(false)
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2} style={{ color: '#ffffff' }}>
        Profile
      </Title>
      <Text style={{ color: '#ffffff' }}>Manage your profile information</Text>

      <Card
        style={{ marginTop: 24, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
      >
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Avatar size={80} src={user.pictureUrl}>
              {Utility.stringToInitials(user.name)}
            </Avatar>
          </div>

          <Form
            form={form}
            initialValues={user}
            onFinish={handleSubmit}
            layout="vertical"
            requiredMark={false}
            style={{ color: '#ffffff' }}
          >
            <Form.Item
              name="name"
              label={<span style={{ color: '#ffffff' }}>Name</span>}
              rules={[{ required: true, message: 'Name is required' }]}
              style={{ marginBottom: '16px' }}
            >
              <input
                type="text"
                placeholder="Your name"
                className="w-full bg-gray-700/50 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </Form.Item>

            <Form.Item
              label={<span style={{ color: '#ffffff' }}>Email</span>}
              name="email"
              rules={[{ required: true, message: 'Email is required' }]}
            >
              <input
                type="email"
                placeholder="Your email"
                autoComplete="email"
                className="w-full bg-gray-700/50 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </Form.Item>

            {/* <Form.Item label="Profile picture" name="pictureUrl">
              <Input className="w-full bg-gray-700/50 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
            </Form.Item> */}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Save
              </Button>
            </Form.Item>
          </Form>

          <Button
            onClick={handleClickLogout}
            loading={isLoadingLogout}
            className="w-full bg-transparent text-white border border-gray-600 rounded-lg px-4 py-2"
          >
            Logout
          </Button>
        </Space>
      </Card>
    </PageLayout>
  )
}
