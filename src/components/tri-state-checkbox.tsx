import { cn } from '@/lib/utils'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import React, { useState } from 'react'

export interface TriStateCheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string
  checked?: boolean | 'indeterminate'
  onCheckedChange?: (checked: boolean | 'indeterminate') => void
}

const TriStateCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  TriStateCheckboxProps
>(({ className, label, onCheckedChange, checked, ...props }, ref) => {
  const [checkedState, setCheckedState] = useState<boolean | 'indeterminate'>(
    checked || false
  )

  const handleChange = () => {
    let newState: boolean | 'indeterminate'
    if (checkedState === false) {
      newState = 'indeterminate'
    } else if (checkedState === 'indeterminate') {
      newState = true
    } else {
      newState = false
    }
    setCheckedState(newState)
    onCheckedChange?.(newState)
  }

  return (
    <div className='flex items-center space-x-2'>
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
          'peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
          className
        )}
        checked={checkedState}
        onCheckedChange={handleChange}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          className={cn('flex items-center justify-center text-current')}
        >
          {checkedState === true && <Check className='h-4 w-4' />}
          {checkedState === 'indeterminate' && (
            <div className='h-2 w-2 bg-primary' /> // Small square for indeterminate state
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <label
          htmlFor={props.id}
          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
        >
          {label}
        </label>
      )}
    </div>
  )
})

TriStateCheckbox.displayName = 'TriStateCheckbox'

export default TriStateCheckbox
