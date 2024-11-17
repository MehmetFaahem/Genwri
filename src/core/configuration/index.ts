const isDevelopment = () => process.env.NODE_ENV === 'development'
const isProduction = () => process.env.NODE_ENV === 'production'

const getBaseUrl = () => {
  const isServer = typeof window !== 'undefined'
  const baseUrl = process.env.NEXTAUTH_URL
  const port = process.env.PORT ?? 8099

  if (isServer) {
    return ''
  }

  if (baseUrl) {
    if (baseUrl.startsWith('http') || baseUrl.startsWith('https')) {
      return baseUrl
    } else {
      return `https://${baseUrl}`
    }
  }

  return `http://localhost:${port}`
}

const getAuthenticationSecret = () => {
  const secret = process.env.NEXTAUTH_SECRET

  if (!secret && process.env.NODE_ENV === 'production') {
    throw new Error(
      'NEXTAUTH_SECRET environment variable is required in production',
    )
  }

  return secret
}

export const Configuration = {
  isDevelopment,
  isProduction,
  getBaseUrl,
  getAuthenticationSecret,
}
