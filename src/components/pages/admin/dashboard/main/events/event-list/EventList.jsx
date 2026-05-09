"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2, Pencil, Calendar } from "lucide-react";
import { toast } from "react-toastify";
import CommonSkeleton from "@/components/utilityComponents/commonSkeleton/CommonSkeleton";
import FlexibleButton from "@/components/utilityComponents/customBtns/FlexibleButton";
import DeleteDialog from "@/components/utilityComponents/DeleteDialog/DeleteDialog";
import eventStore from "@/store/eventStore";

const TAG_COLORS = {
  Competition: { color: '#4285F4', bg: '#e8f0fe' },
  Workshop:    { color: '#34A853', bg: '#e6f4ea' },
  Seminar:     { color: '#F9AB00', bg: '#fef9e7' },
  'Study Group': { color: '#EA4335', bg: '#fce8e6' },
};

export default function EventList() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  async function fetchAllEvents() {
    setLoading(true);
    const [data, err] = await eventStore.getAllAdminEvents();
    setAllEvents(err || !data?.length ? [] : data);
    setLoading(false);
  }

  useEffect(() => { fetchAllEvents(); }, []);

  async function handleDeleteConfirm() {
    if (!selectedEventId) return;
    const [, error] = await eventStore.deleteEvent(selectedEventId);
    if (error) toast.error(error);
    else {
      toast.success("Event deleted successfully!");
      setAllEvents(prev => prev.filter(e => (e._id || e.id) !== selectedEventId));
    }
    setOpenDeleteModal(false);
    setSelectedEventId(null);
  }

  return (
    <>
      <DeleteDialog
        open={openDeleteModal}
        title="Delete Event?"
        description="Are you sure you want to delete this event? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setOpenDeleteModal(false)}
      />

      <section className="component-gap-y component-gap-x">
        <div className="flex items-center justify-between mb-10">
          <h2 className="heading-56 text-[#202124]">All Events</h2>
          <Link href="/admin/events/create-new-event">
            <FlexibleButton label="Create New Event" variant="solid" />
          </Link>
        </div>

        {loading ? (
          <CommonSkeleton count={3} />
        ) : allEvents.length === 0 ? (
          <div className="w-full py-20 flex flex-col items-center justify-center text-center">
            <Calendar className="w-12 h-12 text-gray-400 opacity-40 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Events Yet</h3>
            <p className="text-gray-500 max-w-sm mb-6">
              Create your first event to display on the public events page.
            </p>
            <Link href="/admin/events/create-new-event">
              <FlexibleButton label="Create New Event" variant="outline" />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {allEvents.map((event) => {
              const id = event._id || event.id;
              const tagStyle = TAG_COLORS[event.tag] || TAG_COLORS['Workshop'];
              return (
                <div
                  key={id}
                  className="bg-white rounded-2xl border border-[#dadce0] p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-sm transition-shadow"
                >
                  {/* Thumbnail */}
                  {event.featuredImage && (
                    <div className="w-full sm:w-28 h-20 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={baseUrl + event.featuredImage}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      {event.tag && (
                        <span
                          className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                          style={{ color: tagStyle.color, backgroundColor: tagStyle.bg }}
                        >
                          {event.tag}
                        </span>
                      )}
                      {event.status && (
                        <span className="text-xs text-[#5f6368] bg-[#f8f9fa] px-2.5 py-0.5 rounded-full border border-[#dadce0] capitalize">
                          {event.status}
                        </span>
                      )}
                      {event.date && (
                        <span className="text-xs text-[#5f6368]">{event.date}</span>
                      )}
                    </div>
                    <h3 className="text-[1rem] font-semibold text-[#202124] truncate">{event.title}</h3>
                    {event.summary && (
                      <p className="text-sm text-[#5f6368] mt-0.5 line-clamp-1">{event.summary}</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Link
                      href={`/admin/events/update/${id}`}
                      className="p-2 text-[#5f6368] hover:text-[#4285F4] transition-colors"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </Link>
                    <button
                      onClick={() => { setSelectedEventId(id); setOpenDeleteModal(true); }}
                      className="p-2 text-[#EA4335] hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
