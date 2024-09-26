import { isLogin, setToken } from '@/api/request'
import { Logo } from '@/assets/logo'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { menus } from '@/config/menus'
import { useI18nConfig } from '@/locale'
import {
  ChevronDown,
  ChevronRight,
  Menu,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  SunMoon,
} from 'lucide-react'
import React, { Suspense, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BreadcrumbMenu } from '../breadcrumb-menu'
import { ComboboxTeam } from '../combobox-team'
import { CommandDialogSearch } from '../command-dialog-search'
import { useLocale } from '../locale-provider'
import { MoonGithub } from '../moon-github'
import { useTheme } from '../theme-provider'
import { UserMenu } from '../user-menu'

interface LayoutProps {
  children: React.ReactNode
}

let timer: NodeJS.Timeout | null = null
export function MoonLayout({ children }: LayoutProps) {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [expandedItems, setExpandedItems] = useState<{
    [key: string]: boolean
  }>({ '/monitor': true })

  const [selectKeys, setSelectKeys] = useState<string[]>([])
  const theme = useTheme()
  const locale = useLocale()
  const i18n = useI18nConfig()
  const location = useLocation()

  const search = window.location.search
  const authToken = new URLSearchParams(search).get('token')

  useEffect(() => {
    if (authToken) {
      setToken(authToken)
      // 清除search
      window.location.search = ''
      return
    }
  }, [authToken])

  if (!isLogin() && !authToken) {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      navigate('/login')
    }, 1000)
  }

  useEffect(() => {
    const pathname = location.pathname
    const parentKeys = menus(i18n)
      .filter((item) => pathname.startsWith(item.key))
      .map((item) => item.key)
      .reverse()
    setExpandedItems(
      parentKeys.reduce((acc, key) => {
        acc[key] = true
        return acc
      }, {} as { [key: string]: boolean })
    )
    setSelectKeys([...parentKeys, pathname])
  }, [i18n, location.pathname])

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const toggleMenuItem = (title: string) => {
    setExpandedItems((prev) => ({ ...prev, [title]: !prev[title] }))
  }

  return (
    <div className='flex flex-col min-h-screen overflow-hidden'>
      <header className='sticky top-0 z-40 bg-background border-b'>
        <div className='container flex h-16 items-center justify-between py-4'>
          <div className='flex items-center gap-2'>
            <Button
              variant='ghost'
              size='icon'
              className='md:hidden'
              onClick={toggleSidebar}
            >
              <Menu className='h-6 w-6' />
              <span className='sr-only'>Toggle sidebar</span>
            </Button>
            <Logo className='h-6 w-6' />
            <h1 className='text-lg font-semibold'>{i18n.APP}</h1>
          </div>
          <nav className='flex items-center gap-1'>
            <Button variant='ghost'>
              <CommandDialogSearch />
            </Button>
            <MoonGithub />
            <Button
              variant='ghost'
              onClick={() =>
                locale.setLocale(locale.locale === 'zh-CN' ? 'en-US' : 'zh-CN')
              }
            >
              {/* <GlobeIcon className='h-5 w-5 mr-2' /> */}
              {i18n.Login.locale[locale.locale]}
            </Button>
            <Button
              variant='ghost'
              onClick={() =>
                theme.setTheme(theme.theme === 'dark' ? 'light' : 'dark')
              }
            >
              {theme.theme === 'dark' ? <Moon /> : <SunMoon />}
            </Button>
            <UserMenu />
          </nav>
        </div>
      </header>

      <div className='flex-1 flex'>
        <aside
          className={`
          fixed inset-y-0 left-0 z-50 bg-background border-r transform transition-all duration-200 ease-in-out
          ${sidebarOpen ? 'w-64' : 'w-20'}
          md:relative md:translate-x-0
        `}
        >
          <div className='flex flex-col h-full'>
            <div className='p-4'>
              <ComboboxTeam />
            </div>
            <ScrollArea className='flex-grow pb-4 overflow-y-auto h-[calc(100vh-16rem)]'>
              <nav className='space-y-2 px-4 w-full'>
                {menus(i18n)?.map((item, index) => (
                  <div key={index} className='space-y-1'>
                    <Button
                      variant={
                        selectKeys.includes(item.key) ? 'secondary' : 'ghost'
                      }
                      className={`w-full justify-between`}
                      onClick={() => item.children && toggleMenuItem(item.key)}
                    >
                      {item.icon}
                      {sidebarOpen && (
                        <>
                          <span className='ml-2 flex-grow text-left'>
                            {item.label}
                          </span>
                          {item.children &&
                            (expandedItems?.[item.key] ? (
                              <ChevronDown size={16} />
                            ) : (
                              <ChevronRight size={16} />
                            ))}
                        </>
                      )}
                    </Button>
                    {sidebarOpen &&
                      item.children &&
                      expandedItems?.[item.key] && (
                        <div className='ml-6 space-y-1'>
                          {item?.children?.map((subItem, subIndex) => (
                            <Button
                              key={subIndex}
                              onClick={() => {
                                setSelectKeys([item.key, subItem.key])
                                navigate(subItem.key)
                              }}
                              variant={
                                selectKeys.includes(subItem.key)
                                  ? 'default'
                                  : 'ghost'
                              }
                              size='sm'
                              className='w-full justify-start'
                            >
                              {subItem.label}
                            </Button>
                          ))}
                        </div>
                      )}
                  </div>
                ))}
              </nav>
            </ScrollArea>
          </div>
        </aside>

        {/* Main content */}
        <main className='flex-1 p-4'>
          <div className='flex items-center gap-1 pb-4'>
            <Button variant='ghost' size='icon' onClick={toggleSidebar}>
              {!sidebarOpen ? (
                <PanelLeftOpen className='h-6 w-6' />
              ) : (
                <PanelLeftClose className='h-6 w-6' />
              )}
              <span className='sr-only'>Toggle sidebar</span>
            </Button>
            <BreadcrumbMenu className='pt-1 pb-1' menus={menus(i18n)} />
          </div>

          <div
            className={`overflow-y-auto overflow-x-hidden transition-all duration-200 ease-in-out max-h-[calc(100vh-12rem)]`}
          >
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className='bg-background border-t py-4'>
        <div className='container flex items-center justify-between'>
          <p className='text-sm text-muted-foreground'>
            {i18n.Layout.footer.copyright} {i18n.Layout.footer.rights}
          </p>
          <nav className='flex gap-4'>
            <a
              href='#'
              className='text-sm text-muted-foreground hover:underline'
            >
              {i18n.Layout.footer.privacyPolicy}
            </a>
            <a
              href='#'
              className='text-sm text-muted-foreground hover:underline'
            >
              {i18n.Layout.footer.termsService}
            </a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
