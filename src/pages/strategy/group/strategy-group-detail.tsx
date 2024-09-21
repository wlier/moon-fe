import { CalendarIcon, UserIcon, ListIcon, EyeIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { StrategyGroupItem } from '@/api/model-types'
import { useEffect, useState } from 'react'
import { getStrategyGroup } from '@/api/strategy'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from '@/components/ui/drawer'

interface StrategyGroupDetailModalProps {
  id?: number
  open?: boolean
  setOpen?: (open: boolean) => void
}

let timer: NodeJS.Timeout | null = null
export default function StrategyGroupDetailModal({
  id,
  open,
  setOpen,
}: StrategyGroupDetailModalProps) {
  const [detail, setDetail] = useState<StrategyGroupItem>()

  const handleGetDetail = () => {
    if (!id) {
      return
    }
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      getStrategyGroup({ id }).then(({ detail }) => {
        setDetail(detail)
      })
    }, 200)
  }

  useEffect(() => {
    if (!open) {
      return
    }
    handleGetDetail()
  }, [id, open])

  if (!detail) {
    return null
  }

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen} direction='bottom'>
        <DrawerTitle />
        <DrawerDescription />
        <DrawerContent>
          <div className='container mx-auto p-6'>
            <Card>
              <CardHeader>
                <CardTitle className='text-2xl'>策略组详情</CardTitle>
                <CardDescription>查看和管理策略组的详细信息</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid gap-6'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <h3 className='text-lg font-semibold'>基本信息</h3>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell className='font-medium'>ID</TableCell>
                            <TableCell>{detail.id}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className='font-medium'>名称</TableCell>
                            <TableCell>{detail.name}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className='font-medium'>类型</TableCell>
                            <TableCell>
                              {detail.categories.map((item) => (
                                <Badge
                                  key={item.id}
                                  variant='secondary'
                                  className='mr-1'
                                >
                                  {item.name}
                                </Badge>
                              ))}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className='font-medium'>状态</TableCell>
                            <TableCell>
                              <Badge>{detail.status}</Badge>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    <div>
                      <h3 className='text-lg font-semibold'>时间信息</h3>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell className='font-medium'>
                              创建时间
                            </TableCell>
                            <TableCell>
                              <CalendarIcon className='inline mr-2' size={16} />
                              {detail.createdAt}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className='font-medium'>
                              更新时间
                            </TableCell>
                            <TableCell>
                              <CalendarIcon className='inline mr-2' size={16} />
                              {detail.updatedAt}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className='font-medium'>
                              创建人
                            </TableCell>
                            <TableCell>
                              <UserIcon className='inline mr-2' size={16} />
                              {detail.creator}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className='font-medium'>
                              策略数量
                            </TableCell>
                            <TableCell>{detail.strategyCount}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold mb-2'>描述</h3>
                    <p className='text-sm pl-4'>{detail.remark || '-'}</p>
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold mb-2'>关联策略列表</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className='w-[200px]'>策略名称</TableHead>
                          <TableHead className='w-fit'>表达式</TableHead>
                          <TableHead className='w-[80px]'>操作</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className='overflow-y-auto'>
                        {detail.strategies.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <ListIcon className='inline mr-2' size={16} />
                              {item.name}
                            </TableCell>
                            <TableCell>{item.expr}</TableCell>
                            <TableCell>
                              <a className='text-primary'>
                                <EyeIcon className='inline mr-2' size={16} />
                              </a>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}
