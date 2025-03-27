'use client'

import { useState, useEffect } from 'react'
import type {
  FormEditorProps,
  FormEditorMode,
  FormField as FormFieldData,
} from '@/app/_components/form-editor/types'
import { FormPreviewToolbar } from '@/app/_components/form-editor/PreviewToolbar'
import { FormField } from '@/app/_components/form-editor/FormField'
import { FieldSidebar } from '@/app/_components/form-editor/FieldSidebar'
import { cn } from '@/lib/utils'

export function FormEditor({ initialData }: FormEditorProps) {
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null)
  const [isPreviewFullscreen, setIsPreviewFullscreen] = useState(false)
  const [previewMode, setPreviewMode] = useState<FormEditorMode>('edit')
  const [formValues, setFormValues] = useState<Record<string, any>>({})
  const [fields, setFields] = useState<FormFieldData[]>(
    initialData?.properties || []
  )

  // Sync preview mode when toggling fullscreen
  useEffect(() => {
    setPreviewMode(isPreviewFullscreen ? 'live' : 'edit')
    if (isPreviewFullscreen) {
      setSelectedFieldId(null)
    }
  }, [isPreviewFullscreen])

  // Fallback UI
  if (!initialData) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">No form data available</p>
      </div>
    )
  }

  // Handle field value changes
  const handleFieldChange = (fieldId: string, value: any) => {
    setFormValues(prev => ({ ...prev, [fieldId]: value }))
  }

  // Select field in sidebar/editor
  const handleFieldSelect = (fieldId: string) => {
    setSelectedFieldId(fieldId)
  }

  // Simulate Notion field refresh
  const handleRefreshFields = async (): Promise<void> => {
    try {
      await new Promise<void>(resolve => {
        setTimeout(() => {
          console.log('Fields refreshed from Notion')
          resolve()
        }, 1000)
      })
    } catch (error) {
      console.error('Error refreshing fields:', error)
    }
  }

  // Toggle "required" state for a field
  const handleToggleRequired = (fieldId: string, required: boolean) => {
    setFields(prev =>
      prev.map(field => (field.id === fieldId ? { ...field, required } : field))
    )
  }

  // Toggle "hidden" state for a field
  const handleToggleVisibility = (fieldId: string, hidden: boolean) => {
    setFields(prev =>
      prev.map(field => (field.id === fieldId ? { ...field, hidden } : field))
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
        />
      )}
      <div
        className={cn(
          'flex flex-1 flex-col overflow-auto',
          isPreviewFullscreen && 'fixed inset-0 z-50 bg-background p-8'
        )}
      >
        <FormPreviewToolbar
          isFullscreen={isPreviewFullscreen}
          onToggleFullscreen={() => setIsPreviewFullscreen(prev => !prev)}
          onTogglePropertiesPanel={() => {}}
          isPropertiesPanelVisible={false}
          showPropertiesPanelToggle={false}
        />

        <div className="flex-1 overflow-auto px-4">
          <div className="mx-auto max-w-lg space-y-6 py-8">
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
          </div>
        </div>
      </div>
    </div>
  )
}
