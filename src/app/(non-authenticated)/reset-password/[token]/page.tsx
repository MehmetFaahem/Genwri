'use client'
import {
  preventContextMenu,
  preventKeyboardEvent,
} from '@/core/helpers/preventer'
import { Api } from '@/core/trpc'
import { BackgroundImage } from '@/designSystem/components/BackgroundImage'
import { AppHeader } from '@/designSystem/ui/AppHeader'
import { Alert, Button, Flex, Form, Typography } from 'antd'
import { useParams, useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import pictureUrl from 'public/bg.jpg'
import { useEffect } from 'react'

const { Text } = Typography

export default function ResetPasswordTokenPage() {
  const router = useRouter()

  const { enqueueSnackbar } = useSnackbar()

  const { token } = useParams<{ token: string }>()

  const [form] = Form.useForm()

  const {
    mutateAsync: resetPassword,
    isLoading,
    isSuccess,
  } = Api.authentication.resetPassword.useMutation()

  const handleSubmit = async (values: any) => {
    try {
      await resetPassword({ token, password: values.password })
    } catch (error) {
      enqueueSnackbar(`Could not reset password: ${error.message}`, {
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
        <AppHeader description="Change your password" />

        {isSuccess && (
          <Alert
            style={{ textAlign: 'center' }}
            type="success"
            message="Your password has been changed."
          />
        )}

        {!isSuccess && (
          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            requiredMark={false}
            style={{ color: '#ffffff' }}
          >
            <Form.Item
              label={<span style={{ color: '#ffffff' }}>Password</span>}
              name="password"
              rules={[{ required: true, message: 'Password is required' }]}
            >
              <input
                type="password"
                placeholder="Your new password"
                autoComplete="new-password"
                className="w-full bg-gray-700/50 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </Form.Item>

            <Form.Item
              label={
                <span style={{ color: '#ffffff' }}>Password confirmation</span>
              }
              name="passwordConfirmation"
              rules={[
                {
                  required: true,
                  message: 'Password confirmation is required',
                },
              ]}
            >
              <input
                type="password"
                placeholder="Password confirmation"
                autoComplete="new-password"
                className="w-full bg-gray-700/50 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                loading={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Reset Password
              </Button>
            </Form.Item>
          </Form>
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
