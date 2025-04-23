'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Mail, Linkedin } from 'lucide-react'
import { useState } from 'react'

export default function ComingSoon() {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)

  const socialLinks = [
    {
      id: 'email',
      icon: <Mail className="h-4 w-4" />,
      href: 'mailto:hello@orvia.io',
      label: 'Email',
    },
    {
      id: 'linkedin',
      icon: <Linkedin className="h-4 w-4" />,
      href: 'https://linkedin.com/company/orviahq',
      label: 'LinkedIn',
    },
  ]

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center text-foreground">
      {/* Logo only */}
      <div className="mb-6 opacity-80">
        <Image src="/orvia-logo.svg" alt="Orvia logo" width={36} height={36} />
      </div>

      {/* Headline with animated gradient */}
      <h1 className="animated-headline text-3xl font-bold tracking-tight sm:text-4xl">
        Orvia is coming soon ✨
      </h1>

      {/* Description */}
      <p className="mt-4 max-w-md text-sm text-muted-foreground">
        We're building a smarter layer for Notion forms. The waitlist will be
        back soon. In the meantime, feel free to reach out or connect below.
      </p>

      {/* Social icons */}
      <div className="mt-6 flex justify-center gap-4">
        {socialLinks.map(link => (
          <Link
            key={link.id}
            href={link.href}
            aria-label={link.label}
            className="group relative flex h-8 w-8 items-center justify-center text-muted-foreground transition-all duration-300 hover:text-primary"
            onMouseEnter={() => setHoveredIcon(link.id)}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <span
              className={`absolute inset-0 rounded-full bg-primary/5 opacity-0 blur-md transition-opacity duration-300 ${
                hoveredIcon === link.id ? 'opacity-100' : ''
              }`}
            />
            <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
              {link.icon}
            </span>
          </Link>
        ))}
      </div>
    </main>
  )
}
