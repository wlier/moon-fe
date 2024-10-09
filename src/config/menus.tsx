import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { I18nLocaleType } from '@/locale'
import {
  Bell,
  BookText,
  DatabaseZap,
  FolderArchive,
  Monitor,
  Newspaper,
  Settings,
  UserRoundCog,
} from 'lucide-react'

export interface MenuItem {
  label: string
  key: string
  icon?: React.ReactNode
  children?: MenuItem[]
}

export const menus = (i18n: I18nLocaleType): MenuItem[] => {
  return [
    {
      label: i18n.Layout.menu.monitor,
      key: '/monitor',
      icon: <Monitor />,
      children: [
        {
          label: i18n.Layout.menu.monitorAlarm,
          key: '/monitor/alarm',
        },
        {
          label: i18n.Layout.menu.monitorDashboard,
          key: '/monitor/dashboard',
        },
      ],
    },
    {
      label: i18n.Layout.menu.datasource,
      key: '/datasource',
      icon: <DatabaseZap />,
      children: [
        {
          label: i18n.Layout.menu.datasourceMetric,
          key: '/datasource/metric',
        },
        {
          label: i18n.Layout.menu.datasourceLog,
          key: '/datasource/log',
        },
        {
          label: i18n.Layout.menu.datasourceTrace,
          key: '/datasource/trace',
        },
      ],
    },
    {
      label: i18n.Layout.menu.strategy,
      key: '/strategy',
      icon: <BookText />,
      children: [
        {
          label: i18n.Layout.menu.strategyGroup,
          key: '/strategy/group',
        },
        {
          label: i18n.Layout.menu.strategyList,
          key: '/strategy/list',
        },
      ],
    },
    {
      label: '告警通知',
      key: '/notify',
      icon: <Bell />,
      children: [
        {
          label: '告警组',
          key: '/notify/group',
        },
        {
          label: 'Hook',
          key: '/notify/hook',
        },
        {
          label: '通知规则',
          key: '/notify/rule',
        },
        {
          label: '告警记录',
          key: '/notify/record',
        },
      ],
    },
    {
      label: '告警归档',
      key: '/archive',
      icon: <FolderArchive />,
      children: [
        {
          label: '历史告警',
          key: '/archive/history',
        },
        {
          label: '告警统计',
          key: '/archive/statistics',
        },
        {
          label: '历史通知',
          key: '/archive/notice',
        },
      ],
    },
    {
      label: '个人中心',
      key: '/self',
      icon: <UserRoundCog />,
      children: [
        {
          label: '团队管理',
          key: '/self/space-manage',
        },
        {
          label: '个人设置',
          key: '/self/manage',
        },
      ],
    },
    {
      label: '系统管理',
      key: '/system',
      icon: <Settings />,
      children: [
        {
          label: '系统用户',
          key: '/system/users',
        },
        {
          label: '系统字典',
          key: '/system/dict',
        },
        {
          label: '系统菜单',
          key: '/system/menu',
        },
        {
          label: '团队角色',
          key: '/system/role',
        },
        {
          label: '团队成员',
          key: '/system/member',
        },
      ],
    },
    {
      label: 'Moon社区',
      key: '/community',
      icon: <Newspaper />,
      children: [
        {
          label: '策略仓库',
          key: '/community/strategy-template',
        },
        {
          label: '讨论',
          key: '/community/discussion',
        },
      ],
    },
  ]
}

export const menusToBreadcrumbMap = (
  menuItems: MenuItem[]
): Record<string, JSX.Element> => {
  const breadcrumbMap: Record<string, JSX.Element> = {}

  const buildBreadcrumb = (items: MenuItem[], path: MenuItem[] = []): void => {
    items.forEach((item) => {
      const newPath = [...path, item]
      if (item.children) {
        buildBreadcrumb(item.children, newPath)
      } else {
        breadcrumbMap[item.key] = (
          <BreadcrumbList key={newPath.map((item) => item.key).join('/')}>
            {newPath.map((label, index) => (
              <>
                {index > 0 && <BreadcrumbSeparator key={label.key + index} />}
                <BreadcrumbItem key={label.key + index}>
                  {index === newPath.length - 1 ? (
                    <BreadcrumbPage>{label.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={`/#${item.key}`}>
                      {label.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </>
            ))}
          </BreadcrumbList>
        )
      }
    })
  }

  buildBreadcrumb(menuItems)

  return breadcrumbMap
}
