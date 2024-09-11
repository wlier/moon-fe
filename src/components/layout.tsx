import { Logo } from '@/assets/logo'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { menus } from '@/config/menu'
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Menu,
  Moon,
  SunMoon,
} from 'lucide-react'
import React, { useState } from 'react'
import { BreadcrumbMenu } from './breadcrumb-menu'
import { ComboboxTeam } from './combobox-team'
import { CommandDialogSearch } from './command-dialog-search'
import { Github } from './icon'
import { useTheme } from './theme-provider'
import { UserMenu } from './user-menu'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [expandedItems, setExpandedItems] = useState<{
    [key: string]: boolean
  }>({ 'Navigation One': true })
  const [selectKeys, setSelectKeys] = useState<string[]>([])
  const theme = useTheme()

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const toggleMenuItem = (title: string) => {
    setExpandedItems((prev) => ({ ...prev, [title]: !prev[title] }))
  }

  return (
    <div className='flex flex-col min-h-screen'>
      {/* Header */}
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
            <h1 className='text-lg font-semibold'>Moon 监控系统</h1>
          </div>
          <nav className='flex items-center gap-1'>
            <Button variant='ghost'>
              <CommandDialogSearch />
            </Button>
            <Button variant='ghost'>
              <Github />
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
            <ScrollArea className='flex-grow py-4'>
              <nav className='space-y-2 px-4 w-full'>
                {menus?.map((item, index) => (
                  <div key={index} className='space-y-1'>
                    <Button
                      variant={
                        selectKeys.includes(item.key) ? 'secondary' : 'ghost'
                      }
                      className={`w-full justify-between`}
                      onClick={() =>
                        item.children && toggleMenuItem(item.label)
                      }
                    >
                      {item.icon}
                      {sidebarOpen && (
                        <>
                          <span className='ml-2 flex-grow text-left'>
                            {item.label}
                          </span>
                          {item.children &&
                            (expandedItems?.[item.label] ? (
                              <ChevronDown size={16} />
                            ) : (
                              <ChevronRight size={16} />
                            ))}
                        </>
                      )}
                    </Button>
                    {sidebarOpen &&
                      item.children &&
                      expandedItems?.[item.label] && (
                        <div className='ml-6 space-y-1'>
                          {item?.children?.map((subItem, subIndex) => (
                            <Button
                              key={subIndex}
                              onClick={() =>
                                setSelectKeys([item.key, subItem.key])
                              }
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
            <div className='p-4'>
              <Button
                variant='ghost'
                size='icon'
                className='w-full'
                onClick={toggleSidebar}
              >
                {sidebarOpen ? (
                  <ChevronLeft className='h-6 w-6' />
                ) : (
                  <ChevronRight className='h-6 w-6' />
                )}
                <span className='sr-only'>Toggle sidebar</span>
              </Button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main
          className={`flex-1 overflow-auto p-6 transition-all duration-200 ease-in-out`}
        >
          <BreadcrumbMenu />
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className='bg-background border-t py-4'>
        <div className='container flex items-center justify-between'>
          <p className='text-sm text-muted-foreground'>
            © 2023 My App. All rights reserved.
          </p>
          <nav className='flex gap-4'>
            <a
              href='#'
              className='text-sm text-muted-foreground hover:underline'
            >
              Privacy Policy
            </a>
            <a
              href='#'
              className='text-sm text-muted-foreground hover:underline'
            >
              Terms of Service
            </a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
