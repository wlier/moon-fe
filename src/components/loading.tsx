import { cn } from '@/lib/utils'

interface LoaderProps {
  size?: 'small' | 'medium' | 'large'
  color?: 'primary' | 'secondary' | 'white'
  className?: string
}

export default function Loading({
  size = 'medium',
  color = 'primary',
  className,
}: LoaderProps) {
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    medium: 'w-6 h-6 border-2',
    large: 'w-8 h-8 border-3',
  }

  const colorClasses = {
    primary: 'border-primary border-t-primary-foreground',
    secondary: 'border-secondary border-t-secondary-foreground',
    white: 'border-white border-t-transparent',
  }

  return (
    <div
      className={cn(
        'inline-block animate-spin rounded-full',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
    />
  )
}
