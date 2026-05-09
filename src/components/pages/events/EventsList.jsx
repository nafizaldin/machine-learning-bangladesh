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

export default function EventsList() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    (async () => {
      const [data] = await eventStore.getAllEvents();
      setEvents(data || []);
      setLoading(false);
    })();
  }, []);

  const filtered = filter === 'all' ? events : events.filter(e => e.status === filter);

  return (
    <section className="component-gap-y component-gap-x">

      {/* Filter tabs */}
      <div className="flex gap-2 mb-10 flex-wrap">
        {['all', 'upcoming', 'past'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
              filter === f
                ? 'bg-[#4285F4] text-white'
                : 'bg-white border border-[#dadce0] text-[#5f6368] hover:border-[#4285F4] hover:text-[#4285F4]'
            }`}
          >
            {f === 'all' ? 'All Events' : f}
          </button>
        ))}
      </div>

      {loading ? (
        <CommonSkeleton count={3} type="cards" />
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-[#5f6368]">
          {filter === 'all' ? 'No events yet. Check back soon!' : `No ${filter} events found.`}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {filtered.map((event) => {
            const id = event._id || event.id;
            const tagStyle = TAG_COLORS[event.tag] || TAG_COLORS['Workshop'];
            return (
              <div
                key={id}
                className="bg-white rounded-2xl border border-[#dadce0] p-7 flex flex-col lg:flex-row gap-6 hover:shadow-md transition-shadow duration-300"
              >
                {/* Banner */}
                {event.featuredImage && (
                  <div className="lg:w-52 flex-shrink-0 rounded-xl overflow-hidden h-36">
                    <img src={baseUrl + event.featuredImage} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Left — info */}
                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {event.tag && (
                      <span className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full" style={{ color: tagStyle.color, backgroundColor: tagStyle.bg }}>
                        {event.tag}
                      </span>
                    )}
                    {event.status && (
                      <span className="text-xs text-[#5f6368] bg-[#f8f9fa] px-2.5 py-1 rounded-full border border-[#dadce0] capitalize">
                        {event.status}
                      </span>
                    )}
                    {event.date && <span className="text-xs text-[#5f6368]">{event.date}</span>}
                    {event.platform && <span className="text-xs text-[#5f6368]">· {event.platform}</span>}
                  </div>

                  <h3 className="text-[1.2rem] font-semibold text-[#202124] leading-snug">{event.title}</h3>
                  <p className="text-[#5f6368] text-sm leading-relaxed">{event.summary || event.description}</p>

                  <div className="flex flex-wrap gap-2 mt-auto pt-1">
                    {event.registrationLink && (
                      <Link
                        href={event.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-white bg-[#4285F4] px-4 py-2 rounded-lg hover:bg-[#1967d2] transition-colors"
                      >
                        Register / View
                      </Link>
                    )}
                  </div>
                </div>

                {/* Right — highlights */}
                {event.highlights?.length > 0 && (
                  <div className="lg:w-56 flex-shrink-0">
                    <div className="bg-[#f8f9fa] rounded-xl p-4 h-full">
                      {event.participants && (
                        <p className="text-xs font-bold text-[#4285F4] mb-3">{event.participants} participants</p>
                      )}
                      <h4 className="text-xs font-semibold text-[#202124] uppercase tracking-wide mb-3">Highlights</h4>
                      <ul className="flex flex-col gap-2">
                        {event.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-[#5f6368]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4] mt-1.5 flex-shrink-0"></span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* CTA */}
      <div className="mt-14 text-center bg-[#e8f0fe] rounded-2xl p-10">
        <h3 className="text-[1.25rem] font-semibold text-[#202124] mb-3">Stay tuned for upcoming events!</h3>
        <p className="text-[#5f6368] text-sm mb-6 max-w-md mx-auto">
          Subscribe to our newsletter or follow us on social media to be the first to know about new workshops, competitions, and study groups.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-[#4285F4] text-white font-medium px-6 py-3 rounded-lg hover:bg-[#1967d2] transition-colors duration-200"
        >
          Get Notified
        </Link>
      </div>
    </section>
  );
}
