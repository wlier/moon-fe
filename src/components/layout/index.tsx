import React from 'react'
import { Outlet } from 'react-router-dom'
import { MoonLayout } from './layout'

const Layout: React.FC = () => {
  return (
    <>
      <MoonLayout>
        <Outlet />
      </MoonLayout>
    </>
  )
}

export default Layout
