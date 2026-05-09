import { AdminLayout } from "@/components/pages/admin";
import UpdateEvent from "@/components/pages/admin/dashboard/main/events/update-event/UpdateEvent";

export const metadata = {
  title: "Admin — Update Event",
  description: "Update an ML Bangladesh event",
};

const UpdateEventPage = () => {
  return (
    <AdminLayout>
      <UpdateEvent />
    </AdminLayout>
  );
};

export default UpdateEventPage;
