'use client'

import {
  preventContextMenu,
  preventKeyboardEvent,
} from '@/core/helpers/preventer'
import { Api } from '@/core/trpc'
import { AppHeader } from '@/designSystem/ui/AppHeader'
import { Alert, Button, Flex, Form, Typography } from 'antd'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'

import { BackgroundImage } from '@/designSystem/components/BackgroundImage'
import pictureUrl from 'public/bg.jpg'

const { Text } = Typography

export default function ResetPasswordPage() {
  const router = useRouter()

  const { enqueueSnackbar } = useSnackbar()

  const [email, setEmail] = useState<string>()

  const [form] = Form.useForm()

  const {
    mutateAsync: resetPassword,
    isLoading,
    isSuccess,
  } = Api.authentication.sendResetPasswordEmail.useMutation()

  const handleSubmit = async (values: any) => {
    try {
      setEmail(values.email)

      await resetPassword({ email: values.email })
    } catch (error) {
      enqueueSnackbar(`Could not reset password: ${error}`, {
        variant: 'error',
      })
    }
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => preventKeyboardEvent(e as any)
    document.addEventListener('keydown', handler)

    return () => {
      document.removeEventListener('keydown', handler)
    }
  }, [])

  return (
    <Flex
      align="center"
      justify="center"
      vertical
      flex={1}
      onContextMenu={preventContextMenu}
    >
      <div className="absolute inset-0">
        <BackgroundImage src={pictureUrl} />
      </div>
      <Flex
        vertical
        style={{
          width: '340px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '10px',
          zIndex: 10,
          boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
          padding: '40px',
        }}
        gap="middle"
      >
        <AppHeader description="You will receive a link" />

        {isSuccess && (
          <Alert
            style={{ textAlign: 'center' }}
            message={`We sent an email to ${email} with a link to reset your password`}
            type="success"
          />
        )}

        {!isSuccess && (
          <>
            <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              requiredMark={false}
              style={{ color: '#ffffff' }}
            >
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
              <Form.Item>
                <Button
                  htmlType="submit"
                  loading={isLoading}
                  className="w-full mt-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Reset Password
                </Button>
              </Form.Item>
            </Form>
          </>
        )}

        <Button
          ghost
          onClick={() => router.push('/login')}
          className="w-full bg-transparent text-white border border-gray-600 rounded-lg px-4 py-2"
        >
          <Flex gap={'small'} justify="center">
            <Typography.Text style={{ color: '#ffffff' }}>
              Back to Sign in
            </Typography.Text>
          </Flex>
        </Button>
      </Flex>
    </Flex>
  )
}
