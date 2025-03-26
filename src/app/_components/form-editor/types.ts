// Field definition (based on Notion property types)
export interface FormField {
  id: string
  name: string
  type: string
  options?: Array<{ id: string; name: string; color?: string }> | null
  required?: boolean
  [key: string]: any
}

// Basic schema shape
export interface DatabaseSchema {
  id: string
  title: string
  properties: FormField[]
}

// Editor modes
export type FormEditorMode = 'edit' | 'live'

// Props for the main editor component
export interface FormEditorProps {
  initialData: DatabaseSchema
}

// Props for the preview toolbar in the editor
export interface FormPreviewToolbarProps {
  isFullscreen: boolean
  onToggleFullscreen: () => void
  onTogglePropertiesPanel?: () => void
  isPropertiesPanelVisible?: boolean
  showPropertiesPanelToggle?: boolean
}

// Props for rendering individual form fields
export interface FormFieldProps {
  field: FormField
  isSelected?: boolean
  onClick?: () => void
  value?: any
  onChange?: (value: any) => void
  mode?: FormEditorMode
}

// Props for field inputs
export interface FieldInputProps {
  field: FormField
  isSelected?: boolean
  value?: any
  onChange?: (value: any) => void
  mode?: FormEditorMode
}
