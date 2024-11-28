'use client'
import {
  preventContextMenu,
  preventKeyboardEvent,
} from '@/core/helpers/preventer'
import { Utility } from '@/core/helpers/utility'
import { Api } from '@/core/trpc'
import { AppHeader } from '@/designSystem/ui/AppHeader'
import { User } from '@prisma/client'
import { Button, Flex, Form, Typography } from 'antd'
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
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '10px',
          zIndex: 10,
          boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
          padding: '40px',
        }}
        gap="middle"
      >
        <AppHeader description="" />

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

          <Form.Item
            label={<span style={{ color: '#ffffff' }}>Name</span>}
            name="name"
            rules={[{ required: true, message: 'Name is required' }]}
          >
            <input
              type="text"
              placeholder="Your name"
              className="w-full bg-gray-700/50 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ color: '#ffffff' }}>Password</span>}
            name="password"
            rules={[{ required: true, message: 'Password is required' }]}
          >
            <input
              type="password"
              placeholder="Your password"
              autoComplete="current-password"
              className="w-full bg-gray-700/50 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              loading={isLoading}
              className="w-full mt-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Register
            </Button>
          </Form.Item>
        </Form>

        <Button
          ghost
          onClick={() => router.push('/login')}
          className="w-full bg-transparent text-white border border-gray-600 rounded-lg px-4 py-2"
        >
          <Flex gap={'small'} justify="center">
            <Typography.Text style={{ color: '#ffffff' }}>
              Have an account?
            </Typography.Text>{' '}
            <Typography.Text style={{ color: '#ffffff' }}>
              Sign in
            </Typography.Text>
          </Flex>
        </Button>
      </Flex>
    </Flex>
  )
}
