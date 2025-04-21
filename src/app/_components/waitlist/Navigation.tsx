import Link from 'next/link'
import Image from 'next/image'
import { Sparkles } from 'lucide-react'

export default function Navigation() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 mt-5 flex justify-center py-4">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="flex items-center justify-between rounded-sm border border-white/5 bg-card/20 px-6 py-2 backdrop-blur-md">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image src="/orvia-logo.svg" alt="Orvia" width={28} height={28} />
            </Link>
          </div>

          {/* Center: Section links */}
          <nav className="flex items-center gap-8">
            <Link
              href="#benefits"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Benefits
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              FAQ
            </Link>
          </nav>

          {/* Right: Updates button with icon */}
          <div className="flex-shrink-0">
            <Link
              href="/updates"
              className="group flex items-center gap-1.5 px-3 py-1 text-sm font-medium text-primary/90 transition-all hover:text-primary"
            >
              <Sparkles className="h-3.5 w-3.5 transition-all group-hover:animate-pulse" />
              <span>Updates</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
