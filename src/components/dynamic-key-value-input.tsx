import React, { useCallback } from 'react'
import { PlusCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface KeyValuePair {
  key: string
  value: string
}

interface DynamicKeyValueInputProps {
  value: KeyValuePair[]
  onChange: (value: KeyValuePair[]) => void
}

export function DynamicKeyValueInput({
  value,
  onChange,
}: DynamicKeyValueInputProps) {
  const addPair = useCallback(() => {
    onChange([...value, { key: '', value: '' }])
  }, [value, onChange])

  const removePair = useCallback(
    (index: number) => {
      onChange(value.filter((_, i) => i !== index))
    },
    [value, onChange]
  )

  const updatePair = useCallback(
    (index: number, field: 'key' | 'value', newValue: string) => {
      const newPairs = [...value]
      newPairs[index][field] = newValue
      onChange(newPairs)
    },
    [value, onChange]
  )

  return (
    <div className='space-y-4'>
      {value.map((pair, index) => (
        <div key={index} className='flex items-end space-x-2'>
          <div className='flex-1'>
            <Label htmlFor={`key-${index}`}>Key</Label>
            <Input
              id={`key-${index}`}
              defaultValue={pair.key}
              onChange={(e) => updatePair(index, 'key', e.target.value)}
              placeholder='Enter key'
            />
          </div>
          <div className='flex-1'>
            <Label htmlFor={`value-${index}`}>Value</Label>
            <Input
              id={`value-${index}`}
              defaultValue={pair.value}
              onChange={(e) => updatePair(index, 'value', e.target.value)}
              placeholder='Enter value'
            />
          </div>
          <Button
            type='button'
            variant='ghost'
            size='icon'
            onClick={() => removePair(index)}
          >
            <X className='h-4 w-4' />
            <span className='sr-only'>Remove pair</span>
          </Button>
        </div>
      ))}
      <Button type='button' variant='outline' onClick={addPair}>
        <PlusCircle className='mr-2 h-4 w-4' />
        Add Key-Value Pair
      </Button>
    </div>
  )
}
