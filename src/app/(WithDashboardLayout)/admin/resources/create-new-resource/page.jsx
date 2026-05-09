import { AdminLayout } from "@/components/pages/admin"
import CreateNewResource from "@/components/pages/admin/dashboard/main/resources/create-new-resource/CreateNewResource"

 export const metadata = {
    title: 'Admin Create New Resource',
    description: 'Admin Create New Resource',
 }

const ResourceCreatePage = () => {
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
        <CreateNewResource />
    </AdminLayout>
  )
}

export default ResourceCreatePage