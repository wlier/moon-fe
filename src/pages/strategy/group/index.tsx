import { StrategyGroupItem } from '@/api/model-types'
import { listStrategyGroup, ListStrategyGroupRequest } from '@/api/strategy'
import { AutoTable, ColumnItem } from '@/components/auto-table'
import { Button } from '@/components/ui/button'
import { Plus, RefreshCcw, Upload } from 'lucide-react'
import { useEffect, useState } from 'react'
import { EditStrategyModal } from './edit-strategy-group-modal'
import { Status } from '@/api/enum'
import { MoreMenu } from '@/components/more-menu'
import { ActionKey } from '@/api/global'
import { cn } from '@/lib/utils'
import StrategyGroupDetailModal from './strategy-group-detail'

let timer: NodeJS.Timeout | null = null
export default function StrategyGroup() {
  const [total, setTotal] = useState(0)
  const [datasource, setDatasource] = useState<StrategyGroupItem[]>([])
  const [refresh, setRefresh] = useState(false)
  const [editStrategyGroupModalOpen, setEditStrategyGroupModalOpen] =
    useState<boolean>(false)
  const [openDetailModal, setOpenDetailModal] = useState<boolean>(false)
  const [detail, setDetail] = useState<StrategyGroupItem>()
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
    <>
      <EditStrategyModal
        onOk={handleRefresh}
        open={editStrategyGroupModalOpen}
        setOpen={setEditStrategyGroupModalOpen}
        id={detail?.id}
      />
      <StrategyGroupDetailModal
        open={openDetailModal}
        setOpen={setOpenDetailModal}
        id={detail?.id}
      />
      <div className='space-y-4'>
        <AutoTable
          title='策略列表'
          data={datasource}
          columns={columns}
          rowKey='id'
          actionClassName='w-12 text-center gap-2'
          actions={[
            <Button
              size='sm'
              onClick={() => setEditStrategyGroupModalOpen(true)}
            >
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
            page: searchListParams.pagination.pageNum,
            pageSize: searchListParams.pagination.pageSize,
            onPageChange: (pageNum) =>
              setSearchListParams({
                ...searchListParams,
                pagination: {
                  ...searchListParams.pagination,
                  pageNum,
                },
              }),
            onPageSizeChange: (pageSize) =>
              setSearchListParams({
                ...searchListParams,
                pagination: {
                  ...searchListParams.pagination,
                  pageSize,
                },
              }),
          }}
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
      </div>
    </>
  )
}
