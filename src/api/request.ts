import { getLocale } from '@/components/locale-provider'
import { openModal } from '@/components/use-func-modal'
import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'

const host = window.location.origin

const localhost = 'http://localhost:5173'
const localhost5173 = 'http://localhost:5174'
const local127 = 'http://127.0.0.1:5173'
const local192 = 'http://192.168.10.68:5173'

export const hostMap: { [key: string]: string } = {
  [localhost]: 'http://dev-palace.aide-cloud.cn',
  // [local127]: 'http://dev-palace.aide-cloud.cn',
  [local127]: 'http://localhost:8000',
  [local192]: 'http://192.168.10.2:8000',
  [localhost5173]: 'http://192.168.10.2:8000',
}

export const baseURL = hostMap[host] || host

const request = axios.create({
  baseURL: hostMap[host] || host,
  timeout: 10000,
})

export type ErrorResponse = {
  code: number
  message: string
  metadata: Record<string, string>
  reason: string
}

request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error: AxiosError<ErrorResponse>) => {
    const locale = getLocale()
    console.log('error', error)
    const resp = error.response
    // alert(JSON.stringify(resp))
    if (!resp?.data) {
      toast('NET_ERROR', {
        position: 'top-right',
        description: locale === 'en-US' ? 'network anomaly' : '网络异常',
        action: {
          label: 400,
          onClick: () => {},
        },
      })
      return Promise.reject({ message: 'NET_ERROR' })
    }

    const respData = resp.data
    errorHandle(respData)

    return Promise.reject(respData)
  }
)

request.interceptors.request.use(
  (config) => {
    const token = getToken()
    config.headers['Authorization'] = `Bearer ${token}`
    config.headers['Accept-language'] = getLocale()
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const setToken = (token: string) => {
  sessionStorage.setItem('token', token)
}

export const removeToken = () => {
  sessionStorage.removeItem('token')
  window.location.href = '/#/login'
}

export const getToken = () => {
  return sessionStorage.getItem('token') || ''
}

export const isLogin = () => {
  return !!getToken()
}

export type NullObject = Record<string, never>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GET = async <T>(url: string, params?: any) => {
  return request.get<NullObject, T>(url, { params })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const POST = async <T>(url: string, data?: any) => {
  return request.post<NullObject, T>(url, data)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PUT = async <T>(url: string, data?: any) => {
  return request.put<NullObject, T>(url, data)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DELETE = async <T>(url: string, data?: any) => {
  return request.delete<NullObject, T>(url, { data })
}

export default {
  GET,
  POST,
  PUT,
  DELETE,
}

const errorHandle = (err: ErrorResponse) => {
  switch (err.code) {
    case 400:
      openModal({
        title: 'custom err1',
        description: 'xxxx',
        content: 'content',
        duration: 10000,
      })
      // 表单告警
      break
    case 401:
      toast(err.reason, {
        position: 'top-center',
        description: err.message,
      })
      removeToken()
      break
    case 403:
      break
    case 429:
      break
    case 405:
      // 需要有确定或者取消的弹窗， 不操作则一直存在顶层， 底层内容不允许操作
      openModal({
        title: 'custom err',
        description: 'xxxx',
        content: 'content',
      })
      break
    default:
      toast(err.reason, {
        position: 'top-right',
        description: err.message,
        action: {
          label: err.code,
          onClick: () => {},
        },
      })
  }
}
