'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, RefreshCw, Info } from 'lucide-react'
import type React from 'react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { cn } from '@/lib/utils'
import type { FieldSidebarProps } from '@/app/_components/form-editor/types'
import { FieldRow } from '@/app/_components/form-editor/FieldRow'

export function FieldSidebar({
  fields,
  selectedFieldId,
  onFieldSelect,
  onRefreshFields,
  onToggleRequired,
  onToggleVisibility,
  onRenameField,
  isRefreshing = false,
}: FieldSidebarProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const editInputRef = useRef<HTMLInputElement>(null)
  const fieldNameRefs = useRef<Record<string, HTMLSpanElement | null>>({})

  // Auto-size editing input to match field name width
  useEffect(() => {
    if (
      editingFieldId &&
      editInputRef.current &&
      fieldNameRefs.current[editingFieldId]
    ) {
      const width = fieldNameRefs.current[editingFieldId]?.offsetWidth || 100
      editInputRef.current.style.width = `${width + 12}px`
    }
  }, [editingFieldId])

  const filteredFields = fields.filter(field =>
    field.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleToggleRequired = (
    fieldId: string,
    currentRequired: boolean,
    e: React.MouseEvent
  ) => {
    e.stopPropagation()
    onToggleRequired?.(fieldId, !currentRequired)
  }

  const handleToggleVisibility = (
    fieldId: string,
    currentHidden: boolean,
    e: React.MouseEvent
  ) => {
    e.stopPropagation()
    if (!currentHidden && onToggleRequired) {
      onToggleRequired(fieldId, false)
    }
    onToggleVisibility?.(fieldId, !currentHidden)
  }

  const startEditing = (
    fieldId: string,
    currentName: string,
    e: React.MouseEvent
  ) => {
    e.stopPropagation()
    setEditingFieldId(fieldId)
    setEditingName(currentName)
    setTimeout(() => {
      editInputRef.current?.focus()
    }, 10)
  }

  const saveFieldName = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (editingFieldId && editingName.trim()) {
      onRenameField?.(editingFieldId, editingName.trim())
    }
    setEditingFieldId(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setEditingFieldId(null)
  }

  return (
    <div className="mr-4 flex h-full w-[280px] flex-col rounded-sm bg-card/90 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pb-3 pt-4">
        <h2 className="text-sm font-medium text-muted-foreground">
          Form Fields
        </h2>

        {onRefreshFields && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={onRefreshFields}
                  disabled={isRefreshing}
                >
                  <RefreshCw
                    className={cn(
                      'h-4 w-4 text-muted-foreground',
                      isRefreshing && 'animate-spin'
                    )}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Refresh Notion Database</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      {/* Divider */}
      <div className="ml-3 h-[1px] w-3/4 bg-gradient-to-r from-border to-transparent" />

      {/* Search */}
      <div className="px-4 pb-2 pt-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search fields..."
            className="h-9 border-input bg-muted/60 pl-8 text-sm focus:border-primary"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Field list */}
      <ScrollArea className="flex-1">
        <div className="space-y-1 px-4 py-2">
          {filteredFields.length > 0 ? (
            filteredFields.map(field => {
              const isEditing = editingFieldId === field.id
              const isSelected = selectedFieldId === field.id
              const isHidden = !!field.hidden

              return (
                <FieldRow
                  key={field.id}
                  field={field}
                  isEditing={isEditing}
                  isSelected={isSelected}
                  isHidden={isHidden}
                  editingName={editingName}
                  onClick={() => !isEditing && onFieldSelect(field.id)}
                  onStartEditing={startEditing}
                  onRename={saveFieldName}
                  onKeyDown={handleKeyDown}
                  onToggleRequired={handleToggleRequired}
                  onToggleVisibility={handleToggleVisibility}
                  editInputRef={editInputRef}
                  nameRef={el => {
                    fieldNameRefs.current[field.id] = el
                  }}
                />
              )
            })
          ) : (
            <div className="py-6 text-center text-muted-foreground">
              No fields found matching "{searchTerm}"
            </div>
          )}
        </div>
      </ScrollArea>
      {/* Footer warning */}
      <div className="mt-auto pb-4">
        <div className="mx-auto flex w-[92%] items-start gap-2 rounded-sm bg-yellow-300/5 px-3 py-2.5 text-[11.5px] leading-snug text-yellow-300">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-yellow-300" />
          <span>
            Still seeing the field? Make sure it’s deleted in the response DB.
          </span>
        </div>
      </div>
    </div>
  )
}
