'use client'

import { useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn, getFieldIcon } from '@/lib/utils'
import { Asterisk, Eye, EyeOff, Settings } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import type { FieldRowProps } from '@/app/_components/form-editor/types'

export function FieldRow({
  field,
  isSelected,
  isEditing,
  isHidden,
  editingName,
  onClick,
  onStartEditing,
  onRename,
  onKeyDown,
  onToggleRequired,
  onToggleVisibility,
  editInputRef,
  nameRef,
}: FieldRowProps) {
  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus()
    }
  }, [isEditing, editInputRef])

  return (
    <div
      className={cn(
        'group relative flex items-center justify-between rounded-md px-2 py-1.5 transition-colors',
        isSelected
          ? 'bg-primary/10 text-foreground'
          : 'text-muted-foreground hover:bg-transparent'
      )}
      onClick={onClick}
    >
      {/* Icon and field name */}
      <div className="flex min-w-0 items-center gap-2">
        <span className="text-primary">{getFieldIcon(field.type)}</span>

        {isEditing ? (
          <form onSubmit={onRename} onClick={e => e.stopPropagation()}>
            <Input
              ref={editInputRef}
              value={editingName}
              onBlur={onRename}
              onKeyDown={onKeyDown}
              autoFocus
              className="h-7 max-w-[140px] truncate rounded-sm bg-muted px-2 py-1 text-sm focus-visible:ring-0"
            />
          </form>
        ) : (
          <span
            ref={nameRef}
            onClick={e => onStartEditing(field.id, field.name, e)}
            className={cn(
              'max-w-[140px] truncate rounded-sm px-2 py-1 text-sm transition-colors',
              'bg-transparent group-hover:bg-muted'
            )}
          >
            {field.name}
          </span>
        )}
      </div>

      {/* Action buttons */}
      <div className="ml-2 flex flex-shrink-0 items-center gap-0.5">
        {!isHidden && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    'h-6 w-6',
                    field.required
                      ? 'text-red-500'
                      : 'text-muted-foreground opacity-0 group-hover:opacity-100'
                  )}
                  onClick={e => onToggleRequired(field.id, !!field.required, e)}
                >
                  <Asterisk className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>
                  {field.required ? 'Make it optional' : 'Make it required'}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  'h-6 w-6',
                  isHidden
                    ? 'text-orange-500'
                    : 'text-muted-foreground opacity-0 group-hover:opacity-100'
                )}
                onClick={e => onToggleVisibility(field.id, isHidden, e)}
              >
                {isHidden ? (
                  <EyeOff className="h-3.5 w-3.5" />
                ) : (
                  <Eye className="h-3.5 w-3.5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{isHidden ? 'Show this field' : 'Hide this field'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-muted-foreground"
          onClick={e => {
            e.stopPropagation()
            onClick()
          }}
        >
          <Settings className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  )
}
