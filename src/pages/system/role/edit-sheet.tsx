import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Sheet,
} from '@/components/ui/sheet'
import FormBasedRolePermissionEditor from './role-permission-edit'

export interface EditSheetProps {
  open?: boolean
  setOpen?: (open: boolean) => void
}

export function EditSheet({ open, setOpen }: EditSheetProps) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side='right' className='sm:max-w-[800px]'>
        <SheetHeader>
          <SheetTitle>高级权限编辑</SheetTitle>
          <SheetDescription>
            <p>
              高级权限编辑，可以给角色分配高级权限，高级权限可以覆盖基础权限。
            </p>
          </SheetDescription>
        </SheetHeader>
        <FormBasedRolePermissionEditor />
      </SheetContent>
    </Sheet>
  )
}
