import { Metadata } from 'next'
import { ClientLayout } from './client.layout'

export const metadata: Metadata = {
  title: 'Geno.AI',
  description: 'Geno.AI',
}

export default function RootLayout(props) {
  return (
    <>
      <ClientLayout {...props} />
    </>
  )
}
