'use client'

import {
  preventContextMenu,
  preventKeyboardEvent,
} from '@/core/helpers/preventer'
import { Api } from '@/core/trpc'
import { AppHeader } from '@/designSystem/ui/AppHeader'
import { Alert, Button, Flex, Form, Input, Typography } from 'antd'
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
          paddingBottom: '100px',
          paddingTop: '100px',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(10px)',
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
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Email is required' }]}
              >
                <Input
                  type="email"
                  placeholder="Your email"
                  autoComplete="email"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  block
                >
                  Reset Password
                </Button>
              </Form.Item>
            </Form>
          </>
        )}

        <Flex justify="center" align="center">
          <Button
            ghost
            style={{ border: 'none' }}
            onClick={() => router.push('/login')}
          >
            <Flex gap={'small'} justify="center">
              <Text>Sign in</Text>
            </Flex>
          </Button>

          <Text type="secondary">or</Text>

          <Button
            ghost
            style={{ border: 'none' }}
            onClick={() => router.push('/register')}
          >
            <Flex gap={'small'} justify="center">
              <Text>Sign up</Text>
            </Flex>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
