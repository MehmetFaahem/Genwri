import { Metadata } from 'next'
import { ClientLayout } from './client.layout'

export const metadata: Metadata = {
  title: 'Genwri',
  description: 'Genwri',
}

export default function RootLayout(props) {
  return (
    <>
      <ClientLayout {...props} />
    </>
  )
}
