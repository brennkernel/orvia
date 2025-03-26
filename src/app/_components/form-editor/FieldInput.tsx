'use client'

import * as React from 'react'
import { useState, useRef } from 'react'

import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CalendarIcon, Upload } from 'lucide-react'
import { format } from 'date-fns'

import { cn } from '@/lib/utils'
import { MultiSelect, MultiSelectItem } from '@/components/ui/multi-select'
import type { FieldInputProps } from '@/app/_components/form-editor/types'

export function FieldInput({
  field,
  isSelected = false,
  value,
  onChange = () => {},
  mode = 'edit',
}: FieldInputProps) {
  const [date, setDate] = useState<Date | undefined>(value)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<File[]>(value || [])
  const [dragActive, setDragActive] = useState(false)

  // Handle file selection from input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const newFiles = Array.from(e.target.files)
      setFiles(newFiles)
      onChange(newFiles)
    }
  }

  // Handle drag state
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(e.type === 'dragenter' || e.type === 'dragover')
  }

  // Handle drop file
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files?.length) {
      const newFiles = Array.from(e.dataTransfer.files)
      setFiles(newFiles)
      onChange(newFiles)
    }
  }

  // Render inputs based on field type
  switch (field.type) {
    case 'title':
    case 'rich_text':
    case 'email':
    case 'url':
    case 'phone_number':
      return (
        <Input
          id={field.id}
          type={
            field.type === 'email'
              ? 'email'
              : field.type === 'url'
                ? 'url'
                : field.type === 'phone_number'
                  ? 'tel'
                  : 'text'
          }
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          className={cn(
            'w-full border-input bg-muted transition-all focus:border-primary focus:ring-1 focus:ring-primary',
            isSelected && 'border-primary/30'
          )}
        />
      )

    case 'number':
      return (
        <Input
          id={field.id}
          type="number"
          value={value || ''}
          onChange={e => onChange(Number.parseFloat(e.target.value))}
          className={cn(
            'w-full border-input bg-muted transition-all focus:border-primary focus:ring-1 focus:ring-primary',
            isSelected && 'border-primary/30'
          )}
        />
      )

    case 'select':
      return (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger
            id={field.id}
            className={cn(
              'w-full border-input bg-muted transition-all focus:border-primary focus:ring-1 focus:ring-primary',
              isSelected && 'border-primary/30'
            )}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="border-border bg-popover">
            {field.options?.map(option => (
              <SelectItem
                key={option.id}
                value={option.id}
                className="cursor-pointer focus:bg-primary/20"
              >
                {option.name}
              </SelectItem>
            )) || <SelectItem value="empty">No options</SelectItem>}
          </SelectContent>
        </Select>
      )

    case 'multi_select':
      return (
        <MultiSelect
          value={value || []}
          onValueChange={onChange}
          placeholder=""
        >
          {field.options?.map(option => (
            <MultiSelectItem key={option.id} value={option.id}>
              {option.name}
            </MultiSelectItem>
          ))}
        </MultiSelect>
      )

    case 'date':
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id={field.id}
              className={cn(
                'w-full justify-start border-input bg-muted text-left font-normal transition-all hover:bg-accent hover:text-foreground',
                isSelected && 'border-primary/30'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>{date ? format(date, 'PPP') : 'Select date'}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto border-border bg-popover p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={selectedDate => {
                setDate(selectedDate)
                onChange(selectedDate)
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      )

    case 'files':
      return (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            'cursor-pointer rounded-md border border-dashed p-6 text-center transition-all',
            dragActive
              ? 'border-primary bg-primary/5'
              : 'border-input bg-muted/50',
            isSelected && !dragActive && 'border-primary/30'
          )}
        >
          <input
            ref={fileInputRef}
            id={field.id}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
          <Upload className="mx-auto mb-2 h-6 w-6 text-muted-foreground" />
          <p className="text-sm text-foreground">
            Click to choose a file or drag here
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Size limit: 5MB — File limit: 10
          </p>

          {files.length > 0 && (
            <div className="mt-3 text-left">
              <p className="mb-1 text-xs font-medium text-foreground">
                Selected files:
              </p>
              <ul className="text-xs text-muted-foreground">
                {files.map((file, i) => (
                  <li key={i} className="truncate">
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )

    case 'checkbox':
      return (
        <label className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Checkbox
            id={field.id}
            checked={value || false}
            onCheckedChange={onChange}
            className={cn(
              'data-[state=checked]:border-primary data-[state=checked]:bg-primary',
              isSelected && 'border-primary/30'
            )}
          />
          {field.name}
          {field.required && <span className="ml-1 text-destructive">*</span>}
        </label>
      )

    default:
      return (
        <Input
          id={field.id}
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          className={cn(
            'w-full border-input bg-muted transition-all focus:border-primary focus:ring-1 focus:ring-primary',
            isSelected && 'border-primary/30'
          )}
        />
      )
  }
}
