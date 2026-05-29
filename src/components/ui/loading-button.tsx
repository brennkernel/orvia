import { Loader2 } from 'lucide-react'
import { type ComponentProps } from 'react'

import { Button } from '@/components/ui/button'

interface LoadingButtonProps extends ComponentProps<typeof Button> {
  isLoading?: boolean
  loadingText?: string
}

export function LoadingButton({
  isLoading = false,
  loadingText = 'Loading...',
  children,
  disabled,
  ...props
}: LoadingButtonProps) {
  return (
    <Button disabled={disabled || isLoading} {...props}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  )
}
