'use client'
import {
  preventContextMenu,
  preventKeyboardEvent,
} from '@/core/helpers/preventer'
import { Utility } from '@/core/helpers/utility'
import { Api } from '@/core/trpc'
import { AppHeader } from '@/designSystem/ui/AppHeader'
import { User } from '@prisma/client'
import { Button, Flex, Form, Input, Typography } from 'antd'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'

import { BackgroundImage } from '@/designSystem/components/BackgroundImage'
import pictureUrl from 'public/bg.jpg'
export default function RegisterPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const searchParams = useSearchParams()

  const [form] = Form.useForm()

  const [isLoading, setLoading] = useState(false)

  const { mutateAsync: registerUser } =
    Api.authentication.register.useMutation()

  useEffect(() => {
    const email = searchParams.get('email')?.trim()

    if (Utility.isDefined(email)) {
      form.setFieldsValue({ email })
    }
  }, [searchParams])

  const handleSubmit = async (values: Partial<User>) => {
    setLoading(true)

    try {
      const tokenInvitation = searchParams.get('tokenInvitation') ?? undefined

      await registerUser({ ...values, tokenInvitation })

      signIn('credentials', {
        ...values,
        callbackUrl: '/home',
      })
    } catch (error) {
      enqueueSnackbar(`Could not signup: ${error.message}`, {
        variant: 'error',
      })

      setLoading(false)
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
        <AppHeader description="Welcome!" />

        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          autoComplete="off"
          requiredMark={false}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Email is required' }]}
          >
            <Input type="email" placeholder="Your email" autoComplete="email" />
          </Form.Item>
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Name is required' }]}
            label="Name"
          >
            <Input placeholder="Your name" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Password is required' }]}
          >
            <Input.Password
              type="password"
              placeholder="Your password"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading} block>
              Register
            </Button>
          </Form.Item>
        </Form>

        <Button
          ghost
          style={{ border: 'none' }}
          onClick={() => router.push('/login')}
        >
          <Flex gap={'small'} justify="center">
            <Typography.Text type="secondary">Have an account?</Typography.Text>{' '}
            <Typography.Text>Sign in</Typography.Text>
          </Flex>
        </Button>
      </Flex>
    </Flex>
  )
}
