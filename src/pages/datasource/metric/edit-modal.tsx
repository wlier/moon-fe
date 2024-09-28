import {
  createDatasource,
  getDatasource,
  updateDatasource,
} from '@/api/datasource'
import { DatasourceType, Status, StorageType } from '@/api/enum'
import { StorageTypeData } from '@/api/global'
import { DatasourceItem } from '@/api/model-types'
import { SearchableSelect } from '@/components/select'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export interface EditDatasourceModalProps {
  id?: number
  onOk?: () => void
  onCancel?: () => void
  open?: boolean
}

let timer: NodeJS.Timeout | null
export function EditDatasourceModal({
  id,
  onOk,
  open,
  onCancel,
}: EditDatasourceModalProps) {
  const datasourceSchema = z.object({
    name: z.string().min(1, '请输入数据源名称'),
    endpoint: z.string().min(1, '请输入数据源地址'),
    storageType: z
      .nativeEnum(StorageType)
      .default(StorageType.StorageTypePrometheus),
    status: z.nativeEnum(Status).optional().default(Status.StatusEnable),
    datasourceType: z
      .nativeEnum(DatasourceType)
      .optional()
      .default(DatasourceType.DatasourceTypeMetric),
    remark: z.string().max(200, '备注信息最多200字符').optional(),
  })

  type FormValues = z.infer<typeof datasourceSchema>

  const form = useForm<FormValues>({
    resolver: zodResolver(datasourceSchema),
    defaultValues: {
      status: Status.StatusEnable,
      datasourceType: DatasourceType.DatasourceTypeMetric,
    },
  })

  const [detail, setDetail] = useState<DatasourceItem>()

  const fetchDetail = () => {
    if (!id || !open) return
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      getDatasource({ id }).then(({ detail }) => {
        setDetail(detail)
      })
    }, 500)
  }

  const handleOnOK = () => {
    setDetail(undefined)
    form.reset({})
    onOk?.()
  }

  const onSubmit = (values: FormValues) => {
    if (id) {
      return updateDatasource({ ...values, id }).then(handleOnOK)
    }
    return createDatasource(values).then(handleOnOK)
  }

  useEffect(() => {
    form.reset({})
    if (open) {
      form.reset(detail)
    }
  }, [detail])

  useEffect(() => {
    fetchDetail()
  }, [id, open])

  return (
    <>
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {id ? '编辑数据源' : '新建数据源'}
            </AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='mt-4 space-y-8'
            >
              <div className='space-y-8'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel className='flex items-center space-x-2 gap-1'>
                        <div className='text-red-500'>*</div>
                        数据源名称
                        <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          autoComplete='off'
                          placeholder='请输入数据源名称'
                          className={`${
                            fieldState.error ? 'border-red-500' : ''
                          }`}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='endpoint'
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel className='flex items-center space-x-2 gap-1'>
                        <div className='text-red-500'>*</div>
                        数据源地址
                        <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          autoComplete='off'
                          placeholder='请输入数据源地址'
                          className={`${
                            fieldState.error ? 'border-red-500' : ''
                          }`}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='storageType'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex items-center space-x-2 gap-1'>
                        数据源类型
                        <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <SearchableSelect
                          mode='single'
                          options={Object.entries(StorageTypeData).map(
                            ([key, value]) => ({
                              label: value,
                              value: Number(key),
                            })
                          )}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='remark'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex items-center space-x-2 gap-1'>
                        备注
                        <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          autoComplete='off'
                          placeholder='请输入备注信息'
                          className={`${field.value ? 'border-gray-300' : ''}`}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel type='reset' onClick={onCancel}>
                  取消
                </AlertDialogCancel>
                <AlertDialogAction type='submit'>确认</AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
