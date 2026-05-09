import { AdminLayout } from "@/components/pages/admin";
import EventList from "@/components/pages/admin/dashboard/main/events/event-list/EventList";

export const metadata = {
  title: "Admin — Event List",
  description: "Manage ML Bangladesh events",
};

const EventListPage = () => {
  return (
    <AdminLayout>
      <EventList />
    </AdminLayout>
  );
};

export default EventListPage;
