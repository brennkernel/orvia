import Navigation from '@/app/_components/waitlist/Navigation'
import Hero from '@/app/_components/waitlist/Hero'

export default function Index() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Navigation />
      <Hero />
    </main>
  )
}
