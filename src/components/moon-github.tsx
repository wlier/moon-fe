import { Github } from './icon'
import { Button } from './ui/button'

export interface MoonGithubProps {
  children?: React.ReactNode
}
export function MoonGithub({ children }: MoonGithubProps) {
  return (
    <Button variant='ghost'>
      <Github className='h-5 w-5 mr-2' />
      {children}
    </Button>
  )
}
