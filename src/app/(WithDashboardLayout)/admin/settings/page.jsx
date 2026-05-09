import { AdminLayout } from "@/components/pages/admin"
import GtmId from "@/components/pages/admin/dashboard/main/settings/GTMId/GTMId"
import FbPixelId from "@/components/pages/admin/dashboard/main/settings/FbPixelId/FbPixelId"
import ContactNotificationEmails from "@/components/pages/admin/dashboard/main/settings/ContactNotificationEmails/ContactNotificationEmails"

 export const metadata = {
    title: 'Admin Settings',
    description: 'Admin Settings',
 }

const SettingsPage = () => {
  return (
    <AdminLayout>
      <div className="flex flex-row gap-6">
        <div className="flex flex-col gap-6 flex-1">
          <GtmId />
          <FbPixelId />
        </div>
        <div className="flex-1">
          <ContactNotificationEmails />
        </div>
      </div>
    </AdminLayout>
  )
}

export default SettingsPage