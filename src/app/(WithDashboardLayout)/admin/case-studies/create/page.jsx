import { AdminLayout } from "@/components/pages/admin"
import CreateNewCaseStudy from "@/components/pages/admin/dashboard/main/case-studies/create-new-case-study/CreateNewCaseStudy"

export const metadata = {
    title: 'Admin create Case Study',
    description: 'Admin create Case Study',
}

const CaseStudyCreatePage = () => {
    return (
        <AdminLayout>
            <CreateNewCaseStudy/>
        </AdminLayout>
    )
}

export default CaseStudyCreatePage
