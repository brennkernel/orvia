// ─── Core Types ────────────────────────────────────────────────────────────────

export interface FormField {
  id: string
  name: string
  type: string
  options?: Array<{ id: string; name: string; color?: string }> | null
  required?: boolean
  [key: string]: any
}

export interface DatabaseSchema {
  id: string
  title: string
  properties: FormField[]
}

export type FormEditorMode = 'edit' | 'live'

// ─── Main Editor ───────────────────────────────────────────────────────────────

export interface FormEditorProps {
  initialData: DatabaseSchema
}

// ─── Preview Toolbar ──────────────────────────────────────────────────────────

export interface PreviewToolbarProps {
  isFullscreen: boolean
  onToggleFullscreen: () => void
  onTogglePropertiesPanel?: () => void
  isPropertiesPanelVisible?: boolean
  showPropertiesPanelToggle?: boolean
  isSubmitted?: boolean
  onRestart?: () => void
}

// ─── Field Rendering ──────────────────────────────────────────────────────────

export interface FormFieldProps {
  field: FormField
  isSelected?: boolean
  onClick?: () => void
  value?: any
  onChange?: (value: any) => void
  mode?: FormEditorMode
}

export interface FieldInputProps {
  field: FormField
  isSelected?: boolean
  value?: any
  onChange?: (value: any) => void
  mode?: FormEditorMode
}

// ─── Sidebar & FieldRow ───────────────────────────────────────────────────────

export interface FieldSidebarProps {
  fields: FormField[]
  selectedFieldId: string | null
  onFieldSelect: (id: string) => void
  onRefreshFields?: () => Promise<void>
  onToggleRequired?: (fieldId: string, required: boolean) => void
  onToggleVisibility?: (fieldId: string, hidden: boolean) => void
  onRenameField?: (fieldId: string, newName: string) => void
}

export interface FieldRowProps {
  field: FormField
  isSelected: boolean
  isEditing: boolean
  isHidden: boolean
  editingName: string
  onClick: () => void
  onStartEditing: (id: string, name: string, e: React.MouseEvent) => void
  onRename: (e?: React.FormEvent) => void
  onKeyDown: (e: React.KeyboardEvent) => void
  onToggleRequired: (
    fieldId: string,
    required: boolean,
    e: React.MouseEvent
  ) => void
  onToggleVisibility: (
    fieldId: string,
    hidden: boolean,
    e: React.MouseEvent
  ) => void
  editInputRef: React.RefObject<HTMLInputElement>
  nameRef: (el: HTMLSpanElement | null) => void
}
