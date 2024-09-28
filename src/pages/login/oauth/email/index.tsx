import {
  CaptchaReply,
  getCaptcha,
  setEmailWithLogin,
  verifyEmail,
} from '@/api/authorization'
import { CaptchaType } from '@/api/enum'
import { ErrorResponse, setToken } from '@/api/request'
import { useTheme } from '@/components/theme-provider'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

let timeout: NodeJS.Timeout | null
export default function EmailVerification() {
  const theme = useTheme()
  const navigator = useNavigate()

  const [captcha, setCaptcha] = useState<CaptchaReply>()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [email, setEmail] = useState('')
  const [oauthID, setOauth] = useState(0)

  const search = window.location.search
  const searchOAuthID = new URLSearchParams(search).get('oauth_id')

  useEffect(() => {
    if (searchOAuthID) {
      setOauth(parseInt(searchOAuthID))
    }
  }, [searchOAuthID])

  useEffect(() => {
    generateCaptcha()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const verificationEmailScheam = z.object({
    email: z.string().email(),
    code: z.string().min(1),
  })

  const setEmailScheam = z.object({
    emailCode: z.string().min(1),
  })

  type VerificationFormData = z.infer<typeof verificationEmailScheam>
  type SetEmailFormData = z.infer<typeof setEmailScheam>

  const verificationForm = useForm<VerificationFormData>({
    resolver: zodResolver(verificationEmailScheam),
    defaultValues: {
      email: '',
      code: '',
    },
  })
  const setEmailForm = useForm<SetEmailFormData>({
    resolver: zodResolver(setEmailScheam),
    defaultValues: {
      emailCode: '',
    },
  })

  const generateCaptcha = () => {
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

  const handleSendCode = (value: VerificationFormData) => {
    setIsLoading(true)
    setError('')
    verifyEmail({
      email: value.email,
      captcha: {
        id: captcha?.id || '',
        code: value.code,
      },
    })
      .then(() => {
        setEmail(value.email)
        setStep(2)
        setSuccess('验证码已发送到您的邮箱，请查收')
      })
      .catch((err: ErrorResponse) => {
        setError(err?.message)
      })
      .finally(() => setIsLoading(false))
  }

  const handleVerifyCode = (value: SetEmailFormData) => {
    setIsLoading(true)
    setError('')

    setEmailWithLogin({
      email: email,
      code: value.emailCode,
      oauthID: oauthID,
    })
      .then((res) => {
        setSuccess('邮箱验证成功！')
        setToken(res.token)
        navigator('/monitor/alarm')
      })
      .catch((err: ErrorResponse) => {
        setError(
          err?.metadata?.['code'] || err?.message || '验证码不正确，请重新输入'
        )
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-background rounded-lg shadow-md'>
      <h1 className='text-2xl font-bold mb-6 text-center'>绑定邮箱</h1>

      {error && step === 1 && (
        <Alert variant='destructive' className='mb-4'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>错误</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert
          variant='default'
          className='mb-4 bg-green-50 text-green-700 border-green-200'
        >
          <CheckCircle2 className='h-4 w-4' />
          <AlertTitle>成功</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {step === 1 && (
        <Form {...verificationForm}>
          <form
            onSubmit={verificationForm.handleSubmit(handleSendCode)}
            className='space-y-4'
          >
            <FormField
              control={verificationForm.control}
              name='email'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className='flex items-center space-x-2 gap-1'>
                    <div className='text-red-500'>*</div>
                    <span className='text-sm text-gray-500'>邮箱地址</span>
                    <FormMessage />
                  </FormLabel>

                  <FormControl>
                    <Input
                      autoComplete='off'
                      className={`${fieldState.error ? 'border-red-500' : ''}`}
                      placeholder='请输入您的邮箱地址'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={verificationForm.control}
              name='code'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className='flex items-center space-x-2 gap-1'>
                    <div className='text-red-500'>*</div>
                    <span className='text-sm text-gray-500'>验证码</span>
                    <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <div className='flex items-center space-x-2'>
                      <Input
                        {...field}
                        placeholder='请输入图形验证码'
                        autoComplete='off'
                        maxLength={6}
                        className={`${
                          fieldState.error ? 'border-red-500' : ''
                        }`}
                      />
                      <div
                        className='flex-shrink-0 rounded-md bg-slate-200 cursor-pointer'
                        onClick={generateCaptcha}
                      >
                        <img
                          src={captcha?.captcha}
                          alt='验证码'
                          className='h-10'
                          style={{ aspectRatio: '80/28', objectFit: 'cover' }}
                        />
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full' disabled={isLoading}>
              {isLoading ? '发送中...' : '发送验证码'}
            </Button>
          </form>
        </Form>
      )}
      {step === 2 && (
        <Form {...setEmailForm}>
          <form
            onSubmit={setEmailForm.handleSubmit(handleVerifyCode)}
            className='space-y-4'
          >
            <FormField
              control={setEmailForm.control}
              name='emailCode'
              render={({ field, fieldState }) => (
                <FormItem id='emailCode'>
                  <FormLabel className='flex items-center space-x-2 gap-1'>
                    <div className='text-red-500'>*</div>
                    <span className='text-sm text-gray-500'>验证码</span>
                    <FormMessage />
                    <div className='text-red-500'>{error}</div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='请输入验证码'
                      autoComplete='off'
                      maxLength={6}
                      className={`${
                        fieldState.error || error ? 'border-red-500' : ''
                      }`}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full' disabled={isLoading}>
              {isLoading ? '验证中...' : '验证'}
            </Button>
          </form>
        </Form>
      )}
    </div>
  )
}
