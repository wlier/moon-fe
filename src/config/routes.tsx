import { PageLock } from '@/components/icon'
import { lazy } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: lazy(() => import('@/components/layout')),
    children: [
      {
        path: '/monitor',
        children: [
          {
            path: '/monitor/dashboard',
            Component: lazy(() => import('@/pages/monitor/dashboard')),
          },
          {
            path: '/monitor/alarm',
            Component: lazy(() => import('@/pages/monitor/alarm')),
          },
        ],
      },
      {
        path: '/datasource',
        children: [
          {
            path: '/datasource/metric',
            Component: lazy(() => import('@/pages/datasource/metric')),
          },
        ],
      },
      {
        path: '/strategy',
        children: [
          {
            path: '/strategy/group',
            Component: lazy(() => import('@/pages/strategy/group')),
          },
          {
            path: '/strategy/list',
            Component: lazy(() => import('@/pages/strategy/list')),
          },
        ],
      },
      {
        path: '*',
        element: (
          <div className='flex justify-center items-center'>
            <PageLock className='w-[50%] h-[50%]' />
          </div>
        ),
      },
    ],
  },
  {
    path: '/',
    // 重定向/home
    element: <Navigate to='/monitor/dashboard' replace={true} />,
  },
  {
    path: '/login',
    Component: lazy(() => import('@/pages/login')),
  },
]
