'use client'

import { useState, useEffect } from 'react'
import { api } from '@/trpc/react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

import type {
  FormEditorProps,
  FormEditorMode,
  FormField as FormFieldData,
} from '@/app/_components/form-editor/types'

import { PreviewToolbar } from '@/app/_components/form-editor/PreviewToolbar'
import { FieldSidebar } from '@/app/_components/form-editor/FieldSidebar'
import { FormField } from '@/app/_components/form-editor/FormField'

export function FormEditor({ initialData }: FormEditorProps) {
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null)
  const [isPreviewFullscreen, setIsPreviewFullscreen] = useState(false)
  const [previewMode, setPreviewMode] = useState<FormEditorMode>('edit')
  const [formValues, setFormValues] = useState<Record<string, any>>({})
  const [fields, setFields] = useState<FormFieldData[]>(initialData.properties)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const { refetch, isFetching } = api.notion.getDatabaseSchema.useQuery(
    { databaseId: initialData.id },
    { enabled: false }
  )

  // Sync fullscreen mode with preview state
  useEffect(() => {
    setPreviewMode(isPreviewFullscreen ? 'live' : 'edit')
    if (isPreviewFullscreen) {
      setSelectedFieldId(null)
    }
  }, [isPreviewFullscreen])

  // Refresh fields from Notion
  const handleRefreshFields = async () => {
    try {
      const { data } = await refetch()
      if (data?.properties) {
        setFields(data.properties)
      }
    } catch (err) {
      console.error('Failed to refresh fields:', err)
    }
  }

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormValues(prev => ({ ...prev, [fieldId]: value }))
  }

  const handleFieldSelect = (fieldId: string) => {
    setSelectedFieldId(fieldId)
  }

  const handleToggleRequired = (fieldId: string, required: boolean) => {
    setFields(prev =>
      prev.map(f => (f.id === fieldId ? { ...f, required } : f))
    )
  }

  const handleToggleVisibility = (fieldId: string, hidden: boolean) => {
    setFields(prev => prev.map(f => (f.id === fieldId ? { ...f, hidden } : f)))
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted with values:', formValues)
    setIsSubmitted(true)
  }

  const handleRestart = () => {
    setFormValues({})
    setIsSubmitted(false)
    setSelectedFieldId(null)
  }

  if (!initialData) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">No form data available</p>
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden bg-background p-4 text-foreground">
      {!isPreviewFullscreen && (
        <FieldSidebar
          fields={fields}
          selectedFieldId={selectedFieldId}
          onFieldSelect={handleFieldSelect}
          onRefreshFields={handleRefreshFields}
          onToggleRequired={handleToggleRequired}
          onToggleVisibility={handleToggleVisibility}
          isRefreshing={isFetching}
        />
      )}

      <div
        className={cn(
          'flex flex-1 flex-col overflow-auto',
          isPreviewFullscreen && 'fixed inset-0 z-50 bg-background p-8'
        )}
      >
        <PreviewToolbar
          isFullscreen={isPreviewFullscreen}
          onToggleFullscreen={() => setIsPreviewFullscreen(prev => !prev)}
          onTogglePropertiesPanel={() => {}}
          isPropertiesPanelVisible={false}
          showPropertiesPanelToggle={false}
          isSubmitted={isSubmitted}
          onRestart={handleRestart}
        />

        <div className="flex-1 overflow-auto px-2">
          <div
            className={cn(
              'max-w-lg space-y-6 py-8',
              !isPreviewFullscreen ? 'ml-32 mr-auto' : 'mx-auto'
            )}
          >
            {isSubmitted ? (
              <div className="space-y-6 text-left">
                <h2 className="text-xl font-semibold text-foreground">
                  Thanks! Your response has been saved.
                </h2>
                <p className="text-muted-foreground">
                  This form is connected to your Notion database. You can
                  preview how data is collected and stored.
                </p>
                <p className="text-sm text-muted-foreground">
                  Want to try again? Just hit the restart button above.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div className="space-y-6">
                  {fields
                    .filter(field => !field.hidden)
                    .map(field => (
                      <FormField
                        key={field.id}
                        field={field}
                        isSelected={
                          previewMode === 'edit' && selectedFieldId === field.id
                        }
                        onClick={() =>
                          previewMode === 'edit' && setSelectedFieldId(field.id)
                        }
                        value={formValues[field.id]}
                        onChange={value => handleFieldChange(field.id, value)}
                        mode={previewMode}
                      />
                    ))}
                  <div className="mt-8 flex flex-col items-center">
                    <Button type="submit" className="px-8">
                      Submit
                    </Button>
                    <div className="mt-3 text-xs text-muted-foreground">
                      Powered by FormFlow
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
