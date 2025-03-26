'use client'

import { useState, useEffect } from 'react'
import type {
  FormEditorProps,
  FormEditorMode,
} from '@/app/_components/form-editor/types'
import { FormPreviewToolbar } from '@/app/_components/form-editor/FormPreviewToolbar'
import { FormField } from '@/app/_components/form-editor/FormField'
import { cn } from '@/lib/utils'

export function FormEditor({ initialData }: FormEditorProps) {
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null)
  const [isPreviewFullscreen, setIsPreviewFullscreen] = useState(false)
  const [previewMode, setPreviewMode] = useState<FormEditorMode>('edit')
  const [formValues, setFormValues] = useState<Record<string, any>>({})

  const formData = initialData

  // Sync preview mode when toggling fullscreen
  useEffect(() => {
    setPreviewMode(isPreviewFullscreen ? 'live' : 'edit')

    if (isPreviewFullscreen) {
      setSelectedFieldId(null)
    }
  }, [isPreviewFullscreen])

  // Graceful fallback if no form data is passed
  if (!formData) {
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

  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden bg-background p-4 text-foreground">
      <div
        className={cn(
          'flex flex-1 flex-col overflow-auto',
          isPreviewFullscreen && 'fixed inset-0 z-50 bg-background p-8'
        )}
      >
        {/* Toolbar (fullscreen toggle only) */}
        <FormPreviewToolbar
          isFullscreen={isPreviewFullscreen}
          onToggleFullscreen={() => setIsPreviewFullscreen(prev => !prev)}
          onTogglePropertiesPanel={() => {}}
          isPropertiesPanelVisible={false}
          showPropertiesPanelToggle={false}
        />

        {/* Form layout */}
        <div className="flex-1 overflow-auto px-4">
          <div className="mx-auto max-w-lg space-y-6 py-8">
            {formData.properties.map(field => (
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
