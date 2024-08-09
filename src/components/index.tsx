import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { GlobeIcon, MoonIcon, MountainIcon } from './icon'

export function Login() {
  return (
    <div className='flex min-h-[100dvh] bg-background'>
      <div className='hidden w-1/2 bg-primary p-12 text-primary-foreground md:flex flex-col justify-center items-start space-y-6'>
        <div className='flex items-center space-x-2'>
          <MountainIcon className='h-8 w-8 absolute top-6 left-6' />
          <span className='text-2xl font-bold ml-2'>Acme Inc</span>
        </div>
        <h1 className='text-4xl font-bold'>Welcome to our App</h1>
        <p className='text-xl'>Sign in to access all the features.</p>
      </div>
      <div className='flex w-full items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 md:w-1/2'>
        <div className='mx-auto w-full max-w-md space-y-8'>
          <div>
            <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-foreground'>
              Sign in to your account
            </h2>
          </div>
          <form className='space-y-6' action='#' method='POST'>
            <div>
              <Label htmlFor='email' className='sr-only'>
                Email address
              </Label>
              <Input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                required
                className='relative block w-full appearance-none rounded-t-md border border-muted py-3 px-4 text-foreground placeholder-muted-foreground focus:z-10 focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm'
                placeholder='Email address'
                style={{}}
              />
            </div>
            <div>
              <Label htmlFor='password' className='sr-only'>
                Password
              </Label>
              <Input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                className='relative block w-full appearance-none rounded-b-md border border-muted py-3 px-4 text-foreground placeholder-muted-foreground focus:z-10 focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm'
                placeholder='Password'
                style={{}}
              />
            </div>
            <div>
              <Label htmlFor='captcha' className='sr-only'>
                Captcha
              </Label>
              <div className='flex items-center'>
                <Input
                  id='captcha'
                  name='captcha'
                  type='text'
                  required
                  className='relative block w-full appearance-none rounded-md border border-muted py-3 px-4 text-foreground placeholder-muted-foreground focus:z-10 focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm'
                  placeholder='Enter captcha'
                />
                <div className='ml-4 bg-muted px-4 py-2 rounded-md'>
                  <img
                    src='/placeholder.svg'
                    width='100'
                    height='40'
                    alt='Captcha'
                    style={{ aspectRatio: '100/40', objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <Checkbox
                  id='remember-me'
                  name='remember-me'
                  className='h-4 w-4 rounded border-muted focus:ring-primary'
                />
                <Label
                  htmlFor='remember-me'
                  className='ml-2 block text-sm text-muted-foreground'
                >
                  Remember me
                </Label>
              </div>
              <div className='text-sm'>
                <a
                  href='#'
                  className='font-medium text-primary hover:text-primary/80'
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <Button
                type='submit'
                className='group relative flex w-full justify-center rounded-md border border-transparent bg-primary py-3 px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
              >
                Sign in
              </Button>
            </div>
          </form>
          <div className='text-center'>
            <a
              href='#'
              className='font-medium text-primary hover:text-primary/80'
            >
              Don't have an account? Sign up
            </a>
          </div>
        </div>
      </div>
      <div className='absolute top-6 right-6 flex items-center space-x-4 justify-end'>
        <Button variant='secondary'>
          <GlobeIcon className='h-5 w-5 mr-2' />
          English
        </Button>
        <Button variant='secondary'>
          <MoonIcon className='h-5 w-5 mr-2' />
          Dark Mode
        </Button>
      </div>
    </div>
  )
}
