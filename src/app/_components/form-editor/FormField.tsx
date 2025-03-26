'use client'

import { cn } from '@/lib/utils'
import { FieldInput } from '@/app/_components/form-editor/FieldInput'
import type { FormFieldProps } from '@/app/_components/form-editor/types'

export function FormField({
  field,
  isSelected = false,
  onClick: onSelect,
  value,
  onChange,
  mode = 'edit',
}: FormFieldProps) {
  const isEditMode = mode === 'edit'

  const handleClick = () => {
    if (isEditMode) onSelect?.()
  }

  return (
    <div className="space-y-1" onClick={handleClick}>
      <div
        className={cn(
          'overflow-hidden rounded-sm transition-all',
          isEditMode && 'hover:bg-card/70',
          isSelected
            ? 'border-primary/70 ring-1 ring-primary'
            : isEditMode &&
                'border-border hover:border-input hover:ring-1 hover:ring-primary/30'
        )}
      >
        {/* Field label */}
        {field.type !== 'checkbox' && (
          <label className="block pl-2.5 pt-2 text-sm font-medium">
            {field.name}
            {field.required && <span className="ml-1 text-destructive">*</span>}
          </label>
        )}

        {/* Field input container */}
        <div className="p-2.5">
          <FieldInput
            field={field}
            isSelected={isSelected}
            value={value}
            onChange={onChange}
            mode={mode}
          />
        </div>
      </div>
    </div>
  )
}
