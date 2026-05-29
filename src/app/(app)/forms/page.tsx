import { redirect } from 'next/navigation'

export default function FormsPage() {
  // Keep /forms as a safe entry point for the form creation flow.
  redirect('/forms/create')
}
