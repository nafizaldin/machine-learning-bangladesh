'use client'
import dynamic from "next/dynamic"
import { AdminLayout } from "@/components/pages/admin"
// import UpdateResource from "@/components/pages/admin/dashboard/main/resources/update-resource/UpdateResource"
const UpdateResource = dynamic(() => import('@/components/pages/admin/dashboard/main/resources/update-resource/UpdateResource'), { ssr: false });

const ResourceUpdatePage = () => {
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
        <UpdateResource />
    </AdminLayout>
  )
}

export default ResourceUpdatePage