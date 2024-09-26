import { dictSelectList } from '@/api/dict'
import {
  Condition,
  DatasourceType,
  DictType,
  Status,
  SustainType,
} from '@/api/enum'
import {
  AlarmNoticeGroupItem,
  DatasourceItem,
  SelectItem,
  StrategyGroupItem,
} from '@/api/model-types'
import { createStrategy, listStrategyGroup } from '@/api/strategy'
import { MultiSelect } from '@/components/multi-select'
import { SelectX } from '@/components/select'
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
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useI18nConfig } from '@/locale'
import { zodResolver } from '@hookform/resolvers/zod'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { PlusCircle, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { cn } from '@/lib/utils'
import {
  ConditionData,
  DataSourceTypeData,
  SustainTypeData,
} from '@/api/global'
import { DynamicKeyValueInput } from '@/components/dynamic-key-value-input'

export interface EditStrategyModalProps {
  id?: number
  open?: boolean
  setOpen?: (open: boolean) => void
  onOk?: () => void
}

let timer: NodeJS.Timeout | null = null
export function EditStrategyModal(props: EditStrategyModalProps) {
  const { id, open, setOpen, onOk } = props

  const {
    Layout: {
      strategy: {
        group: { edit },
      },
    },
  } = useI18nConfig()

  const editStrategySchema = z.object({
    id: z
      .number()
      .optional()
      .default(id || 0),
    groupId: z.number().default(0),
    name: z.string().min(1, {
      message: edit.form.name.error.required,
    }),
    remark: z
      .string()
      .max(255, {
        message: edit.form.remark.error.max,
      })
      .optional(),
    status: z.number().default(Status.StatusEnable),
    categoriesIds: z.array(z.number()),
    alarmGroupIds: z.array(z.number()),
    expr: z.string(),
    datasourceIds: z.array(z.number()),
    step: z.number().default(10),
    sourceType: z.number().default(DatasourceType.DatasourceTypeMetric),
    labels: z.record(z.string()).optional().default({}),
    // { summary: string; description: string }格式
    annotations: z.object({
      summary: z.string(),
      description: z.string(),
    }),
    strategyLevel: z.array(
      z.object({
        duration: z.string().regex(/^[0-9]+[s]$/),
        count: z.number().min(0),
        sustainType: z.number().default(SustainType.SustainTypeFor),
        interval: z.string().regex(/^[0-9]+[s]$/),
        status: z.number().default(Status.StatusEnable),
        levelId: z.number(),
        threshold: z.number(),
        condition: z.number(),
        alarmGroupIds: z.array(z.number()),
        alarmPageIds: z.array(z.number()),
        labelNotices: z.array(
          z.object({
            name: z.string(),
            value: z.string(),
            alarmGroupIds: z.array(z.number()),
          })
        ),
      })
    ),
  })

  const form = useForm<z.infer<typeof editStrategySchema>>({
    resolver: zodResolver(editStrategySchema),
    defaultValues: {
      name: '',
      remark: '',
      categoriesIds: [],
    },
  })

  type FormValues = z.infer<typeof editStrategySchema>

  const [strategyGroups, setStrategyGroups] = useState<StrategyGroupItem[]>([])
  const [datasourceList, setDatasourceList] = useState<DatasourceItem[]>([])
  const [alarmNoticeGroupList, setAlarmNoticeGroupList] = useState<
    AlarmNoticeGroupItem[]
  >([])

  const handleGetGroups = () => {
    listStrategyGroup({
      pagination: { pageNum: 1, pageSize: 999 },
    }).then((res) => {
      setStrategyGroups(res.list)
    })
  }

  const handleCancel = () => {
    form.reset()
    setOpen?.(false)
  }

  const handleSubmit = (values: FormValues) => {
    createStrategy(values).then(() => {
      toast.success(values.name + '创建成功')
      handleCancel()
      onOk?.()
    })
  }

  const [categories, setCategories] = useState<SelectItem[]>([])
  const [alarmLevelList, setAlarmLevelList] = useState<SelectItem[]>([])

  const getAlarmLevelList = () => {
    dictSelectList({
      pagination: { pageNum: 1, pageSize: 999 },
      dictType: DictType.DictTypeAlarmLevel,
    }).then((res) => {
      setAlarmLevelList(res.list)
    })
  }

  const {
    fields: strategyLevelFields,
    append: appendStrategyLevelField,
    remove: removeStrategyLevelField,
  } = useFieldArray({
    control: form.control,
    name: 'strategyLevel',
  })

  const handleGetCategories = () => {
    dictSelectList({
      pagination: { pageNum: 1, pageSize: 999 },
      dictType: DictType.DictTypeStrategyGroupCategory,
    }).then((res) => {
      setCategories(res.list)
    })
  }

  useEffect(() => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      handleGetCategories()
      handleGetGroups()
      getAlarmLevelList()
    }, 100)
  }, [])

  return (
    <Form {...form}>
      <AlertDialog open={open}>
        <AlertDialogContent className='max-w-[60%] min-w-[600px] max-h-[80%]'>
          <AlertDialogHeader>
            <AlertDialogTitle className='flex items-center space-x-2 gap-1'>
              创建策略
              <Button
                variant='ghost'
                className='ml-auto'
                onClick={() => setOpen?.(false)}
              >
                <X />
              </Button>
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className='h-0'>
            <div className='h-[1px] bg-gray-200 dark:bg-gray-700' />
          </AlertDialogDescription>

          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-4 max-h-[80%]'
          >
            <div
              className={cn('max-h-[74%] overflow-y-auto', 'p-4', 'space-y-4 ')}
            >
              <div className={cn('md:grid md:grid-cols-2 md:gap-6')}>
                <FormField
                  control={form.control}
                  name='groupId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className={cn('flex items-center space-x-2 gap-1')}
                      >
                        <div className='text-red-500'>*</div>
                        策略组
                      </FormLabel>
                      <FormControl className='w-full'>
                        <SelectX
                          {...field}
                          options={strategyGroups.map((item) => ({
                            label: item.name,
                            value: item.id,
                            disabled: item.status !== Status.StatusEnable,
                          }))}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='sourceType'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className={cn('flex items-center space-x-2 gap-1')}
                      >
                        <div className='text-red-500'>*</div>
                        数据源类型
                        <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(val) => field.onChange(+val)}
                          defaultValue={`${field.value}`}
                          className={cn(
                            'space-y-0',
                            'flex flex-row',
                            'gap-4',
                            'h-10'
                          )}
                        >
                          {Object.entries(DataSourceTypeData)
                            .filter(
                              ([key]) =>
                                +key !== DatasourceType.DatasourceTypeUnknown
                            )
                            .map(([key, value]) => (
                              <FormItem
                                key={key}
                                className={cn(
                                  'flex items-center space-x-3 space-y-0',
                                  'justify-center'
                                )}
                              >
                                <FormControl>
                                  <RadioGroupItem value={key} />
                                </FormControl>
                                <FormLabel className='font-normal'>
                                  {value}
                                </FormLabel>
                              </FormItem>
                            ))}
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name='datasourceIds'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center space-x-2 gap-1'>
                      <div className='text-red-500'>*</div>
                      数据源
                      <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={datasourceList.map((item) => ({
                          label: item.name,
                          value: item.id,
                        }))}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className={cn('md:grid md:grid-cols-2 md:gap-6')}>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex items-center space-x-2 gap-1'>
                        <div className='text-red-500'>*</div>
                        {edit.form.name.label}
                        <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          autoComplete='off'
                          placeholder={edit.form.name.placeholder}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='step'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex items-center space-x-2 gap-1'>
                        <div className='text-red-500'>*</div>
                        采样率
                        <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type='number'
                          min={1}
                          max={100}
                          placeholder='请输入采样率'
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name='categoriesIds'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center space-x-2 gap-1'>
                      <div className='text-red-500'>*</div>
                      {edit.form.categoriesIds.label}
                    </FormLabel>
                    <FormControl>
                      <MultiSelect
                        {...field}
                        options={categories}
                        placeholder='请选择分类'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='expr'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center space-x-2 gap-1'>
                      <div className='text-red-500'>*</div>
                      表达式
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='请输入表达式' />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='alarmGroupIds'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center space-x-2 gap-1'>
                      <div className='text-red-500'>*</div>
                      通知对象
                    </FormLabel>
                    <FormControl>
                      <MultiSelect
                        {...field}
                        options={alarmNoticeGroupList.map((item) => ({
                          label: item.name,
                          value: item.id,
                        }))}
                        placeholder='请选择告警通知对象'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* key value , 支持新增新的key value组合*/}
              <FormField
                control={form.control}
                name='labels'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center space-x-2 gap-1'>
                      Labels
                      <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <DynamicKeyValueInput
                        value={
                          // field.value 转key value数组
                          field.value
                            ? Object.entries(field.value).map(
                                ([key, value]) => ({
                                  key,
                                  value,
                                })
                              )
                            : []
                        }
                        onChange={(values) =>
                          field.onChange(
                            values.reduce(
                              (acc, cur) => ({
                                ...acc,
                                [cur.key]: cur.value,
                              }),
                              {}
                            )
                          )
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Enter your key-value pairs here.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='annotations'
                render={({ field }) => (
                  <FormItem {...field}>
                    <FormLabel className='flex items-center space-x-2 gap-1'>
                      Annotations
                      <FormMessage />
                    </FormLabel>
                    <FormControl>
                      {/* 支持summery 、 description */}
                      <FormField
                        control={form.control}
                        name='annotations.summary'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='flex items-center space-x-2 gap-1'>
                              Summary
                              <FormMessage />
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                autoComplete='off'
                                placeholder='Enter your summary here.'
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </FormControl>
                    <FormControl>
                      <FormField
                        control={form.control}
                        name='annotations.description'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='flex items-center space-x-2 gap-1'>
                              Description
                              <FormMessage />
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                autoComplete='off'
                                placeholder='Enter your description here.'
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {strategyLevelFields.map((field, strategyIndex) => (
                <div key={field.id} className='p-6 border rounded-lg space-y-6'>
                  <h3 className='text-lg font-semibold'>
                    策略等级明细 {strategyIndex + 1}
                  </h3>
                  <div className='grid grid-cols-2 gap-4'>
                    <FormField
                      control={form.control}
                      name={`strategyLevel.${strategyIndex}.levelId`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            告警等级
                            <FormMessage />
                          </FormLabel>
                          <SelectX {...field} options={alarmLevelList} />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`strategyLevel.${strategyIndex}.condition`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            判断条件 <FormMessage />
                          </FormLabel>
                          <SelectX
                            {...field}
                            options={Object.entries(ConditionData)
                              .filter(([key]) => {
                                return +key !== Condition.ConditionUnknown
                              })
                              .map(([key, value]) => {
                                return {
                                  value: Number(key),
                                  label: value,
                                  disabled: false,
                                }
                              })}
                          />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`strategyLevel.${strategyIndex}.threshold`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>阈值</FormLabel>
                          <FormControl>
                            <Input
                              type='text'
                              placeholder='请输入阈值'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`strategyLevel.${strategyIndex}.sustainType`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            触发类型 <FormMessage />
                          </FormLabel>
                          <SelectX
                            {...field}
                            options={Object.entries(SustainTypeData)
                              .filter(([key]) => {
                                return +key !== SustainType.SustainTypeUnknown
                              })
                              .map(([key, value]) => {
                                return {
                                  value: Number(key),
                                  label: value,
                                  disabled: false,
                                }
                              })}
                          />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`strategyLevel.${strategyIndex}.duration`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            持续时间 <FormMessage />
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='number'
                              placeholder='持续时间（秒）'
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`strategyLevel.${strategyIndex}.count`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            持续次数
                            <FormMessage />
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='number'
                              placeholder='持续次数'
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name={`strategyLevel.${strategyIndex}.alarmGroupIds`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          通知对象 <FormMessage />
                        </FormLabel>
                        <MultiSelect
                          options={alarmNoticeGroupList.map((item) => {
                            return {
                              value: item.id,
                              label: item.name,
                            }
                          })}
                          value={field.value}
                          onChange={field.onChange}
                          placeholder='请选择通知对象'
                        />
                      </FormItem>
                    )}
                  />
                  <div>
                    <h4 className='text-sm font-semibold mb-2'>
                      label通知对象
                    </h4>
                    <Controller
                      name={`strategyLevel.${strategyIndex}.labelNotices`}
                      control={form.control}
                      render={({ field }) => (
                        <div className='space-y-2'>
                          {field.value.map((label, labelIndex) => (
                            <div
                              key={labelIndex}
                              className='flex items-center space-x-2'
                            >
                              <Input
                                placeholder='Key'
                                value={label.name}
                                onChange={(e) => {
                                  const newLabels = [...field.value]
                                  newLabels[labelIndex].value = e.target.value
                                  field.onChange(newLabels)
                                }}
                              />
                              <Input
                                placeholder='Value'
                                value={label.value}
                                onChange={(e) => {
                                  const newLabels = [...field.value]
                                  newLabels[labelIndex].value = e.target.value
                                  field.onChange(newLabels)
                                }}
                              />
                              <MultiSelect
                                options={alarmNoticeGroupList.map((item) => {
                                  return {
                                    value: item.id,
                                    label: item.name,
                                  }
                                })}
                                value={label.alarmGroupIds}
                                onChange={(value) => {
                                  const newLabels = [...field.value]
                                  newLabels[labelIndex].alarmGroupIds = value
                                  field.onChange(newLabels)
                                }}
                                placeholder='请选择通知对象'
                              />
                              <Button
                                type='button'
                                variant='ghost'
                                size='icon'
                                onClick={() => {
                                  const newLabels = field.value.filter(
                                    (_, i) => i !== labelIndex
                                  )
                                  field.onChange(newLabels)
                                }}
                              >
                                <X className='h-4 w-4' />
                              </Button>
                            </div>
                          ))}
                          <Button
                            type='button'
                            variant='outline'
                            size='sm'
                            onClick={() => {
                              field.onChange([
                                ...field.value,
                                { key: '', value: '', alarmNoticeGroupIds: [] },
                              ])
                            }}
                          >
                            <PlusCircle className='mr-2 h-4 w-4' />
                            添加新 label 通知对象
                          </Button>
                        </div>
                      )}
                    />
                  </div>
                </div>
              ))}
              <Button
                type='button'
                variant='outline'
                onClick={() =>
                  appendStrategyLevelField({
                    levelId: 0,
                    condition: 0,
                    threshold: 0,
                    sustainType: 0,
                    duration: '',
                    count: 1,
                    alarmGroupIds: [],
                    labelNotices: [],
                    status: 0,
                    alarmPageIds: [],
                    interval: '',
                  })
                }
              >
                <PlusCircle className='mr-2 h-4 w-4' />
                添加策略等级
              </Button>

              <FormField
                control={form.control}
                name='remark'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center space-x-2 gap-1'>
                      {edit.form.remark.label}
                      <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        autoComplete='off'
                        placeholder={edit.form.remark.placeholder}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel type='reset' onClick={handleCancel}>
                {edit.cancel}
              </AlertDialogCancel>
              <AlertDialogAction type='submit'>
                {edit.confirm}
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </Form>
  )
}
