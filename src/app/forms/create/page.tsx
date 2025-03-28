import { auth } from '@/server/auth/config'
import { redirect } from 'next/navigation'
import { api } from '@/trpc/server'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { NotionDatabaseSelector } from '@/app/_components/notion/NotionDatabaseSelector'

export default async function CreateFormPage() {
  // Authenticate user session
  const session = await auth()
  if (!session) {
    redirect('/')
  }

  // Fetch available Notion databases
  const databases = await api.notion
    .listDatabases()
    .then(res => res.databases)
    .catch(() => [])

  return (
    <div className="flex h-screen flex-col">
      {/* Navigation bar */}
      <header className="sticky top-0 z-30 flex h-14 items-center border-b border-border/30 bg-background/95 px-4 backdrop-blur">
        <Link href="/dashboard">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
      </header>

      {/* Main content with Notion database selector */}
      <main className="flex flex-1 items-center justify-center">
        <NotionDatabaseSelector databases={databases} />
      </main>
    </div>
  )
}
