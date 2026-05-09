import { AdminLayout } from "@/components/pages/admin";
import CreateNewEvent from "@/components/pages/admin/dashboard/main/events/create-new-event/CreateNewEvent";

export const metadata = {
  title: "Admin — Create Event",
  description: "Create a new ML Bangladesh event",
};

const CreateNewEventPage = () => {
  return (
    <AdminLayout>
      <CreateNewEvent />
    </AdminLayout>
  );
};

export default CreateNewEventPage;
