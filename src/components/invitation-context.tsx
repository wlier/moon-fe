import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { createContext, ReactNode, useContext, useState } from 'react'

type Role = {
  name: string
  description: string
}

type InvitationData = {
  teamName: string
  inviterName: string
  roles: Role[]
}

type InvitationContextType = {
  showInvitation: (data: InvitationData) => void
}

const InvitationContext = createContext<InvitationContextType | undefined>(
  undefined
)

export function InvitationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [invitationData, setInvitationData] = useState<InvitationData | null>(
    null
  )

  const showInvitation = (data: InvitationData) => {
    setInvitationData(data)
    setIsOpen(true)
  }

  const handleAccept = () => {
    // 在这里处理接受邀请的逻辑
    console.log('Invitation accepted')
    setIsOpen(false)
  }

  const handleDecline = () => {
    // 在这里处理拒绝邀请的逻辑
    console.log('Invitation declined')
    setIsOpen(false)
  }

  return (
    <InvitationContext.Provider value={{ showInvitation }}>
      {children}
      {invitationData && (
        <Dialog open={isOpen}>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>团队邀请</DialogTitle>
              <DialogDescription>
                {invitationData.inviterName} 邀请您加入{' '}
                {invitationData.teamName} 团队。
              </DialogDescription>
            </DialogHeader>
            <div className='py-4'>
              <p className='text-sm text-gray-500 mb-2'>您将被授予以下角色：</p>
              <ul className='list-disc list-inside space-y-1'>
                {invitationData.roles.map((role, index) => (
                  <li key={index} className='text-sm'>
                    <span className='font-medium'>{role.name}</span>
                    {role.description && (
                      <span className='text-gray-500'>
                        {' '}
                        - {role.description}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              <p className='text-center text-sm text-gray-500 mt-4'>
                您是否愿意接受这个邀请？
              </p>
            </div>
            <DialogFooter>
              <Button variant='outline' onClick={handleDecline}>
                拒绝
              </Button>
              <Button onClick={handleAccept}>接受</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </InvitationContext.Provider>
  )
}

export function useInvitation() {
  const context = useContext(InvitationContext)
  if (context === undefined) {
    throw new Error('useInvitation must be used within an InvitationProvider')
  }
  return context
}
