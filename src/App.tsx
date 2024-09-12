import { ThemeProvider } from '@/components/theme-provider'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { routes } from './config/routes'

function App() {
  return (
    <>
      <ThemeProvider>
        <RouterProvider router={createHashRouter(routes)} />
      </ThemeProvider>
    </>
  )
}

export default App
