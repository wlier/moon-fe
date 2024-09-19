import { AutoTable, ColumnItem } from '@/components/auto-table'
import { Button } from '@/components/ui/button'
import { Plus, RefreshCcw, Upload } from 'lucide-react'
import { useState } from 'react'

interface Strategy {
  id: number
  name: string
  type: string
  status: 'active' | 'inactive'
  strategyCount: string
  remark: string
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
    remark: 'xxx',
    createdAt: '2024-09-03 14:16:06',
    updatedAt: '2024-09-04 13:01:10',
  },
  {
    id: 2,
    name: '11231',
    type: ',',
    status: 'active',
    strategyCount: '1/1',
    remark: '这里是我们的说明信息',
    createdAt: '2024-09-02 13:00:03',
    updatedAt: '2024-09-03 14:30:29',
  },
]

export default function StrategyGroup() {
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1)
  const [total] = useState(100)

  const columns: ColumnItem<Strategy>[] = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'name',
      label: '策略名称',
    },
    {
      key: 'type',
      label: '策略类型',
    },
    {
      key: 'status',
      label: '状态',
    },
    {
      key: 'remark',
      label: '描述',
    },
    {
      key: 'strategyCount',
      label: '策略数量',
      render: (value) => <span className='text-primary'>{value}</span>,
    },
  ]

  return (
    <div className='space-y-4'>
      <AutoTable
        title='策略列表'
        data={strategies}
        columns={columns}
        rowKey='id'
        actions={[
          <Button size='sm'>
            <Plus className='mr-2 h-4 w-4' /> 添加
          </Button>,
          <Button size='sm' variant='outline'>
            <Upload className='mr-2 h-4 w-4' /> 批量导入
          </Button>,
          <Button size='sm' variant='outline'>
            <RefreshCcw className='mr-2 h-4 w-4' /> 刷新
          </Button>,
        ]}
        pagination={{
          total: total,
          page: page,
          pageSize: pageSize,
          onPageChange: (page) => setPage(page),
          onPageSizeChange: (pageSize) => setPageSize(pageSize),
        }}
        rowAction={(_, index) => (
          <div
            key={index}
            className='w-full flex justify-between items-center gap-1 '
          >
            <Button size='sm' variant='outline'>
              详情
            </Button>
            <Button size='sm' variant='outline'>
              更多
            </Button>
          </div>
        )}
      />
    </div>
  )
}
