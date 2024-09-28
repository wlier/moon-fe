import Pagination from '@/components/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { useI18nConfig } from '@/locale'
import React from 'react'
import Loading from './loading'

export type ColumnItem<T extends object> = {
  key: React.Key
  dataIndex: keyof T
  label: string | React.ReactNode
  className?: string
  minWidth?: number
  width?: number
  maxWidth?: number
  ellipsis?: boolean
  fixed?: 'left' | 'right'
  align?: 'left' | 'center' | 'right'
  render?: (item: T, index: number) => React.ReactNode
}

export interface AutoTableProps<T extends object> {
  title?: string | React.ReactNode
  data: T[]
  columns: ColumnItem<T>[]
  actions?: React.ReactNode[]
  className?: string
  loading?: boolean
  onRowClick?: (item: T, index: number) => void
  scroll?: {
    x?: number | string
    y?: number | string
  }
  pagination?: {
    page: number
    pageSize: number
    pageSizeOptions?: number[]
    total: number
    onPageChange?: (page: number) => void
    onPageSizeChange?: (pageSize: number) => void
  }
  rowKey: keyof T
  rowAction?: (item: T, index: number) => React.ReactNode
  actionClassName?: string
  select?: {
    selectedKeys?: React.Key[]
    onSelect?: (selected: T[]) => void
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AutoTable(props: AutoTableProps<any>) {
  const {
    data,
    columns,
    pagination,
    rowKey,
    title,
    rowAction,
    actionClassName,
    actions = [],
    className,
    scroll,
    onRowClick,
    loading,
  } = props
  const i18n = useI18nConfig()

  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-bold'>{title}</h2>
        <div className='space-x-2 flex justify-between gap-2'>
          {actions.map((action, index) => (
            <div key={index}>{action}</div>
          ))}
        </div>
      </div>
      <div className='rounded-md border overflow-hidden'>
        <div className='overflow-x-auto'>
          <Table
            className={cn(
              className,
              scroll && 'overflow-x-auto',
              'min-h-[200px]'
            )}
          >
            <TableHeader
              className={cn(
                'sticky top-0 bg-background z-20',
                scroll && 'overflow-x-auto'
              )}
            >
              <TableRow>
                {/* <TableHead className='w-[50px] sticky left-0 bg-background z-20'>
                  <TriStateCheckbox
                    checked={checked}
                    onClick={() => setChecked(!checked)}
                  />
                </TableHead> */}
                {columns.map((column, index) => (
                  <TableHead
                    className={cn(
                      column.minWidth ? `min-w-[${column.minWidth}px]` : '',
                      column.width ? `w-[${column.width}px]` : '',
                      column.maxWidth ? `max-w-[${column.maxWidth}px]` : '',
                      column.align ? `text-${column.align}` : '',
                      column.ellipsis ? 'ellipsis' : '',
                      column.fixed && `sticky ${column.fixed}`,
                      column.className
                    )}
                    key={`${index}-${column.key}`}
                  >
                    {column.label}
                  </TableHead>
                ))}
                {rowAction && (
                  <TableHead className={cn(actionClassName)}>
                    {i18n.AutoTable.operation}
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody
              className={cn(scroll && 'overflow-x-auto', 'min-h-[200px]')}
            >
              {loading ? (
                <Loading size='large' />
              ) : (
                data.map((item, rowIndex) => (
                  <TableRow
                    key={item[rowKey]}
                    onClick={() => onRowClick?.(item, rowIndex)}
                  >
                    {/* <TableCell className='sticky left-0 bg-background z-20'>
                    <Checkbox />
                  </TableCell> */}
                    {columns.map((column, index) => (
                      <TableCell
                        key={`${index}-${column.key}`}
                        className={cn(
                          column.minWidth ? `min-w-[${column.minWidth}px]` : '',
                          column.width ? `w-[${column.width}px]` : '',
                          column.maxWidth ? `max-w-[${column.maxWidth}px]` : '',
                          column.align ? `text-${column.align}` : '',
                          column.ellipsis ? 'ellipsis' : '',
                          column.fixed && `sticky ${column.fixed}`,
                          column.className
                        )}
                      >
                        {column.render
                          ? column.render(item, index)
                          : item[column.dataIndex]}
                      </TableCell>
                    ))}
                    {rowAction && (
                      <TableCell className={cn(actionClassName)}>
                        {rowAction(item, rowIndex)}
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      {pagination && (
        <Pagination
          total={pagination?.total}
          page={pagination?.page}
          pageSize={pagination?.pageSize}
          onPageChange={pagination?.onPageChange}
          onPageSizeChange={pagination.onPageSizeChange}
        />
      )}
    </div>
  )
}
