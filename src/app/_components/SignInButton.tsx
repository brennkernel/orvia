'use client'

import { signIn } from 'next-auth/react'
import { Sparkles } from 'lucide-react'

export default function SignInButton() {
  return (
    <button
      type="button"
      onClick={() => signIn('notion', { callbackUrl: '/dashboard' })}
      className="group flex items-center gap-1.5 px-3 py-1 text-sm font-medium text-primary/90 transition-all hover:text-primary"
      aria-label="Open Orvia demo with Notion"
    >
      <Sparkles
        className="h-3.5 w-3.5 transition-all group-hover:animate-pulse"
        aria-hidden="true"
      />
      <span>Explore demo</span>
    </button>
  )
}
