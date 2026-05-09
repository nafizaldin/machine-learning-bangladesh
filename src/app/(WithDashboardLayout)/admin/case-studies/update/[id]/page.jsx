import { AdminLayout } from "@/components/pages/admin"
import UpdateCaseStudy from "@/components/pages/admin/dashboard/main/case-studies/update-case-study/UpdateCaseStudy"

export const metadata = {
    title: 'Admin update Case Study',
    description: 'Admin update Case Study',
}

const CaseStudyUpdatePage = () => {
    return (
        <AdminLayout>
            <UpdateCaseStudy/>
        </AdminLayout>
    )
}

export default CaseStudyUpdatePage
