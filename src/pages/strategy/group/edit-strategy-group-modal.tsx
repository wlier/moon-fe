import { dictSelectList } from '@/api/dict'
import { DictType, Status } from '@/api/enum'
import { SelectItem } from '@/api/model-types'
import { createStrategyGroup } from '@/api/strategy'
import { MultiSelect } from '@/components/multi-select'
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useI18nConfig } from '@/locale'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

export interface EditStrategyModalProps {
  id?: number
  open?: boolean
  setOpen?: (open: boolean) => void
  onOk?: () => void
}

export function EditStrategyGroupModal(props: EditStrategyModalProps) {
  const { id, open, setOpen, onOk } = props

  const {
    Layout: {
      strategy: {
        group: { edit },
      },
    },
  } = useI18nConfig()

  const editStrategyGroupSchema = z.object({
    id: z
      .number()
      .optional()
      .default(id || 0),
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
  })

  const form = useForm<z.infer<typeof editStrategyGroupSchema>>({
    resolver: zodResolver(editStrategyGroupSchema),
    defaultValues: {
      name: '',
      remark: '',
      categoriesIds: [],
    },
  })

  type FormValues = z.infer<typeof editStrategyGroupSchema>

  const handleCancel = () => {
    form.reset()
    setOpen?.(false)
  }

  const handleSubmit = (values: FormValues) => {
    createStrategyGroup(values).then(() => {
      toast.success(values.name + '创建成功')
      handleCancel()
      onOk?.()
    })
  }

  const [categories, setCategories] = useState<SelectItem[]>([])
  const handleGetCategories = () => {
    dictSelectList({
      pagination: { pageNum: 1, pageSize: 999 },
      dictType: DictType.DictTypeStrategyGroupCategory,
    }).then((res) => {
      setCategories(res.list)
    })
  }

  useEffect(() => {
    handleGetCategories()
  }, [])

  return (
    <Form {...form}>
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='flex items-center space-x-2 gap-1'>
              创建策略组
              <Button
                variant='ghost'
                className='ml-auto'
                onClick={() => setOpen?.(false)}
              >
                <X />
              </Button>
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription />
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-4'
          >
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
