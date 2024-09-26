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
  value: T[]
  disabled?: boolean
  onChange: (selected: T[]) => void
  placeholder?: string
  className?: string
}

export function MultiSelect<T>({
  className,
  options,
  value,
  disabled,
  onChange,
  placeholder = 'Select options...',
}: MultiSelectProps<T>) {
  const [open, setOpen] = React.useState(false)

  // Ensure selected is always an array
  const selectedValues = Array.isArray(value) ? value : []

  const handleUnselect = (item: T) => {
    onChange(selectedValues.filter((i) => i !== item))
  }

  return (
    <Popover open={open && !disabled} onOpenChange={setOpen}>
      <div className='w-full'>
        <PopoverTrigger asChild disabled={disabled} className='w-full'>
          <div
            role='combobox'
            aria-expanded={open}
            className={cn(
              `w-full justify-between flex ${
                disabled ? 'cursor-not-allowed' : ''
              }`,
              'border',
              'rounded-md p-1',
              'items-center',
              className
            )}
          >
            <div className='flex-1 flex-wrap gap-1 h-7 overflow-hidden'>
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
                <span className='text-muted-foreground text-sm m-2'>
                  {placeholder}
                </span>
              )}
            </div>
            <ChevronsUpDown className='h-4 w-4 shrink-0 opacity-50' />
          </div>
        </PopoverTrigger>
        <PopoverContent className='w-[400px] p-0'>
          <Command className='w-full'>
            <CommandInput placeholder='Search options...' className='h-9' />
            <CommandList className='w-full'>
              <CommandEmpty>No option found.</CommandEmpty>
              <CommandGroup className='max-h-64 overflow-auto w-full'>
                {options.map((option, index) => (
                  <CommandItem
                    key={index}
                    onSelect={() => {
                      onChange(
                        selectedValues.includes(option.value)
                          ? selectedValues.filter(
                              (item) => item !== option.value
                            )
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
      </div>
    </Popover>
  )
}
