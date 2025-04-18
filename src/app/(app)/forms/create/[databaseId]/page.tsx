import { auth } from '@/server/auth/config'
import { redirect } from 'next/navigation'
import { api } from '@/trpc/server'
import { FormEditor } from '@/app/_components/form-editor/FormEditor'
import { EditorNavbar } from '@/app/_components/form-editor/EditorNavbar'

interface EditorPageProps {
  params: Promise<{ databaseId: string }>
}

interface DatabaseSchema {
  id: string
  title: string
  properties: Array<{
    id: string
    name: string
    type: string
    options: Array<{ id: string; name: string; color?: string }> | null
    [key: string]: any
  }>
}

export default async function FormEditorPage({ params }: EditorPageProps) {
  // Authenticate user session
  const session = await auth()
  if (!session) {
    redirect('/')
  }

  // Extract databaseId from route parameters
  const { databaseId } = await params

  // Fetch database schema from Notion, fallback to an empty structure if it fails
  const databaseSchema: DatabaseSchema = await api.notion
    .getDatabaseSchema({ databaseId })
    .catch(() => ({
      id: databaseId,
      title: 'Untitled Form',
      properties: [],
    }))

  return (
    <div className="flex h-screen flex-col">
      {/* Editor navbar displaying the database title and actions */}
      <EditorNavbar formTitle={databaseSchema.title} />

      {/* Main editor content */}
      <main className="flex-1 overflow-auto">
        <FormEditor initialData={databaseSchema} />
      </main>
    </div>
  )
}
