'use client';

export default function Journey() {
  const milestones = [
    { year: 'Sep 2023', label: 'Founded as TensorFlow User Group North Bengal', color: '#4285F4' },
    { year: 'Oct 2023', label: 'First event: Intro to Explore ML with CrowdSource', color: '#34A853' },
    { year: 'Nov 2023', label: 'Renamed to Machine Learning Bangladesh', color: '#FBBC04' },
    { year: '2024', label: 'Joined Google AI Community Network', color: '#EA4335' },
    { year: '2024', label: 'ML Olympiad 2024 — 300+ participants on Kaggle', color: '#4285F4' },
    { year: 'Today', label: '1.9K+ members across Bangladesh', color: '#34A853' },
  ];

  return (
    <section className="w-full component-gap-y component-gap-x bg-[#f8f9fa]">
      <div className="text-center mb-12">
        <span className="text-xs font-semibold text-[#4285F4] uppercase tracking-widest">Our Story</span>
        <h2 className="heading-56 font-bold text-[#202124] mt-3">
          Our Journey
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-12">

        {/* Video embed placeholder */}
        <div className="w-full lg:w-1/2">
          <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#e8f0fe] to-[#c2d7f5] aspect-video flex items-center justify-center shadow-sm">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#4285F4] rounded-full flex items-center justify-center mx-auto mb-3 opacity-90">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-[#5f6368] text-sm">Community Video Coming Soon</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="w-full lg:w-1/2">
          <p className="text-[#5f6368] subheading-24 leading-relaxed mb-8">
            Our journey began in September 2023 as the TensorFlow User Group North Bengal. Embracing naming flexibility, we evolved into Machine Learning Bangladesh to better serve the entire nation. As a proud member of the Google AI Community Network, we&apos;ve hosted over 7 events and grown to 1.9K+ members, fostering a vibrant ecosystem for AI enthusiasts.
          </p>

          <div className="flex flex-col gap-4">
            {milestones.map((m, i) => (
              <div key={i} className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-16 text-center text-xs font-semibold py-1 px-2 rounded-full mt-0.5"
                  style={{ color: m.color, backgroundColor: m.color + '1a' }}
                >
                  {m.year}
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: m.color }}></div>
                  <p className="text-[#202124] text-sm leading-snug">{m.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
