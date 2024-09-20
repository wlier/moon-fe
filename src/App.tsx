import { ThemeProvider } from '@/components/theme-provider'
import { Suspense } from 'react'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { LocaleProvider } from './components/locale-provider'
import { Toaster } from './components/ui/sonner'
import { ModalProvider } from './components/use-func-modal'
import { routes } from './config/routes'
import { CreateTeamModalProvider } from './components/combobox-team'

function App() {
  return (
    <>
      <ThemeProvider>
        <LocaleProvider>
          <ModalProvider>
            <CreateTeamModalProvider>
              <Suspense fallback={<div>loading...</div>}>
                <RouterProvider router={createHashRouter(routes)} />
                <Toaster />
              </Suspense>
            </CreateTeamModalProvider>
          </ModalProvider>
        </LocaleProvider>
      </ThemeProvider>
    </>
  )
}

export default App
