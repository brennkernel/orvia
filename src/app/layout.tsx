import '@/styles/globals.css'

import { Inter } from 'next/font/google'
import { type Metadata } from 'next'

import { TRPCReactProvider } from '@/trpc/react'

export const metadata: Metadata = {
  title: 'Orvia — Smarter Forms for Notion',
  description:
    'Orvia lets you show or hide fields, validate responses, and ensure cleaner, more complete form submissions — without breaking your Notion flow.',
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
