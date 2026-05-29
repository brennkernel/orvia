import { auth } from '@/server/auth/config'
import { redirect } from 'next/navigation'
import { api } from '@/trpc/server'

import SignOutButton from '@/app/_components/SignOutButton'
import { LoadingNavigationButton } from '@/components/ui/loading-nav-button'

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect('/')
  }

  const authStatus = await api.users.getAuthStatus()
  const displayName = session.user?.name ?? authStatus.email ?? 'there'

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Welcome, {displayName}!</p>
        </div>
        <div className="flex gap-4">
          <LoadingNavigationButton href="/forms/create">
            Select Database
          </LoadingNavigationButton>

          <SignOutButton />
        </div>
      </div>

      <div className="mt-8 rounded-lg border bg-gray-50 p-6">
        <p className="text-center text-gray-500">
          Select an authorized Notion database to begin exploring the prototype.
        </p>
      </div>
    </main>
  )
}
