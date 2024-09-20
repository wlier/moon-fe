import { StrategyGroupItem } from '@/api/model-types'
import { listStrategyGroup, ListStrategyGroupRequest } from '@/api/strategy'
import { AutoTable, ColumnItem } from '@/components/auto-table'
import { Button } from '@/components/ui/button'
import { Plus, RefreshCcw, Upload } from 'lucide-react'
import { useEffect, useState } from 'react'

let timer: NodeJS.Timeout | null = null
export default function StrategyGroup() {
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [datasource, setDatasource] = useState<StrategyGroupItem[]>([])
  const [refresh, setRefresh] = useState(false)
  const [searchListParams, setSearchListParams] =
    useState<ListStrategyGroupRequest>({
      pagination: {
        pageNum: 1,
        pageSize: 10,
      },
    })

  const columns: ColumnItem<StrategyGroupItem>[] = [
    {
      key: 'id',
      label: 'ID',
      dataIndex: 'id',
    },
    {
      key: 'name',
      label: '策略名称',
      dataIndex: 'name',
    },
    {
      key: 'strategies',
      label: '策略类型',
      dataIndex: 'strategies',
      render: (_, record) => (
        <span className='text-primary'>{record.strategies.join('、')}</span>
      ),
    },
    {
      key: 'status',
      label: '状态',
      dataIndex: 'status',
      render: (_, record) => (
        <span className='text-primary'>{record.status ? '启用' : '禁用'}</span>
      ),
    },
    {
      key: 'remark',
      label: '描述',
      dataIndex: 'remark',
    },
    {
      key: 'strategyCount',
      label: '策略数量',
      dataIndex: 'strategyCount',
      render: (_, record) => (
        <span className='text-primary'>{record.strategyCount}</span>
      ),
    },
  ]

  const handleRefresh = () => {
    setRefresh(!refresh)
  }

  const getDatasource = () => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      listStrategyGroup(searchListParams).then(
        ({ list, pagination: { total } }) => {
          setDatasource(list)
          setTotal(total)
        }
      )
    }, 200)
  }

  useEffect(() => {
    getDatasource()
  }, [searchListParams, refresh])

  return (
    <div className='space-y-4'>
      <AutoTable
        title='策略列表'
        data={datasource}
        columns={columns}
        rowKey='id'
        actions={[
          <Button size='sm'>
            <Plus className='mr-2 h-4 w-4' /> 添加
          </Button>,
          <Button size='sm' variant='outline'>
            <Upload className='mr-2 h-4 w-4' /> 批量导入
          </Button>,
          <Button size='sm' variant='outline' onClick={handleRefresh}>
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
