import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface PaginationProps {
  total: number
  page: number
  pageSize: number
  onPageChange?: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
}

export default function Pagination({
  total,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const [pages, setPages] = useState<(number | string)[]>([])

  useEffect(() => {
    const totalPages = Math.ceil(total / pageSize)
    const visiblePages = 7
    let newPages: (number | string)[] = []

    if (totalPages <= visiblePages) {
      newPages = Array.from({ length: totalPages }, (_, i) => i + 1)
    } else {
      if (page <= 4) {
        newPages = [1, 2, 3, 4, 5, '...', totalPages]
      } else if (page >= totalPages - 3) {
        newPages = [
          1,
          '...',
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ]
      } else {
        newPages = [1, '...', page - 1, page, page + 1, '...', totalPages]
      }
    }

    setPages(newPages)
  }, [total, page, pageSize])

  return (
    <div className='flex items-center justify-end gap-2 p-1'>
      <div className='flex items-center space-x-2'>
        <Button
          variant='secondary'
          size='icon'
          onClick={() => onPageChange?.(page - 1)}
          disabled={page === 1}
        >
          <ChevronLeftIcon className='h-4 w-4' />
        </Button>
        {pages.map((p, index) => (
          <React.Fragment key={index}>
            {typeof p === 'number' ? (
              <Button
                variant={p === page ? 'default' : 'outline'}
                onClick={() => onPageChange?.(p)}
              >
                {p}
              </Button>
            ) : (
              <span className='px-2'>...</span>
            )}
          </React.Fragment>
        ))}
        <Button
          variant='outline'
          size='icon'
          onClick={() => onPageChange?.(page + 1)}
          disabled={page === Math.ceil(total / pageSize)}
        >
          <ChevronRightIcon className='h-4 w-4' />
        </Button>
      </div>
      <Select
        value={pageSize + ''}
        onValueChange={(value) => onPageSizeChange?.(Number(value))}
      >
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Select page size' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='10'>10 条/页</SelectItem>
          <SelectItem value='20'>20 条/页</SelectItem>
          <SelectItem value='50'>50 条/页</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
