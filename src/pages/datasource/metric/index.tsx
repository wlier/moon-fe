import {
  deleteDatasource,
  listDatasource,
  syncDatasourceMeta,
} from '@/api/datasource'
import { Status } from '@/api/enum'
import { DatasourceItem, MetricItem } from '@/api/model-types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Database, FolderSync, PlusIcon, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { EditDatasourceModal } from './edit-modal'
import { AutoTable } from '@/components/auto-table'
import { listMetric, ListMetricRequest } from '@/api/datasource/metric'
import { MetricTypeData, StorageTypeIcon } from '@/api/global'
import { toast } from 'sonner'
import { ErrorResponse } from '@/api/request'

let timer: NodeJS.Timeout | null
export default function Metric() {
  const [selectedDataSource, setSelectedDataSource] = useState<DatasourceItem>()
  const [dataSource, setDataSource] = useState<DatasourceItem[]>([])
  const [refresh, setRefresh] = useState(false)
  const [metrics, setMetrics] = useState<MetricItem[]>([])
  const [metricsParams, setMetricsParams] = useState<ListMetricRequest>({
    pagination: { pageNum: 1, pageSize: 10 },
  })
  const handleRefresh = () => {
    setRefresh(!refresh)
  }

  const fetchDataSource = async (keyword: string) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      listDatasource({
        pagination: { pageNum: 1, pageSize: 999 },
        keyword,
      }).then(({ list }) => {
        setDataSource(list)
        if (!selectedDataSource) {
          setSelectedDataSource(list?.[0])
        }
      })
    }, 500)
  }

  const fetchMetrics = async () => {
    if (!selectedDataSource) return
    const res = await listMetric({
      ...metricsParams,
      datasourceId: selectedDataSource.id,
    })
    setMetrics(res.list)
  }

  const metricsPageChange = (page: number) => {
    setMetricsParams({
      ...metricsParams,
      pagination: {
        ...metricsParams.pagination,
        pageNum: metricsParams.pagination.pageNum + page || 1,
      },
    })
  }

  useEffect(() => {
    fetchMetrics()
  }, [metricsParams])

  const fetchSyncMetric = async () => {
    if (!selectedDataSource) return
    await syncDatasourceMeta({ id: selectedDataSource.id })
    fetchMetrics()
  }

  useEffect(() => {
    fetchMetrics()
  }, [selectedDataSource])

  const [openEditModal, setOpenEditModal] = useState(false)
  const [editId, setEditId] = useState<number>()

  const onOpenEditModal = (id?: number) => {
    setEditId(id || selectedDataSource?.id)
    setOpenEditModal(true)
  }

  const onOpenAddModal = () => {
    setEditId(undefined)
    setOpenEditModal(true)
  }

  const handleOnOK = () => {
    setOpenEditModal(false)
    handleRefresh()
  }

  const handleOnCancle = () => {
    setOpenEditModal(false)
  }

  const handleDeletedDatasource = async (item?: DatasourceItem) => {
    if (!item) return
    deleteDatasource({ id: item.id })
      .then(() => {
        setSelectedDataSource(dataSource?.[0])
        toast.success(`删除${item.name}成功`, { position: 'top-center' })
        setRefresh(!refresh)
      })
      .catch((err: ErrorResponse) => {
        toast.error(err?.message, { position: 'top-center' })
      })
  }

  useEffect(() => {
    fetchDataSource('')
    setSelectedDataSource(
      dataSource.find((ds) => ds.id == selectedDataSource?.id)
    )
  }, [refresh])

  return (
    <>
      <EditDatasourceModal
        id={editId}
        open={openEditModal}
        onOk={handleOnOK}
        onCancel={handleOnCancle}
      />
      <div className='flex bg-background overflow-hidden w-full gap-2 h-full'>
        <div className='w-64 p-4 border border-double rounded-md '>
          <Button className='w-full mb-4' onClick={onOpenAddModal}>
            <PlusIcon />
            新建数据源
          </Button>
          <div className='relative mb-4'>
            <Input
              placeholder='数据源'
              onChange={(e) => fetchDataSource(e.target.value)}
              className='pl-8'
            />
            <Search className='absolute left-2 top-2.5 h-4 w-4 text-gray-500' />
          </div>
          <div className='space-y-2 overflow-auto min-h-[60vh]'>
            {dataSource.map((ds) => (
              <Button
                key={ds.id}
                variant={
                  selectedDataSource?.id === ds.id ? 'secondary' : 'ghost'
                }
                className='w-full justify-start'
                onClick={() => setSelectedDataSource(ds)}
              >
                <Database className='mr-2 h-4 w-4' />
                {ds.name}
              </Button>
            ))}
          </div>
        </div>
        <div className='flex-1 h-full'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between'>
              <CardTitle className='text-2xl font-bold flex gap-2 justify-center items-center'>
                {StorageTypeIcon[selectedDataSource?.storageType || 0]}
                名称: {selectedDataSource?.name}
              </CardTitle>
              <div className='flex gap-2'>
                <Button
                  variant='secondary'
                  size='sm'
                  disabled={!selectedDataSource?.id}
                  onClick={() => onOpenEditModal()}
                >
                  编辑
                </Button>
                <Button
                  variant='destructive'
                  size='sm'
                  disabled={!selectedDataSource?.id}
                  onClick={() => handleDeletedDatasource(selectedDataSource)}
                >
                  删除
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue='basic-info'>
                <TabsList>
                  <TabsTrigger value='basic-info'>基本信息</TabsTrigger>
                  <TabsTrigger value='raw-data'>元数据</TabsTrigger>
                  <TabsTrigger value='real-time-query'>及时查询</TabsTrigger>
                  <TabsTrigger value='alert-dashboard'>告警模板</TabsTrigger>
                </TabsList>
                <TabsContent value='basic-info'>
                  <div className='grid grid-cols-2 gap-4 mt-4'>
                    <div>
                      <p className='font-semibold'>数据源名称</p>
                      <p>{selectedDataSource?.name}</p>
                    </div>
                    <div>
                      <p className='font-semibold'>状态</p>
                      <p>
                        {selectedDataSource?.status === Status.StatusEnable
                          ? '启用'
                          : '禁用'}
                      </p>
                    </div>
                    <div>
                      <p className='font-semibold'>创建者</p>
                      <p>{selectedDataSource?.creator?.name}</p>
                    </div>
                    <div>
                      <p className='font-semibold'>创建时间</p>
                      <p>{selectedDataSource?.createdAt}</p>
                    </div>
                    <div>
                      <p className='font-semibold'>地址</p>
                      <p>{selectedDataSource?.endpoint}</p>
                    </div>
                    <div>
                      <p className='font-semibold'>更新时间</p>
                      <p>{selectedDataSource?.updatedAt}</p>
                    </div>
                    <div className='col-span-2'>
                      <p className='font-semibold'>配置明细</p>
                      {Object.keys(selectedDataSource?.config || {}).map(
                        (key) => (
                          <div key={key}>
                            <span className='font-semibold'>{key}:</span>{' '}
                            {selectedDataSource?.config[key]}
                          </div>
                        )
                      )}
                    </div>
                    <div className='col-span-2'>
                      <p className='font-semibold'>说明信息</p>
                      <p>{selectedDataSource?.remark || '无'}</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value='raw-data'>
                  <AutoTable
                    title='元数据'
                    data={metrics}
                    actions={[
                      <Button
                        size='sm'
                        variant='secondary'
                        onClick={() => metricsPageChange(-1)}
                      >
                        上一页
                      </Button>,
                      <Button
                        size='sm'
                        variant='secondary'
                        onClick={() => metricsPageChange(1)}
                      >
                        下一页
                      </Button>,
                      <Button
                        size='sm'
                        onClick={fetchSyncMetric}
                        className='flex gap-2'
                      >
                        <FolderSync />
                        同步数据
                      </Button>,
                    ]}
                    scroll={{
                      y: 500,
                    }}
                    columns={[
                      { label: '名称', key: 'name', dataIndex: 'name' },
                      {
                        label: '类型',
                        key: 'type',
                        dataIndex: 'type',
                        render: (record: MetricItem) =>
                          MetricTypeData[record.type]?.text,
                      },
                      { label: '单位', key: 'unit', dataIndex: 'unit' },
                    ]}
                    rowAction={(record) => (
                      <Button
                        variant='ghost'
                        onClick={() => onOpenEditModal(record.id)}
                      >
                        编辑
                      </Button>
                    )}
                    rowKey='id'
                  />
                </TabsContent>
                <TabsContent value='real-time-query'>及时查询内容</TabsContent>
                <TabsContent value='alert-dashboard'>告警模板内容</TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
