'use client'

import {
  preventContextMenu,
  preventKeyboardEvent,
} from '@/core/helpers/preventer'
import { BackgroundImage } from '@/designSystem/components/BackgroundImage'
import { AppHeader } from '@/designSystem/ui/AppHeader'
import { Button, Flex, Form, Typography } from 'antd'
import { getProviders, signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSnackbar } from 'notistack'
import pictureUrl from 'public/bg.jpg'
import { useEffect, useState } from 'react'
import GoogleButton from 'react-google-button'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const { enqueueSnackbar } = useSnackbar()

  const [providers, setProviders] = useState<string[]>([])
  const [form] = Form.useForm()
  const [isLoading, setLoading] = useState(false)

  const errorKey = searchParams.get('error')

  const errorMessage = {
    Signin: 'Try signing in with a different account.',
    OAuthSignin: 'Try signing in with a different account.',
    OAuthCallback: 'Try signing in with a different account.',
    OAuthCreateAccount: 'Try signing in with a different account.',
    EmailCreateAccount: 'Try signing in with a different account.',
    Callback: 'Try signing in with a different account.',
    OAuthAccountNotLinked:
      'To confirm your identity, sign in with the same account you used originally.',
    EmailSignin: 'Check your email address.',
    CredentialsSignin:
      'Sign in failed. Check the details you provided are correct.',
    default: 'Unable to sign in.',
  }[errorKey ?? 'default']

  useEffect(() => {
    // fetchProviders()

    // if (!Configuration.isDevelopment()) {
    //   form.setFieldValue('email', 'demo@gmail.com')
    //   form.setFieldValue('password', 'demo1234')
    // }

    form.setFieldValue('email', 'demo@gmail.com')
    form.setFieldValue('password', 'demo1234')
  }, [])

  const fetchProviders = async () => {
    try {
      const providers = await getProviders()

      setProviders(Object.keys(providers))
    } catch {
      // ignore
    }
  }

  const handleProviderSignIn = async provider => {
    setLoading(true)
    await signIn(provider, { callbackUrl: '/home' })
  }

  const handleSubmit = async (values: any) => {
    setLoading(true)

    try {
      await signIn('credentials', {
        email: values.email,
        password: values.password,
        callbackUrl: '/home',
      })
    } catch (error) {
      enqueueSnackbar(`Could not login: ${error.message}`, { variant: 'error' })

      setLoading(false)
    }
  }

  const ProviderButton = ({ provider }) => {
    switch (provider) {
      case 'google':
        return <GoogleButton onClick={() => handleProviderSignIn(provider)} />
      default:
        return null
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

        {errorKey && (
          <p className="text-center text-white mb-4 animate-pulse">
            {errorMessage}
          </p>
        )}

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
            <Flex justify="end">
              <Button
                type="link"
                onClick={() => router.push('/reset-password')}
                style={{ padding: 0, margin: 0, color: '#ffffff' }}
              >
                Forgot password?
              </Button>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              loading={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>

        {/* {providers.length > 1 && (
          <>
            <Flex justify="center">
              <Typography.Text style={{ color: '#ffffff' }}>Or</Typography.Text>
            </Flex>

            <Flex
              gap={'small'}
              justify="center"
              style={{ marginBottom: '20px' }}
            >
              {providers.map(provider => (
                <ProviderButton
                  key={`button-${provider}`}
                  provider={provider}
                />
              ))}
            </Flex>
          </>
        )} */}

        <Button
          ghost
          onClick={() => router.push('/register')}
          className="w-full bg-transparent text-white border border-gray-600 rounded-lg px-4 py-2"
        >
          <Flex gap={'small'} justify="center">
            <Typography.Text style={{ color: '#ffffff' }}>
              No account?
            </Typography.Text>{' '}
            <Typography.Text style={{ color: '#ffffff' }}>
              Sign up
            </Typography.Text>
          </Flex>
        </Button>
      </Flex>
    </Flex>
  )
}
