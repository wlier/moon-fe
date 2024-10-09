import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import TriStateCheckbox from '@/components/tri-state-checkbox'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

// 模拟的角色和API权限数据，按模块分类
const roles = ['管理员', '编辑', '查看者']
const apiPermissions: Record<string, string[]> = {
  用户管理: ['获取用户列表', '创建用户', '更新用户', '删除用户'],
  文章管理: ['获取文章列表', '创建文章', '更新文章', '删除文章'],
  评论管理: ['获取评论列表', '创建评论', '更新评论', '删除评论'],
  角色管理: ['获取角色列表', '创建角色', '更新角色', '删除角色'],
  // ...其他模块
}

// 定义表单的验证模式
const formSchema = z.object({
  role: z.string().min(1, { message: '请选择一个角色' }),
  permissions: z.array(z.string()).min(1, { message: '请至少选择一个权限' }),
})

type FormValuesType = z.infer<typeof formSchema>

export interface FormBasedRolePermissionEditorProps {
  open?: boolean
  setOpen?: (open: boolean) => void
  defaultValues?: FormValuesType
}

export default function FormBasedRolePermissionEditor({
  defaultValues = { role: '', permissions: [] as string[] },
  setOpen,
  open,
}: FormBasedRolePermissionEditorProps) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const { control, handleSubmit, watch, setValue } = form

  const selectedPermissions: string[] = watch('permissions')

  const handlePermissionToggle = (permission: string) => {
    const currentPermissions: string[] = form.getValues('permissions')
    const updatedPermissions: string[] = currentPermissions.includes(permission)
      ? currentPermissions.filter((p) => p !== permission)
      : [...currentPermissions, permission]
    setValue('permissions', updatedPermissions, { shouldValidate: true })
  }

  const handleModuleToggle = (module: string) => {
    const modulePermissions: string[] = apiPermissions[module]
    const currentPermissions: string[] = form.getValues('permissions')
    const allSelected = modulePermissions.every((p) =>
      currentPermissions.includes(p)
    )

    const updatedPermissions: string[] = allSelected
      ? currentPermissions.filter((p) => !modulePermissions.includes(p))
      : [...new Set([...currentPermissions, ...modulePermissions])]

    setValue('permissions', updatedPermissions, { shouldValidate: true })
  }

  const getModuleCheckboxState = (module: string) => {
    const modulePermissions = apiPermissions[module]
    const allSelected = modulePermissions.every((p) =>
      selectedPermissions.includes(p)
    )
    const someSelected = modulePermissions.some((p) =>
      selectedPermissions.includes(p)
    )

    if (allSelected) return true
    if (someSelected) return 'indeterminate'
    return false
  }

  const onSubmit = (data: FormValuesType) => {
    console.log('表单提交的数据:', data)
    // 这里您可以添加实际的保存逻辑，例如发送API请求
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent
            side='right'
            className='sm:max-w-[800px] overflow-auto max-h-[100vh]'
          >
            <SheetHeader>
              <SheetTitle>高级权限编辑</SheetTitle>
              <SheetDescription>
                <p>
                  高级权限编辑，可以给角色分配高级权限，高级权限可以覆盖基础权限。
                </p>
              </SheetDescription>
            </SheetHeader>
            <div className='space-y-6'>
              <FormField
                control={control}
                name='role'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>角色</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='选择角色' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 '>
                <Card className='bg-card'>
                  <CardHeader>
                    <CardTitle className='text-lg'>API权限（按模块）</CardTitle>
                  </CardHeader>
                  <CardContent className='max-h-[100vh] overflow-auto flex w-full'>
                    <ScrollArea className='h-[400px] pr-4 w-full'>
                      <Accordion type='multiple' className='w-full'>
                        {Object.entries(apiPermissions).map(
                          ([module, permissions]) => (
                            <AccordionItem
                              value={module}
                              key={module}
                              className='border-b border-border'
                            >
                              <AccordionTrigger className='hover:no-underline'>
                                <div className='flex items-center space-x-2'>
                                  <TriStateCheckbox
                                    checked={getModuleCheckboxState(module)}
                                    onCheckedChange={() =>
                                      handleModuleToggle(module)
                                    }
                                  />
                                  <span className='text-sm font-medium'>
                                    {module}
                                  </span>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className='pl-6 space-y-2'>
                                  {permissions.map((permission) => (
                                    <div
                                      key={permission}
                                      className='flex items-center space-x-2'
                                    >
                                      <Checkbox
                                        id={permission}
                                        checked={selectedPermissions.includes(
                                          permission
                                        )}
                                        onCheckedChange={() =>
                                          handlePermissionToggle(permission)
                                        }
                                      />
                                      <label
                                        htmlFor={permission}
                                        className='text-sm text-muted-foreground'
                                      >
                                        {permission}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          )
                        )}
                      </Accordion>
                    </ScrollArea>
                  </CardContent>
                </Card>

                <Card className='bg-card'>
                  <CardHeader>
                    <CardTitle className='text-lg'>已选择的权限</CardTitle>
                  </CardHeader>
                  <CardContent className='max-h-[100vh] overflow-auto flex w-full'>
                    <ScrollArea className='h-[400px]'>
                      {Object.entries(apiPermissions).map(
                        ([module, permissions]) => {
                          const selectedModulePermissions = permissions.filter(
                            (p) => selectedPermissions.includes(p)
                          )
                          if (selectedModulePermissions.length === 0)
                            return null
                          return (
                            <div key={module} className='mb-4'>
                              <h3 className='font-semibold mb-2 text-primary'>
                                {module}
                              </h3>
                              <ul className='list-disc list-inside'>
                                {selectedModulePermissions.map((permission) => (
                                  <li
                                    key={permission}
                                    className='text-sm text-muted-foreground'
                                  >
                                    {permission}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )
                        }
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>
          </SheetContent>
          <SheetFooter>
            <Button type='submit' className='w-full'>
              保存权限设置
            </Button>
          </SheetFooter>
        </Sheet>
      </form>
    </Form>
  )
}
