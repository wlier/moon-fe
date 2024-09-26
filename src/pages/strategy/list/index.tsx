import { Status } from '@/api/enum'
import { ActionKey } from '@/api/global'
import { StrategyItem } from '@/api/model-types'
import { listStrategy, ListStrategyRequest } from '@/api/strategy'
import { AutoTable, ColumnItem } from '@/components/auto-table'
import { MoreMenu } from '@/components/more-menu'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Plus, Upload, RefreshCcw } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { EditStrategyModal } from './edit-strategy-modal'

let timer: NodeJS.Timeout | null = null
const StrategyList: React.FC = () => {
  const [total, setTotal] = useState(0)
  const [datasource, setDatasource] = useState<StrategyItem[]>([])
  const [searchParams, setSearchParams] = useState<ListStrategyRequest>({
    pagination: {
      pageNum: 1,
      pageSize: 10,
    },
  })
  const [openDetailModal, setOpenDetailModal] = useState<boolean>(false)
  const [detail, setDetail] = useState<StrategyItem>()
  const [editStrategyModalOpen, setEditStrategyModalOpen] =
    useState<boolean>(false)
  const [refresh, setRefresh] = useState(false)

  const columns: ColumnItem<StrategyItem>[] = [
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
      key: 'categories',
      label: '策略类型',
      dataIndex: 'categories',
      render: (_, record) => (
        <span className='text-primary'>
          {record.categories.map((item) => item.name).join('，')}
        </span>
      ),
    },
    {
      key: 'status',
      label: '状态',
      dataIndex: 'status',
      render: (_, record) =>
        record.status === Status.StatusEnable ? (
          <span className='text-primary'>启用</span>
        ) : (
          <span className='text-danger'>禁用</span>
        ),
    },
    {
      key: 'group',
      label: '策略组',
      dataIndex: 'group',
      render: (_, record) => (
        <span className='text-primary'>{record?.group?.name || '-'}</span>
      ),
    },
  ]

  const handleRefresh = () => {
    setRefresh(!refresh)
  }

  const handleGetStrategies = () => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      listStrategy(searchParams).then(({ list, pagination: { total } }) => {
        setDatasource(list)
        setTotal(total)
      })
    }, 200)
  }

  useEffect(() => {
    handleGetStrategies()
  }, [searchParams, refresh])

  return (
    <>
      <EditStrategyModal
        open={editStrategyModalOpen}
        setOpen={setEditStrategyModalOpen}
        id={detail?.id}
        onOk={handleRefresh}
      />
      <AutoTable
        title='策略列表'
        columns={columns}
        data={datasource}
        rowKey='id'
        actionClassName='w-12 text-center gap-2'
        pagination={{
          total,
          page: searchParams.pagination.pageNum,
          pageSize: searchParams.pagination.pageSize,
          onPageChange: (page) => {
            setSearchParams({
              ...searchParams,
              pagination: {
                ...searchParams.pagination,
                pageNum: page,
              },
            })
          },
          onPageSizeChange: (pageSize) => {
            setSearchParams({
              ...searchParams,
              pagination: {
                ...searchParams.pagination,
                pageSize,
              },
            })
          },
        }}
        actions={[
          <Button size='sm' onClick={() => setEditStrategyModalOpen(true)}>
            <Plus className='mr-2 h-4 w-4' /> 添加
          </Button>,
          <Button size='sm' variant='outline'>
            <Upload className='mr-2 h-4 w-4' /> 批量导入
          </Button>,
          <Button size='sm' variant='outline' onClick={handleRefresh}>
            <RefreshCcw className='mr-2 h-4 w-4' /> 刷新
          </Button>,
        ]}
        rowAction={(record, index) => (
          <div
            key={index}
            className={cn(
              'w-full flex justify-between items-center gap-3',
              'whitespace-nowrap'
            )}
          >
            <a
              className='text-primary'
              onClick={() => {
                setDetail(record)
                setOpenDetailModal(true)
              }}
            >
              详情
            </a>
            <MoreMenu
              options={[
                {
                  label: '编辑',
                  value: ActionKey.EDIT,
                },
                {
                  label: '开启/关闭',
                  value:
                    record.status === Status.StatusEnable
                      ? ActionKey.CLOSE
                      : ActionKey.OPEN,
                  danger: record.status === Status.StatusEnable,
                },
                {
                  label: '策略列表',
                  value: ActionKey.STRATEGY_LIST,
                },
                {
                  divider: true,
                },
                {
                  label: '删除',
                  value: ActionKey.DELETE,
                  danger: true,
                },
              ]}
            />
          </div>
        )}
      />
    </>
  )
}

export default StrategyList
