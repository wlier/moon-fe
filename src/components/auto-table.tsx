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

export type ColumnItem<T extends object> = {
  key: /** T的key值 */ keyof T
  label: string | React.ReactNode
  className?: string
  minWidth?: number
  render?: (value: T[keyof T], item: T, index: number) => React.ReactNode
}

export interface AutoTableProps<T extends object> {
  title?: string | React.ReactNode
  data: T[]
  columns: ColumnItem<T>[]
  actions?: React.ReactNode[]
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
  rowActionWidth?: number
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
    rowActionWidth = 80,
    actions = [],
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
          <Table>
            <TableHeader>
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
                      column.className
                    )}
                    key={index}
                  >
                    {column.label}
                  </TableHead>
                ))}
                {rowAction && (
                  <TableHead
                    className={cn(
                      `sticky right-0 bg-background z-20 w-[${rowActionWidth}px] text-center`
                    )}
                  >
                    {i18n.AutoTable.operation}
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, rowIndex) => (
                <TableRow key={item[rowKey]}>
                  {/* <TableCell className='sticky left-0 bg-background z-20'>
                    <Checkbox />
                  </TableCell> */}
                  {columns.map((column, index) => (
                    <TableCell
                      key={index}
                      className={cn(
                        `min-w-[${column.minWidth || 20}px]`,
                        column.className
                      )}
                    >
                      {column.render
                        ? column.render(item[column.key], item, index)
                        : item[column.key]}
                    </TableCell>
                  ))}
                  {rowAction && (
                    <TableCell
                      className={cn(
                        `sticky right-0 bg-background z-20 w-[${rowActionWidth}px]`
                      )}
                    >
                      {rowAction(item, rowIndex)}
                    </TableCell>
                  )}
                </TableRow>
              ))}
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
