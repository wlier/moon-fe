'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'

export interface Option {
  value: number
  label: string
}

export type OptionsType = Option[] | (() => Promise<Option[]>)

interface SearchableSelectProps {
  mode: 'single' | 'multiple'
  name?: string
  value?: number | number[]
  onChange?: (value: number | number[]) => void
  placeholder?: string
  options?: OptionsType
}

export function SearchableSelect({
  mode = 'single',
  name,
  value: propValue,
  onChange,
  placeholder = 'Select option...',
  options,
}: SearchableSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(propValue)
  const [loadedOptions, setLoadedOptions] = React.useState<Option[]>([])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (!!propValue) {
      setValue(Array.isArray(propValue) ? propValue : [propValue])
    }
  }, [propValue])

  React.useEffect(() => {
    const loadOptions = async () => {
      setLoading(true)
      try {
        const resolvedOptions = Array.isArray(options)
          ? options
          : await options?.()
        setLoadedOptions(resolvedOptions || [])
      } catch (error) {
        console.error('Failed to load options:', error)
        setLoadedOptions([])
      } finally {
        setLoading(false)
      }
    }

    loadOptions()
  }, [options])

  const handleValueChange = (newValue: typeof propValue) => {
    setValue(newValue)
    if (onChange && newValue) {
      onChange(newValue)
    }
  }

  const popoverTriggerRef = React.useRef<HTMLButtonElement>(null)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={popoverTriggerRef}
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[100%] justify-between'
        >
          {mode === 'single' &&
            (value !== undefined ? (
              loadedOptions.find((option) => option.value === value)?.label
            ) : (
              <span className='text-muted-foreground'>{placeholder}</span>
            ))}
          {mode === 'multiple' && Array.isArray(value) && value?.length > 0 ? (
            `${value.length} selected`
          ) : (
            <span className='text-muted-foreground'>{placeholder}</span>
          )}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn('p-0')}
        style={{ width: `${popoverTriggerRef?.current?.clientWidth || 500}px` }}
      >
        <Command>
          <CommandInput placeholder='Search options...' />
          <CommandEmpty>
            {loading ? 'Loading...' : 'No option found.'}
          </CommandEmpty>
          {loadedOptions && (
            <CommandGroup>
              {loadedOptions?.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => {
                    if (Array.isArray(value)) {
                      handleValueChange(
                        value?.includes(option.value)
                          ? value.filter((v) => v !== option.value)
                          : [...value, option.value]
                      )
                      return
                    }
                    handleValueChange([option.value])
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      Array.isArray(value) && value.includes(option.value)
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </Command>
      </PopoverContent>
      {mode === 'multiple' && (
        <div className='flex flex-wrap gap-1 mt-2'>
          {Array.isArray(value) &&
            value?.map((item) => (
              <Badge key={item} variant='secondary' className='text-sm'>
                {loadedOptions.find((option) => option.value === item)?.label}
                <button
                  className='ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleValueChange(value.filter((v) => v !== item))
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={() =>
                    handleValueChange(value.filter((v) => v !== item))
                  }
                >
                  ✕
                </button>
              </Badge>
            ))}
        </div>
      )}
      {name && (
        <input
          type='hidden'
          name={name}
          value={Array.isArray(value) ? value[0] || '' : value}
        />
      )}
    </Popover>
  )
}
