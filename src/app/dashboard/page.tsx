import { auth } from '@/server/auth/config'
import { redirect } from 'next/navigation'
import { api } from '@/trpc/server'
import SignOutButton from '@/app/_components/SignOutButton'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect('/')
  }

  const authStatus = await api.users.getAuthStatus()

  return (
    <div className="container mx-auto py-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Welcome, {authStatus.email}!</p>
        </div>
        <div className="flex gap-4">
          <Link href="/forms/create">
            <Button>Create New Form</Button>
          </Link>
          <SignOutButton />
        </div>
      </div>

      {/* Placeholder for future form list */}
      <div className="mt-8 rounded-lg border bg-gray-50 p-6">
        <p className="text-center text-gray-500">
          You don’t have any forms yet. Click "Create New Form" to get started.
        </p>
      </div>
    </div>
  )
}
