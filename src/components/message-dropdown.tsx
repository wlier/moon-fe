import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Bell, Check, X } from 'lucide-react'
import { useState } from 'react'
import { useInvitation } from './invitation-context'

type Message = {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  content: string
  timestamp: string
  biz?: 'invitation' | 'notice'
}

export default function MessageDropdown() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'info',
      content: '系统将于今晚22:00进行例行维护',
      timestamp: '10分钟前',
    },
    {
      id: '2',
      type: 'success',
      content: '您的项目"React开发"已成功创建',
      timestamp: '30分钟前',
    },
    {
      id: '3',
      type: 'warning',
      content: '您的存储空间即将用完，请及时清理',
      timestamp: '1小时前',
    },
    {
      id: '4',
      type: 'error',
      content: '无法连接到远程服务器，请检查网络设置',
      timestamp: '2小时前',
    },
    {
      id: '5',
      type: 'info',
      content: '新版本1.2.0已发布，点击查看更新内容',
      timestamp: '1天前',
    },
    {
      id: '6',
      type: 'info',
      content: 'Moon 邀请您加入项目',
      timestamp: '1小时前',
      biz: 'invitation',
    },
  ])

  const invitaton = useInvitation()

  const getMessageIcon = (type: Message['type']) => {
    switch (type) {
      case 'info':
        return <Bell className='h-4 w-4 text-blue-500' />
      case 'success':
        return <Check className='h-4 w-4 text-green-500' />
      case 'warning':
        return <Bell className='h-4 w-4 text-yellow-500' />
      case 'error':
        return <X className='h-4 w-4 text-red-500' />
    }
  }

  const handleMarkAsRead = (id: string) => {
    setMessages(messages.filter((message) => message.id !== id))
  }

  const handleClearAll = () => {
    setMessages([])
  }

  const onHanldeMessage = (message: Message) => {
    if (message.biz === 'invitation') {
      invitaton.showInvitation({
        teamName: '监控团队',
        inviterName: 'Moon',
        roles: [{ name: '管理员', description: '' }],
      })
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='relative'>
          <Bell className='h-4 w-4' />
          {messages.length > 0 && (
            <span className='absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500' />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-80'>
        <DropdownMenuLabel className='font-normal'>
          <h2 className='text-lg font-semibold'>通知</h2>
          <p className='text-sm text-muted-foreground'>
            您有 {messages.length} 条未读消息
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className='h-[300px]'>
          <DropdownMenuGroup>
            {messages.map((message) => (
              <DropdownMenuItem
                key={message.id}
                onClick={() => onHanldeMessage(message)}
              >
                <div className='flex items-start space-x-2'>
                  {getMessageIcon(message.type)}
                  <div className='space-y-1'>
                    <p className='text-sm font-medium leading-none'>
                      {message.content}
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
                <Button
                  variant='outline'
                  size='sm'
                  className='ml-auto'
                  onClick={() => handleMarkAsRead(message.id)}
                >
                  标为已读
                </Button>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </ScrollArea>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button
            variant='ghost'
            className='w-full justify-center'
            onClick={handleClearAll}
          >
            清除所有通知
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
