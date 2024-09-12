import { Badge } from '@/components/ui/badge'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown, X } from 'lucide-react'
import * as React from 'react'

export type Option<T> = {
  label: string
  value: T
}

interface MultiSelectProps<T> {
  options: Option<T>[]
  selected: T[]
  disabled?: boolean
  onChange: (selected: T[]) => void
  placeholder?: string
}

export function MultiSelect<T>({
  options,
  selected,
  disabled,
  onChange,
  placeholder = 'Select options...',
}: MultiSelectProps<T>) {
  const [open, setOpen] = React.useState(false)

  // Ensure selected is always an array
  const selectedValues = Array.isArray(selected) ? selected : []

  const handleUnselect = (item: T) => {
    onChange(selectedValues.filter((i) => i !== item))
  }

  return (
    <Popover open={open && !disabled} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <div
          role='combobox'
          aria-expanded={open}
          className={`w-full justify-between flex ${
            disabled ? 'cursor-not-allowed' : ''
          }`}
        >
          <div className='flex-1 flex-wrap gap-1'>
            {selectedValues.length > 0 ? (
              selectedValues.map((item, index) => (
                <Badge variant='secondary' key={index} className='mr-1 mb-1'>
                  {options.find((option) => option.value === item)?.label}
                  <button
                    className='ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleUnselect(item)
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleUnselect(item)
                    }}
                  >
                    <X className='h-3 w-3 text-muted-foreground hover:text-foreground' />
                  </button>
                </Badge>
              ))
            ) : (
              <span className='text-muted-foreground'>{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className='h-4 w-4 shrink-0 opacity-50' />
        </div>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0'>
        <Command>
          <CommandInput placeholder='Search options...' className='h-9' />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup className='max-h-64 overflow-auto'>
              {options.map((option, index) => (
                <CommandItem
                  key={index}
                  onSelect={() => {
                    onChange(
                      selectedValues.includes(option.value)
                        ? selectedValues.filter((item) => item !== option.value)
                        : [...selectedValues, option.value]
                    )
                    setOpen(true)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectedValues.includes(option.value)
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
