import { Breadcrumb } from '@/components/ui/breadcrumb'
import { MenuItem, menusToBreadcrumbMap } from '@/config/menus'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export type BreadcrumbMenuProps = React.HTMLAttributes<HTMLDivElement> & {
  menus: MenuItem[]
}

export function BreadcrumbMenu(props: BreadcrumbMenuProps) {
  const { menus, ...rest } = props
  const location = useLocation()
  const [breadcrumbMap, setBreadcrumbMap] = useState<
    Record<string, JSX.Element>
  >({})

  useEffect(() => {
    setBreadcrumbMap(menusToBreadcrumbMap(menus || []))
  }, [])

  return <Breadcrumb {...rest}>{breadcrumbMap[location.pathname]}</Breadcrumb>
}
