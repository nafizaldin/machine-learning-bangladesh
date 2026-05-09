import { AdminLayout } from "@/components/pages/admin"
import BlogList from "@/components/pages/admin/dashboard/main/blogs/blog-list/BlogList"


 export const metadata = {
    title: 'Admin Blog List Dashboard',
    description: 'Admin Blog List Dashboard',
 }

const BlogListPage = () => {
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

     <BlogList />
        
    </AdminLayout>
  )
}

export default BlogListPage
