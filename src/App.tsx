import { Layout } from '@/components/layout'
import { ThemeProvider } from '@/components/theme-provider'

function App() {
  return (
    <>
      <ThemeProvider>
        <Layout>
          <h1 className='text-2xl font-bold mb-4'>Welcome to the Homepage</h1>
          <p>This is the main content of your page.</p>
        </Layout>
      </ThemeProvider>
    </>
  )
}

export default App
