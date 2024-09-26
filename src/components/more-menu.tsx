import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ActionKey } from '@/api/global'
import { useState } from 'react'

export interface MoreMenuProps {
  options?: {
    label?: React.ReactNode
    value?: ActionKey
    disabled?: boolean
    icon?: React.ReactNode
    // 分割线
    divider?: boolean
    // 危险
    danger?: boolean
  }[]
  onClick?: (value: string | number) => void
}

export function MoreMenu({ options, onClick }: MoreMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className={cn('cursor-pointer', 'text-primary', 'whitespace-nowrap')}
      >
        <a>更多</a>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options?.map((item, index) => {
          if (item.divider) {
            return <DropdownMenuSeparator key={index} />
          }
          return (
            <DropdownMenuItem
              key={index}
              onClick={() => item?.value && onClick?.(item?.value)}
              disabled={item?.disabled}
              className={cn(item?.danger ? 'text-red-500' : '')}
            >
              {item?.icon}
              {item?.label}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
