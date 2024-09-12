'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  RefreshCcw,
  Upload,
} from 'lucide-react'
import { useState } from 'react'

interface Strategy {
  id: number
  name: string
  type: string
  status: 'active' | 'inactive'
  strategyCount: string
  description: string
  createdAt: string
  updatedAt: string
}

const strategies: Strategy[] = [
  {
    id: 1,
    name: '测试1',
    type: '',
    status: 'active',
    strategyCount: '/',
    description: 'xxx',
    createdAt: '2024-09-03 14:16:06',
    updatedAt: '2024-09-04 13:01:10',
  },
  {
    id: 2,
    name: '11231',
    type: ',',
    status: 'active',
    strategyCount: '1/1',
    description: '',
    createdAt: '2024-09-02 13:00:03',
    updatedAt: '2024-09-03 14:30:29',
  },
]

export default function StrategyGroup() {
  const [itemsPerPage, setItemsPerPage] = useState('10')
  const [currentPage, setCurrentPage] = useState(1)
  const totalItems = strategies.length
  const totalPages = Math.ceil(totalItems / parseInt(itemsPerPage))

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold'>策略组</h2>
        <div className='space-x-2'>
          <Button>
            <Plus className='mr-2 h-4 w-4' /> 添加
          </Button>
          <Button variant='outline'>
            <Upload className='mr-2 h-4 w-4' /> 批量导入
          </Button>
          <Button variant='outline'>
            <RefreshCcw className='mr-2 h-4 w-4' /> 刷新
          </Button>
        </div>
      </div>
      <div className='rounded-md border overflow-hidden'>
        <div className='overflow-x-auto'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[50px] sticky left-0 bg-background z-20'>
                  <Checkbox />
                </TableHead>
                <TableHead className='min-w-[60px]'>序号</TableHead>
                <TableHead className='min-w-[100px]'>名称</TableHead>
                <TableHead className='min-w-[80px]'>类型</TableHead>
                <TableHead className='min-w-[80px]'>状态</TableHead>
                <TableHead className='min-w-[100px]'>策略数量</TableHead>
                <TableHead className='min-w-[150px]'>描述</TableHead>
                <TableHead className='min-w-[180px]'>创建时间</TableHead>
                <TableHead className='min-w-[180px]'>更新时间</TableHead>
                <TableHead className='sticky text-center bg-background z-20 min-w-[120px]'>
                  操作
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {strategies.map((strategy) => (
                <TableRow key={strategy.id}>
                  <TableCell className='sticky left-0 bg-background z-20'>
                    <Checkbox />
                  </TableCell>
                  <TableCell>{strategy.id}</TableCell>
                  <TableCell>{strategy.name}</TableCell>
                  <TableCell>{strategy.type}</TableCell>
                  <TableCell>
                    <span className='inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ring-green-600/20 bg-green-50 text-green-700'>
                      {strategy.status === 'active' ? '启用' : '禁用'}
                    </span>
                  </TableCell>
                  <TableCell>{strategy.strategyCount}</TableCell>
                  <TableCell>{strategy.description}</TableCell>
                  <TableCell>{strategy.createdAt}</TableCell>
                  <TableCell>{strategy.updatedAt}</TableCell>
                  <TableCell className='sticky text-center bg-background z-20'>
                    <Button
                      variant='link'
                      className='text-blue-600 hover:text-blue-800'
                    >
                      详情
                    </Button>
                    <Button
                      variant='link'
                      className='text-blue-600 hover:text-blue-800'
                    >
                      更多
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className='flex items-center justify-end space-x-4'>
        <span className='text-sm text-gray-700'>共 {totalItems} 条</span>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            size='icon'
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <div className='flex items-center justify-center w-10 h-10 border rounded'>
            {currentPage}
          </div>
          <Button
            variant='outline'
            size='icon'
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
        <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
          <SelectTrigger className='w-[120px]'>
            <SelectValue placeholder='Select' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='10'>10 条/页</SelectItem>
            <SelectItem value='20'>20 条/页</SelectItem>
            <SelectItem value='50'>50 条/页</SelectItem>
            <SelectItem value='100'>100 条/页</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
