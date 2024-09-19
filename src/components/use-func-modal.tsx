import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useI18nConfig } from '@/locale'
import React, { useCallback, useState } from 'react'
import { Button } from './ui/button'

type ModalOptions = {
  title: string
  description: string
  content: React.ReactNode
  duration?: number
  onConfirm?: () => Promise<void>
  onCancel?: () => void
}

type ModalContextType = {
  openModal: (options: ModalOptions) => void
  closeModal: () => void
  duration: number
}

const ModalContext = React.createContext<ModalContextType | undefined>(
  undefined
)

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const i18n = useI18nConfig()
  const [isOpen, setIsOpen] = useState(true)
  const [modalContent, setModalContent] = useState<ModalOptions | null>(null)
  const [duration, setDuration] = useState(0)
  const openModal = useCallback((options: ModalOptions) => {
    setModalContent(options)
    setDuration(options.duration || 0)
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
    setModalContent(null)
  }, [])

  // 监听自定义事件
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  window.addEventListener('openModal', (event: any) => {
    const options = event?.['detail']
    openModal(options)
  })

  React.useEffect(() => {
    if (modalContent && modalContent?.duration) {
      const timer = setTimeout(() => {
        setDuration(duration - 100)
        if (duration <= 0) {
          closeModal()
        }
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [modalContent, duration])

  return (
    <ModalContext.Provider value={{ openModal, closeModal, duration }}>
      {children}
      {modalContent && (
        <AlertDialog open={isOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {modalContent.title}
                {duration > 0 && (
                  <div className='float-right'>
                    <span className='text-red-500'>{duration / 1000}s</span>
                  </div>
                )}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {modalContent.description}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className='mt-4'>{modalContent.content}</div>
            {(modalContent?.duration || 0) <= 0 && (
              <AlertDialogFooter>
                <AlertDialogCancel>
                  <Button
                    variant='secondary'
                    onClick={() => {
                      modalContent.onCancel?.()
                      closeModal()
                    }}
                  >
                    {i18n.HookModal.cancel}
                  </Button>
                </AlertDialogCancel>
                <AlertDialogAction>
                  <Button
                    onClick={async () => {
                      await modalContent.onConfirm?.()
                      closeModal()
                    }}
                  >
                    {i18n.HookModal.confirm}
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            )}
          </AlertDialogContent>
        </AlertDialog>
      )}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = React.useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}

export const openModal = (options: ModalOptions) => {
  const event = new CustomEvent('openModal', { detail: options })
  window.dispatchEvent(event)
}
