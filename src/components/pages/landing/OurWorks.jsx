'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import eventStore from '@/store/eventStore';
import CommonSkeleton from '@/components/utilityComponents/commonSkeleton/CommonSkeleton';

const TAG_COLORS = {
  Competition:   { color: '#4285F4', bg: '#e8f0fe' },
  Workshop:      { color: '#34A853', bg: '#e6f4ea' },
  Seminar:       { color: '#F9AB00', bg: '#fef9e7' },
  'Study Group': { color: '#EA4335', bg: '#fce8e6' },
};

export default function OurWorks() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [data] = await eventStore.getAllEvents();
      setEvents(data?.slice(0, 4) || []);
      setLoading(false);
    })();
  }, []);

  return (
    <section className="component-gap-y component-gap-x bg-white">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
        <div>
          <span className="text-xs font-semibold text-[#4285F4] uppercase tracking-widest">Events</span>
          <h2 className="heading-56 font-bold text-[#202124] mt-3 mb-2">Our Events</h2>
          <p className="text-[#5f6368] subheading-24">Past highlights and upcoming gatherings</p>
        </div>
        <Link
          href="/events"
          className="self-start md:self-auto inline-flex items-center gap-2 bg-white text-[#202124] font-medium px-5 py-2.5 rounded-lg border border-[#dadce0] hover:border-[#4285F4] hover:text-[#4285F4] transition-colors duration-200 text-sm whitespace-nowrap"
        >
          View All Events
        </Link>
      </div>

      {loading ? (
        <CommonSkeleton count={4} type="cards" />
      ) : events.length === 0 ? (
        <p className="text-[#5f6368] text-center py-12">No events yet. Check back soon!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {events.map((event) => {
            const id = event._id || event.id;
            const tagStyle = TAG_COLORS[event.tag] || TAG_COLORS['Workshop'];
            return (
              <div
                key={id}
                className="bg-[#f8f9fa] rounded-2xl p-6 flex flex-col gap-4 border border-[#dadce0] hover:shadow-md transition-shadow duration-300"
              >
                {event.featuredImage && (
                  <div className="w-full h-40 rounded-xl overflow-hidden">
                    <img src={baseUrl + event.featuredImage} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full" style={{ color: tagStyle.color, backgroundColor: tagStyle.bg }}>
                    {event.tag}
                  </span>
                  {event.date && <span className="text-xs text-[#5f6368]">{event.date}</span>}
                </div>

                <h3 className="text-[1.1rem] font-semibold text-[#202124] leading-snug">{event.title}</h3>

                <p className="text-[#5f6368] text-sm leading-relaxed line-clamp-3">{event.summary}</p>

                <div className="flex items-center justify-between mt-auto pt-2 border-t border-[#dadce0]">
                  {event.participants && (
                    <span className="text-xs text-[#5f6368]">
                      <strong className="text-[#202124]">{event.participants}</strong> participants
                    </span>
                  )}
                  <Link href="/events" className="text-xs font-medium text-[#4285F4] hover:underline ml-auto">
                    Learn more →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
