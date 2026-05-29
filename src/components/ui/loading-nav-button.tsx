'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { LoadingButton } from '@/components/ui/loading-button'

interface LoadingNavigationButtonProps {
  href: string
  children: React.ReactNode
  loadingText?: string
  className?: string
}

export function LoadingNavigationButton({
  href,
  children,
  loadingText = 'Loading...',
  className,
}: LoadingNavigationButtonProps) {
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)

  const handleClick = () => {
    setIsNavigating(true)
    router.push(href)
  }

  return (
    <LoadingButton
      type="button"
      className={className}
      isLoading={isNavigating}
      loadingText={loadingText}
      onClick={handleClick}
    >
      {children}
    </LoadingButton>
  )
}
