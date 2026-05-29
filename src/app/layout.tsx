import '@/styles/globals.css'

import { Inter } from 'next/font/google'
import { type Metadata } from 'next'

import { TRPCReactProvider } from '@/trpc/react'

export const metadata: Metadata = {
  title: 'Orvia — Notion Form Prototype',
  description:
    'A prototype exploring how Notion database schemas can be transformed into adaptive form interfaces through OAuth authorization, schema interpretation, and dynamic UI generation.',

  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="min-h-screen overflow-x-hidden bg-background font-sans antialiased">
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  )
}
