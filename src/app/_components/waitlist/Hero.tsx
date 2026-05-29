import Link from 'next/link'
import { Github, Mail, type LucideIcon } from 'lucide-react'

const secondaryLinks: Array<{
  id: string
  href: string
  label: string
  icon: LucideIcon
  isExternal?: boolean
}> = [
  {
    id: 'github',
    icon: Github,
    href: 'https://github.com/brennkernel/orvia',
    label: 'GitHub',
    isExternal: true,
  },
  {
    id: 'mail',
    icon: Mail,
    href: 'mailto:entry@brennkernel.xyz',
    label: 'Mail',
  },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen items-center py-20 md:py-44">
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          {/* Status badge */}
          <div className="badge-glow">
            <div className="badge-glow-line-left" />
            <div className="flex items-center gap-1">
              <span className="badge-glow-icon">🧪</span>
              <span className="badge-glow-text">Functional Prototype</span>
            </div>
            <div className="badge-glow-line" />
          </div>

          {/* Animated headline */}
          <h1 className="animated-headline mb-6 text-4xl font-extrabold tracking-tight text-foreground/90 sm:text-5xl md:text-6xl">
            Add smart control to your Notion forms
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-8 max-w-2xl text-center text-base leading-relaxed tracking-tight text-muted-foreground md:text-lg">
            Explore schema-driven forms, dynamic fields —
            <br className="hidden sm:inline" />
            and a smarter layer for working inside Notion.
          </p>
          {/* Secondary links */}
          <div className="flex justify-center gap-4">
            {secondaryLinks.map(
              ({ id, href, label, icon: Icon, isExternal }) => (
                <Link
                  key={id}
                  href={href}
                  aria-label={label}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noreferrer' : undefined}
                  className="group relative flex h-8 w-8 items-center justify-center text-muted-foreground transition-all duration-300 hover:text-primary"
                >
                  <span className="absolute inset-0 rounded-full bg-primary/5 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-4 w-4" />
                  </span>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
