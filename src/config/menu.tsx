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

export const menus: MenuItem[] = [
  {
    label: '实时监控',
    key: '/home/monitor',
    icon: <Monitor />,
    children: [
      {
        label: '数据大盘',
        key: '/home/monitor/dashboar',
      },
      {
        label: '实时告警',
        key: '/home/monitor/realtime',
      },
    ],
  },
  {
    label: '数据源',
    key: '/home/datasource',
    icon: <DatabaseZap />,
    children: [
      {
        label: 'Metric',
        key: '/home/datasource/metric',
      },
      {
        label: 'Log',
        key: '/home/datasource/log',
      },
      {
        label: 'Trace',
        key: '/home/datasource/trace',
      },
    ],
  },
  {
    label: '策略管理',
    key: '/home/strategy',
    icon: <BookText />,
    children: [
      {
        label: '策略组',
        key: '/home/strategy/group',
      },
      {
        label: '策略列表',
        key: '/home/strategy/list',
      },
    ],
  },
  {
    label: '告警通知',
    key: '/home/notify',
    icon: <Bell />,
    children: [
      {
        label: '告警组',
        key: '/home/notify/group',
      },
      {
        label: 'Hook',
        key: '/home/notify/hook',
      },
      {
        label: '通知规则',
        key: '/home/notify/rule',
      },
      {
        label: '告警记录',
        key: '/home/notify/record',
      },
    ],
  },
  {
    label: '告警归档',
    key: '/home/archive',
    icon: <FolderArchive />,
    children: [
      {
        label: '历史告警',
        key: '/home/archive/history',
      },
      {
        label: '告警统计',
        key: '/home/archive/statistics',
      },
      {
        label: '历史通知',
        key: '/home/archive/notice',
      },
    ],
  },
  {
    label: '个人中心',
    key: '/home/self',
    icon: <UserRoundCog />,
    children: [
      {
        label: '团队管理',
        key: '/home/self/space-manage',
      },
      {
        label: '个人设置',
        key: '/home/self/manage',
      },
    ],
  },
  {
    label: '系统管理',
    key: '/home/system',
    icon: <Settings />,
    children: [
      {
        label: '系统用户',
        key: '/home/system/users',
      },
      {
        label: '系统字典',
        key: '/home/system/dict',
      },
      {
        label: '系统菜单',
        key: '/home/system/menu',
      },
    ],
  },
  {
    label: 'Moon社区',
    key: '/home/community',
    icon: <Newspaper />,
    children: [
      {
        label: '策略仓库',
        key: '/home/community/strategy-template',
      },
      {
        label: '讨论',
        key: '/home/community/discussion',
      },
    ],
  },
]
