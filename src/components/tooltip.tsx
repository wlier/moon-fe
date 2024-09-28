import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { cn } from '@/lib/utils'
import { CircleHelp } from 'lucide-react'

export interface TooltipProps {
  children?: React.ReactNode
  label?: string | React.ReactNode
  className?: string
}

export function Tooltip({
  children,
  label = <CircleHelp />,
  className,
}: TooltipProps) {
  return (
    <HoverCard>
      <HoverCardTrigger>{label}</HoverCardTrigger>
      <HoverCardContent className={cn(className)}>{children}</HoverCardContent>
    </HoverCard>
  )
}
