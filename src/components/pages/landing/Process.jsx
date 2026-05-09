'use client';

const stats = [
  {
    value: '1.9K+',
    label: 'Community Members',
    color: '#4285F4',
    bg: '#e8f0fe',
  },
  {
    value: '7+',
    label: 'Events Hosted',
    color: '#34A853',
    bg: '#e6f4ea',
  },
  {
    value: '300+',
    label: 'Olympiad Participants',
    color: '#FBBC04',
    bg: '#fef9e7',
  },
  {
    value: '2023',
    label: 'Founded',
    color: '#EA4335',
    bg: '#fce8e6',
  },
  {
    value: '1',
    label: 'Google AI Network',
    color: '#4285F4',
    bg: '#e8f0fe',
  },
  {
    value: 'Free',
    label: 'All Resources',
    color: '#34A853',
    bg: '#e6f4ea',
  },
];

export default function Process() {
  return (
    <section className="component-gap-y component-gap-x bg-[#f8f9fa]">
      <div className="text-center mb-14">
        <span className="text-xs font-semibold text-[#4285F4] uppercase tracking-widest">Community</span>
        <h2 className="heading-56 font-bold text-[#202124] mt-3 mb-4">
          Our Impact in Numbers
        </h2>
        <p className="text-[#5f6368] subheading-24 max-w-xl mx-auto">
          Growing together since September 2023
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-5 flex flex-col items-center text-center border border-[#dadce0]"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center mb-3 text-lg font-bold"
              style={{ backgroundColor: stat.bg, color: stat.color }}
            >
              {stat.value.length <= 4 ? '' : '●'}
            </div>
            <div className="text-[1.75rem] font-bold text-[#202124] leading-none mb-1"
              style={{ color: stat.color }}
            >
              {stat.value}
            </div>
            <div className="text-[0.75rem] text-[#5f6368] mt-1 leading-snug">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
