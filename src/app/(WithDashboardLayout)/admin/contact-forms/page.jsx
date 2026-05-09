import { AdminLayout } from "@/components/pages/admin"
import ContactLists from "@/components/pages/admin/dashboard/main/contact-form-lists/ContactLists"

 export const metadata = {
    title: 'Admin Contact List',
    description: 'Admin Contact List',
 }

const ContactPage = async() => {


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
       <ContactLists/>
    </AdminLayout>
  )
}

export default ContactPage