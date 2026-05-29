'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Undo, Redo, Sparkles } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

interface EditorNavbarProps {
  formTitle: string
}

export function EditorNavbar({ formTitle }: EditorNavbarProps) {
  return (
    <header className="sticky top-0 z-30 grid h-14 grid-cols-[auto_1fr_auto] items-center border-b border-border/30 bg-background/95 px-5 backdrop-blur">
      {/* Back */}
      <div className="flex items-center gap-2">
        <Link href="/forms/create">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 rounded-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>

      {/* Title */}
      <div className="ml-24 flex justify-center">
        <h1 className="text-base font-medium text-foreground">{formTitle}</h1>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-2">
        <div className="mr-2 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            disabled
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            disabled
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>
        <Separator orientation="vertical" className="h-6 opacity-50" />
        <Button
          variant="default"
          size="sm"
          className="gap-1.5 rounded-sm border-none bg-primary text-sm font-medium text-white shadow-md transition-all hover:shadow-lg"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Run Preview
        </Button>
      </div>
    </header>
  )
}
