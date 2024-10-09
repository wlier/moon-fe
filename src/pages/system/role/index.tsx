import { Button } from '@/components/ui/button'
import { useState } from 'react'
import FormBasedRolePermissionEditor from './role-permission-edit'

function RoleList() {
  const [openRolePermission, setOpenRolePermission] = useState(false)
  return (
    <>
      <FormBasedRolePermissionEditor
        open={openRolePermission}
        setOpen={setOpenRolePermission}
      />
      <Button size='sm' onClick={() => setOpenRolePermission(true)}>
        Add Role
      </Button>
    </>
  )
}

export default RoleList
