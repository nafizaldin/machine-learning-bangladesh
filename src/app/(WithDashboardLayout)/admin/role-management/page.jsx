import { AdminLayout } from "@/components/pages/admin"
import RoleList from "@/components/pages/admin/dashboard/main/role-list/RoleList"

 export const metadata = {
    title: 'Admin Role Management',
    description: 'Admin Role Management',
 }

const RolePage = () => {
    /*
        TODO: create 2 Components
        1. <AdminLayout> = this will be the common layout for all admin/** pages. This Component will recieve only one children
        2. <Main> = this will be the main content of the page

        ! Following is the structure of the page
        <AdminLayout>
            <Main />
        </AdminLayout>

        Follow the above structure For all the pages
    */
  return (
    
    <AdminLayout>
       <RoleList />
    </AdminLayout>
  )
}

export default RolePage