import { listDatasource } from '@/api/datasource'
import { dictSelectList } from '@/api/dict'
import {
  Condition,
  DatasourceType,
  DictType,
  Status,
  SustainType,
} from '@/api/enum'
import {
  ConditionData,
  DataSourceTypeData,
  SustainTypeData,
} from '@/api/global'
import {
  AlarmNoticeGroupItem,
  DatasourceItem,
  StrategyGroupItem,
} from '@/api/model-types'
import { createStrategy, listStrategyGroup } from '@/api/strategy'
import { DynamicKeyValueInput } from '@/components/dynamic-key-value-input'
import { MultiSelect } from '@/components/multi-select'
import { Option, SearchableSelect } from '@/components/select'
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { useI18nConfig } from '@/locale'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusCircle, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

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
        list: { edit },
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

  const handleGetDatasourceList = () => {
    listDatasource({
      pagination: { pageNum: 1, pageSize: 999 },
    }).then((res) => {
      setDatasourceList(res.list)
    })
  }

  const handleGetAlarmNoticeGroupList = () => {
    setAlarmNoticeGroupList([])
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

  const [categories, setCategories] = useState<Option[]>([])
  const [alarmLevelList, setAlarmLevelList] = useState<Option[]>([])

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
      dictType: DictType.DictTypeStrategyCategory,
    }).then((res) => {
      setCategories(res?.list || [])
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
      handleGetDatasourceList()
      handleGetAlarmNoticeGroupList()
    }, 100)
  }, [])

  return (
    <Form {...form}>
      <AlertDialog open={open}>
        <AlertDialogContent
          className={cn(
            'max-w-[60vw] min-w-[600px] max-h-[80vh] flex',
            'flex-col'
          )}
        >
          <div>
            <AlertDialogHeader>
              <AlertDialogTitle className='flex items-center space-x-2 gap-1'>
                {id ? edit.edit : edit.create}
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
          </div>

          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className={cn('space-y-4', 'flex-1', 'overflow-y-auto', 'mb-9')}
          >
            <div className={cn('p-4', 'space-y-4')}>
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
                        {edit.form.groupId.label}
                      </FormLabel>
                      <FormControl className='w-full'>
                        <SearchableSelect
                          {...field}
                          mode='single'
                          placeholder={edit.form.groupId.placeholder}
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
                        {edit.form.sourceType.label}
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
                      {edit.form.datasourceIds.label}
                      <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <SearchableSelect
                        {...field}
                        mode='multiple'
                        placeholder={edit.form.datasourceIds.placeholder}
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
                        {edit.form.step.label}
                        <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type='number'
                          min={1}
                          max={100}
                          placeholder={edit.form.step.placeholder}
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
                      <SearchableSelect
                        {...field}
                        mode='multiple'
                        options={categories}
                        placeholder={edit.form.categoriesIds.placeholder}
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
                      {edit.form.expr.label}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={edit.form.expr.placeholder}
                      />
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
                      {edit.form.alarmGroupIds.label}
                    </FormLabel>
                    <FormControl>
                      <SearchableSelect
                        {...field}
                        mode='multiple'
                        options={alarmNoticeGroupList.map((item) => ({
                          label: item.name,
                          value: item.id,
                        }))}
                        placeholder={edit.form.alarmGroupIds.placeholder}
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
                      {edit.form.labels.label}
                      <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <DynamicKeyValueInput
                        value={
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
                      {edit.form.labels.addRemark}
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
                      {edit.form.annotations.label}
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
                              {edit.form.annotations.summary.label}
                              <FormMessage />
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                autoComplete='off'
                                placeholder={
                                  edit.form.annotations.summary.placeholder
                                }
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
                              {edit.form.annotations.description.label}
                              <FormMessage />
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                autoComplete='off'
                                placeholder={
                                  edit.form.annotations.description.placeholder
                                }
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
                    {edit.form.strategyLevel.label} {strategyIndex + 1}
                  </h3>
                  <div className='grid grid-cols-2 gap-4'>
                    <FormField
                      control={form.control}
                      name={`strategyLevel.${strategyIndex}.levelId`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {edit.form.strategyLevel.levelId.label}
                            <FormMessage />
                          </FormLabel>
                          <SearchableSelect
                            {...field}
                            mode='single'
                            options={alarmLevelList}
                            placeholder={
                              edit.form.strategyLevel.levelId.placeholder
                            }
                          />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`strategyLevel.${strategyIndex}.condition`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {edit.form.strategyLevel.condition.label}{' '}
                            <FormMessage />
                          </FormLabel>
                          <SearchableSelect
                            {...field}
                            mode='single'
                            placeholder={
                              edit.form.strategyLevel.condition.placeholder
                            }
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
                          <FormLabel>
                            {edit.form.strategyLevel.threshold.label}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='text'
                              placeholder={
                                edit.form.strategyLevel.threshold.placeholder
                              }
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
                            {edit.form.strategyLevel.sustainType.label}{' '}
                            <FormMessage />
                          </FormLabel>
                          <SearchableSelect
                            {...field}
                            mode='single'
                            placeholder={
                              edit.form.strategyLevel.sustainType.placeholder
                            }
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
                            {edit.form.strategyLevel.duration.label}{' '}
                            <FormMessage />
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='number'
                              placeholder={
                                edit.form.strategyLevel.duration.placeholder
                              }
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
                            {edit.form.strategyLevel.count.label}
                            <FormMessage />
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='number'
                              placeholder={
                                edit.form.strategyLevel.count.placeholder
                              }
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
                          {edit.form.strategyLevel.alarmGroupIds.label}{' '}
                          <FormMessage />
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
                          placeholder={
                            edit.form.strategyLevel.alarmGroupIds.placeholder
                          }
                        />
                      </FormItem>
                    )}
                  />
                  <div>
                    <h4 className='text-sm font-semibold mb-2'>
                      {edit.form.strategyLevel.labelNotices.label}
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
                            {edit.form.strategyLevel.labelNotices.add}
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
                {edit.form.strategyLevel.add}
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

            <AlertDialogFooter
              className={cn('fixed bottom-0 left-0 right-0 p-4')}
            >
              <div className='h-[1px] bg-gray-200 dark:bg-gray-700' />
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
