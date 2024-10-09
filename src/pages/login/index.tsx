import { CaptchaReply, getCaptcha, login } from '@/api/authorization'
import { CaptchaType } from '@/api/enum'
import { baseURL, setToken } from '@/api/request'
import { Logo } from '@/assets/logo'
import { Gitee, Github, GlobeIcon } from '@/components/icon'
import { useLocale } from '@/components/locale-provider'
import { MoonGithub } from '@/components/moon-github'
import { useTheme } from '@/components/theme-provider'
import { Tooltip } from '@/components/tooltip'
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { hashMd5 } from '@/lib/hash'
import { cn } from '@/lib/utils'
import { useI18nConfig } from '@/locale'
import { zodResolver } from '@hookform/resolvers/zod'
import { Moon, SunMoon } from 'lucide-react'
import { useEffect, useState } from 'react'
import cookie from 'react-cookies'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

let timeout: NodeJS.Timeout | null
export default function Login() {
  const theme = useTheme()
  const locale = useLocale()
  const i18n = useI18nConfig()
  const navigator = useNavigate()

  const loginFormSchema = z.object({
    username: z
      .string()
      .min(1, i18n.Login.form.error.usernameMin)
      .max(20, i18n.Login.form.error.usernameMax),
    password: z
      .string()
      .min(1, i18n.Login.form.error.passwordMin)
      .max(20, i18n.Login.form.error.passwordMax),
    captcha: z
      .string()
      .min(1, i18n.Login.form.error.captchamMin)
      .max(10, i18n.Login.form.error.captchaMax),
  })

  type LoginFormValuesType = z.infer<typeof loginFormSchema>

  const [captcha, setCaptcha] = useState<CaptchaReply>()
  const [remeber, setRemeber] = useState<boolean>(!!cookie.load('remeber'))
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const form = useForm<LoginFormValuesType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { ...cookie.load('account'), captcha: '' },
  })

  const onSubmit = (value: LoginFormValuesType) => {
    if (cookie.load('remeber')) {
      cookie.save('account', value, {
        path: '/',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      })
    } else {
      cookie.remove('account')
    }
    if (!captcha) {
      setErrors({ code: '请先获取验证码' })
      return
    }
    login({
      username: value.username,
      password: hashMd5(value.password),
      captcha: { code: value.captcha, id: captcha?.id },
    })
      .then((resp) => {
        setToken(resp.token)
        // 重定向
        navigator('/monitor/alarm')
      })
      .catch((err) => {
        setErrors(err?.metadata)
      })
  }

  const handlRemember = (checked: boolean | null) => {
    setRemeber(checked ?? false)
    if (checked) {
      cookie.save('remeber', 'true', {
        path: '/',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      })
      return
    }
    cookie.remove('remeber')
  }

  const handleCaptcha = () => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      getCaptcha({
        captchaType: CaptchaType.CaptchaTypeImage,
        width: 100,
        height: 40,
        theme: theme.theme === 'dark' ? 'light' : 'dark',
      }).then((res) => {
        setCaptcha(res)
      })
    }, 200)
  }

  useEffect(() => {
    // 获取验证码
    handleCaptcha()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='flex w-full min-h-[100dvh] bg-background'>
      <BackgroundBeamsWithCollision className='hidden md:flex w-1/2 min-h-[100dvh]'>
        <div className='hidden w-full h-full bg-primary p-12 text-primary-foreground md:flex flex-col justify-center items-start space-y-6'>
          <div className='flex items-center space-x-2'>
            <Logo className='h-8 w-8 absolute top-6 left-6' />
            <span className='absolute text-2xl font-bold ml-2 top-6 left-14'>
              {i18n.APP}
            </span>
          </div>
          <h1 className='text-4xl font-bold'>{i18n.Login.welcome.title}</h1>
          <p className='text-xl'>{i18n.Login.welcome.subtitle}</p>
        </div>
      </BackgroundBeamsWithCollision>

      <div className='flex w-full items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 md:w-1/2'>
        <div className='mx-auto w-full max-w-md space-y-8'>
          <div>
            <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-foreground'>
              {i18n.Login.form.title}
            </h2>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name='username'
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className='flex items-center space-x-2 gap-1'>
                      <div className='text-red-500'>*</div>
                      {i18n.Login.form.username}
                      <Tooltip className={cn('ml-2', 'text-sm')} />
                      <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={`${
                          fieldState.error ? 'border-red-500' : ''
                        }`}
                        placeholder={i18n.Login.form.usernamePlaceholder}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className='flex items-center space-x-2 gap-1'>
                      <div className='text-red-500'>*</div>
                      {i18n.Login.form.password}
                      <FormMessage />
                      <div className='text-red-500'>{errors?.['password']}</div>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        className={`${
                          fieldState.error ? 'border-red-500' : ''
                        }`}
                        placeholder={i18n.Login.form.passwordPlaceholder}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='captcha'
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className='flex items-center space-x-2 gap-1'>
                      <div className='text-red-500'>*</div>
                      {i18n.Login.form.captcha}
                      <FormMessage />
                      <div className='text-red-500'>
                        {errors?.['captcha.id']}
                        {errors?.['captcha.code']}
                        {errors?.['code']}
                      </div>
                    </FormLabel>
                    <div className='flex items-center space-x-2'>
                      <FormControl>
                        <Input
                          {...field}
                          type='text'
                          className={`w-[80%] ${
                            fieldState.error ||
                            errors?.['captcha.code'] ||
                            errors?.['captcha.id'] ||
                            errors?.['code']
                              ? 'border-red-500'
                              : ''
                          }`}
                          placeholder={i18n.Login.form.captchaPlaceholder}
                        />
                      </FormControl>
                      <div className='ml-4 bg-slate-200 px-4 py-2 rounded-md'>
                        <img
                          className='cursor-pointer'
                          src={captcha?.captcha}
                          onClick={handleCaptcha}
                          width='80'
                          height='28'
                          alt='Captcha'
                          style={{ aspectRatio: '80/28', objectFit: 'cover' }}
                        />
                      </div>
                    </div>
                  </FormItem>
                )}
              />
              <div>
                <Button
                  type='submit'
                  className='group relative flex w-full justify-center rounded-md border border-transparent bg-primary py-3 px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
                >
                  {i18n.Login.form.login}
                </Button>
              </div>
            </form>
          </Form>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <Checkbox
                checked={remeber}
                onCheckedChange={(e) => handlRemember(e as boolean)}
                className='h-4 w-4 rounded border-muted focus:ring-primary'
              />
              <Label
                htmlFor='remember-me'
                className='ml-2 block text-sm text-muted-foreground'
                onClick={() => handlRemember(!remeber)}
              >
                {i18n.Login.form.rememberMe}
              </Label>
            </div>
            <div className='text-sm'>
              <a
                href='#'
                className='font-medium text-primary hover:text-primary/80'
              >
                {i18n.Login.form.forgetPassword}
              </a>
            </div>
          </div>

          <div className='mt-6'>
            <p className='text-center text-sm text-gray-400 mb-4'>
              {i18n.Login.form.loginFooter}
              <a
                href='/#/register'
                className='font-medium text-primary hover:text-primary/80'
              >
                {i18n.Login.form.registerLink}
              </a>
              {i18n.Login.form.loginOther}
            </p>
            <div className='flex justify-between space-x-4'>
              <Button
                variant='outline'
                className='w-1/2'
                onClick={() => {
                  window.location.href = `${baseURL}/auth/github`
                }}
              >
                <Github className='mr-2 h-4 w-4' />
                GitHub
              </Button>

              <Button
                variant='outline'
                className='w-1/2'
                onClick={() => {
                  window.location.href = `${baseURL}/auth/gitee`
                }}
              >
                <Gitee className='mr-2 h-4 w-4' />
                Gitee
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className='absolute top-6 right-6 flex items-center space-x-4 justify-end'>
        <MoonGithub>Github</MoonGithub>
        <Button
          variant='ghost'
          onClick={() =>
            locale.setLocale(locale.locale === 'zh-CN' ? 'en-US' : 'zh-CN')
          }
        >
          <GlobeIcon className='h-5 w-5 mr-2' />
          {i18n.Login.locale[locale.locale]}
        </Button>
        <Button
          variant='ghost'
          onClick={() =>
            theme.setTheme(theme.theme === 'dark' ? 'light' : 'dark')
          }
        >
          {theme.theme === 'dark' ? (
            <Moon className='h-5 w-5 mr-2' />
          ) : (
            <SunMoon className='h-5 w-5 mr-2' />
          )}
          {i18n.Login.mode[theme.theme]}
        </Button>
      </div>
    </div>
  )
}
