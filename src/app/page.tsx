import type { Metadata } from 'next'
import Hero from '@/app/_components/waitlist/Hero'
import Navigation from '@/app/_components/waitlist/NavigationWIP'

export const metadata: Metadata = {
  title: 'Orvia — Smarter Forms for Notion',
  description:
    'Orvia lets you show or hide fields, validate responses, and ensure cleaner, more complete form submissions — without breaking your Notion flow.',
}

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <Hero />
      </main>
    </div>
  )
}
