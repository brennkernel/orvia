'use client'

import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { Check, ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export interface MultiSelectProps {
  value: string[]
  onValueChange: (value: string[]) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  children?: React.ReactNode
}

const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      value,
      onValueChange,
      placeholder = 'Select options',
      className,
      disabled,
      children,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)

    const selectedLabels = React.Children.toArray(children)
      .filter(
        child =>
          React.isValidElement(child) && value.includes(child.props.value)
      )
      .map(child => (React.isValidElement(child) ? child.props.children : ''))

    return (
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        <PopoverPrimitive.Trigger asChild>
          <Button
            ref={ref}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              'flex h-10 w-full items-center justify-between rounded-md border border-input bg-muted px-3 py-2 text-sm ring-offset-background transition-all hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              className
            )}
            disabled={disabled}
          >
            <span className="truncate">
              {selectedLabels.length > 0
                ? selectedLabels.join(', ')
                : placeholder}
            </span>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Content
          align="start"
          className="z-50 mt-1 w-[--radix-popover-trigger-width] rounded-md border border-border bg-popover shadow-md"
        >
          <div className="max-h-60 space-y-1 overflow-auto p-1">
            {React.Children.count(children) > 0 ? (
              React.Children.map(children, child => {
                if (!React.isValidElement(child)) return null

                const element =
                  child as React.ReactElement<MultiSelectItemProps>
                const isSelected = value.includes(element.props.value)

                return React.cloneElement(element, {
                  selected: isSelected,
                  onSelect: () => {
                    const newValue = isSelected
                      ? value.filter(v => v !== element.props.value)
                      : [...value, element.props.value]
                    onValueChange(newValue)
                  },
                })
              })
            ) : (
              <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                No options available
              </div>
            )}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Root>
    )
  }
)

MultiSelect.displayName = 'MultiSelect'

interface MultiSelectItemProps {
  value: string
  children: React.ReactNode
  selected?: boolean
  onSelect?: () => void
}

const MultiSelectItem = ({
  value,
  children,
  selected,
  onSelect,
}: MultiSelectItemProps) => {
  return (
    <div
      key={value}
      onClick={onSelect}
      className={cn(
        'relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors',
        selected
          ? 'bg-primary/20 text-primary-foreground'
          : 'hover:bg-primary/10'
      )}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {selected && <Check className="h-4 w-4" />}
      </span>
      {children}
    </div>
  )
}

MultiSelectItem.displayName = 'MultiSelectItem'

export { MultiSelect, MultiSelectItem }
