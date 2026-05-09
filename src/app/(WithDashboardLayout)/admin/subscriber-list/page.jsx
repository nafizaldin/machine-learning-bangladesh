import { AdminLayout } from "@/components/pages/admin"
import SubscriberList from "@/components/pages/admin/dashboard/main/subscriber-list/SubscriberList"

 export const metadata = {
    title: 'Admin Subscribe List',
    description: 'Admin Subscribe List',
 }

const SubscribePage = async() => {


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
       <SubscriberList/>
    </AdminLayout>
  )
}

export default SubscribePage