import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Database, PlusIcon, Search } from 'lucide-react'
import { useState } from 'react'

interface DataSource {
  id: string
  name: string
  status: 'enabled' | 'disabled'
  creator: string
  address: string
  config: Record<string, string>
  createdAt: string
  updatedAt: string
  description?: string
}

const dataSources: DataSource[] = [
  {
    id: '1',
    name: 'local',
    status: 'enabled',
    creator: 'admin(超级管理员)',
    address: 'https://prometheus.aide-cloud.cn/',
    config: {
      username: 'admin',
      password: '123456',
    },
    createdAt: '2024-09-04 14:54:23',
    updatedAt: '2024-09-04 14:54:23',
  },
  {
    id: '2',
    name: 'prom',
    status: 'disabled',
    creator: 'user1',
    address: 'https://prometheus-2.example.com/',
    config: {},
    createdAt: '2024-09-03 10:30:00',
    updatedAt: '2024-09-03 10:30:00',
  },
]

export default function Metric() {
  const [selectedDataSource, setSelectedDataSource] =
    useState<DataSource | null>(dataSources[0])
  const [searchTerm, setSearchTerm] = useState('')

  const filteredDataSources = dataSources.filter((ds) =>
    ds.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='flex bg-background overflow-hidden w-full gap-2 h-full'>
      <div className='w-64 p-4 border border-double rounded-md'>
        <Button className='w-full mb-4'>
          <PlusIcon />
          新建数据源
        </Button>
        <div className='relative mb-4'>
          <Input
            placeholder='数据源'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-8'
          />
          <Search className='absolute left-2 top-2.5 h-4 w-4 text-gray-500' />
        </div>
        <div className='space-y-2 overflow-auto'>
          {filteredDataSources.map((ds) => (
            <Button
              key={ds.id}
              variant={selectedDataSource?.id === ds.id ? 'secondary' : 'ghost'}
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
        {selectedDataSource && (
          <Card>
            <CardHeader className='flex flex-row items-center justify-between'>
              <CardTitle className='text-2xl font-bold'>
                <Database className='inline mr-2' />
                名称: {selectedDataSource.name}
              </CardTitle>
              <Button variant='outline'>编辑</Button>
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
                      <p>{selectedDataSource.name}</p>
                    </div>
                    <div>
                      <p className='font-semibold'>状态</p>
                      <p>
                        {selectedDataSource.status === 'enabled'
                          ? '启用'
                          : '禁用'}
                      </p>
                    </div>
                    <div>
                      <p className='font-semibold'>创建者</p>
                      <p>{selectedDataSource.creator}</p>
                    </div>
                    <div>
                      <p className='font-semibold'>创建时间</p>
                      <p>{selectedDataSource.createdAt}</p>
                    </div>
                    <div>
                      <p className='font-semibold'>地址</p>
                      <p>{selectedDataSource.address}</p>
                    </div>
                    <div>
                      <p className='font-semibold'>更新时间</p>
                      <p>{selectedDataSource.updatedAt}</p>
                    </div>
                    <div className='col-span-2'>
                      <p className='font-semibold'>配置明细</p>
                      {Object.keys(selectedDataSource.config).map((key) => (
                        <div key={key}>
                          <span className='font-semibold'>{key}:</span>{' '}
                          {selectedDataSource.config[key]}
                        </div>
                      ))}
                    </div>
                    <div className='col-span-2'>
                      <p className='font-semibold'>说明信息</p>
                      <p>{selectedDataSource.description || '无'}</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value='raw-data'>元数据内容</TabsContent>
                <TabsContent value='real-time-query'>及时查询内容</TabsContent>
                <TabsContent value='alert-dashboard'>告警模板内容</TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
