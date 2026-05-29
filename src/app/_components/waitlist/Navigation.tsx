import Link from 'next/link'
import Image from 'next/image'

import SignInButton from '@/app/_components/SignInButton'

export default function Navigation() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 mt-5 flex justify-center py-4">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="flex items-center justify-between rounded-sm border border-white/5 bg-card/20 px-6 py-2 backdrop-blur-md">
          <div className="flex-shrink-0">
            <Link href="/" aria-label="Orvia index">
              <Image src="/orvia-logo.svg" alt="Orvia" width={28} height={28} />
            </Link>
          </div>

          <SignInButton />
        </div>
      </div>
    </header>
  )
}
