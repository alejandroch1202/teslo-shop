import type { Metadata } from 'next'
import { inter } from '@/config/fonts'
import { Providers } from '@/components/providers'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Home - Teslo | Shop',
    template: '%s - Teslo | Shop'
  },
  description: 'Tienda virtual de Teslo'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es'>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
