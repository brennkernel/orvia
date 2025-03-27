'use client'

import { useState, useEffect } from 'react'
import type {
  FormEditorProps,
  FormEditorMode,
  FormField as FormFieldData,
} from '@/app/_components/form-editor/types'
import { PreviewToolbar } from '@/app/_components/form-editor/PreviewToolbar'
import { FormField } from '@/app/_components/form-editor/FormField'
import { FieldSidebar } from '@/app/_components/form-editor/FieldSidebar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function FormEditor({ initialData }: FormEditorProps) {
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null)
  const [isPreviewFullscreen, setIsPreviewFullscreen] = useState(false)
  const [previewMode, setPreviewMode] = useState<FormEditorMode>('edit')
  const [formValues, setFormValues] = useState<Record<string, any>>({})
  const [fields, setFields] = useState<FormFieldData[]>(
    initialData?.properties || []
  )
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Update preview mode when toggling fullscreen
  useEffect(() => {
    setPreviewMode(isPreviewFullscreen ? 'live' : 'edit')
    if (isPreviewFullscreen) {
      setSelectedFieldId(null)
    }
  }, [isPreviewFullscreen])

  // Fallback if no initial form data is provided
  if (!initialData) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">No form data available</p>
      </div>
    )
  }

  // Handle individual field changes
  const handleFieldChange = (fieldId: string, value: any) => {
    setFormValues(prev => ({ ...prev, [fieldId]: value }))
  }

  // Select a field to edit
  const handleFieldSelect = (fieldId: string) => {
    setSelectedFieldId(fieldId)
  }

  // Simulate a field refresh from Notion
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

  // Toggle required status for a field
  const handleToggleRequired = (fieldId: string, required: boolean) => {
    setFields(prev =>
      prev.map(field => (field.id === fieldId ? { ...field, required } : field))
    )
  }

  // Toggle hidden status for a field
  const handleToggleVisibility = (fieldId: string, hidden: boolean) => {
    setFields(prev =>
      prev.map(field => (field.id === fieldId ? { ...field, hidden } : field))
    )
  }

  // Submit form and show confirmation
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted with values:', formValues)
    setIsSubmitted(true)
  }

  // Reset form state to initial
  const handleRestart = () => {
    setFormValues({})
    setIsSubmitted(false)
    setSelectedFieldId(null)
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
        <PreviewToolbar
          isFullscreen={isPreviewFullscreen}
          onToggleFullscreen={() => setIsPreviewFullscreen(prev => !prev)}
          onTogglePropertiesPanel={() => {}}
          isPropertiesPanelVisible={false}
          showPropertiesPanelToggle={false}
          isSubmitted={isSubmitted}
          onRestart={handleRestart}
        />

        <div className="flex-1 overflow-auto px-4">
          <div className="mx-auto max-w-lg space-y-6 py-8">
            {isSubmitted ? (
              // Confirmation screen
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
