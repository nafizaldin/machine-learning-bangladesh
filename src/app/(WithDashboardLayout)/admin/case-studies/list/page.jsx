import { AdminLayout } from "@/components/pages/admin"
import CaseStudyList from "@/components/pages/admin/dashboard/main/case-studies/case-study-list/CaseStudyList"

export const metadata = {
    title: 'Admin Case Study List Dashboard',
    description: 'Admin Case Study List Dashboard',
}

const CaseStudyListPage = () => {
    return (
        <AdminLayout>
            <CaseStudyList />
        </AdminLayout>
    )
}

export default CaseStudyListPage
