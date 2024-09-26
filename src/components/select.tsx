import { SelectItem } from '@/api/model-types'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem as SelectTriggerItem,
} from './ui/select'

export interface SelectXProps {
  value?: number
  onChange?: (value: number) => void
  options: SelectItem[]
}

export function SelectX({ value, onChange, options }: SelectXProps) {
  return (
    <Select onValueChange={(val) => onChange?.(+val)} value={`${value}`}>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Select a fruit' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((item) => (
            <SelectTriggerItem key={item.value} value={`${item.value}`}>
              {item.label}
            </SelectTriggerItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
