import type { Metadata } from 'next'
import Hero from '@/app/_components/waitlist/Hero'
// import HeroAtmosphere from '@/app/_components/waitlist/HeroAtmosphere'
import Navigation from '@/app/_components/waitlist/Navigation'
// import Benefits from '@/app/_components/waitlist/Benefits'
// import FAQ from '@/app/_components/waitlist/Faq'
// import Footer from '@/app/_components/waitlist/Footer'
// import CTASection from '@/app/_components/waitlist/CTASection'

import { redirect } from 'next/navigation'

const isProd = process.env.NODE_ENV === 'production'

export const metadata: Metadata = {
  title: 'Orvia — Smarter Forms for Notion',
  description:
    'Orvia lets you show or hide fields, validate responses, and ensure cleaner, more complete form submissions — without breaking your Notion flow.',
}

export default function Home() {
  if (isProd) {
    redirect('/coming-soon')
  }
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* <HeroAtmosphere /> */}
      <Navigation />
      <main className="flex-1">
        <Hero />
        {/* <Benefits /> */}
        {/* <FAQ /> */}
        {/* <CTASection /> */}
      </main>
      {/* <Footer /> */}
    </div>
  )
}
