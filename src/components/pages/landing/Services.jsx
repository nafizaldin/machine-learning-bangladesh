'use client';

const activities = [
  {
    id: 1,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="2" y="4" width="24" height="18" rx="3" stroke="#4285F4" strokeWidth="2" fill="none"/>
        <line x1="2" y1="10" x2="26" y2="10" stroke="#4285F4" strokeWidth="2"/>
        <circle cx="14" cy="16" r="2.5" fill="#4285F4"/>
        <line x1="14" y1="22" x2="14" y2="26" stroke="#4285F4" strokeWidth="2"/>
        <line x1="8" y1="26" x2="20" y2="26" stroke="#4285F4" strokeWidth="2"/>
      </svg>
    ),
    color: '#4285F4',
    lightBg: '#e8f0fe',
    title: 'Workshops & Seminars',
    description: 'Free sessions on AI ethics, CNNs, and Google tools — open to all skill levels nationwide.',
  },
  {
    id: 2,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L17 10H24L18.5 14.5L20.5 21.5L14 17.5L7.5 21.5L9.5 14.5L4 10H11L14 3Z" stroke="#34A853" strokeWidth="2" fill="none" strokeLinejoin="round"/>
      </svg>
    ),
    color: '#34A853',
    lightBg: '#e6f4ea',
    title: 'ML Competitions',
    description: 'Events like ML Olympiad on Kaggle to sharpen skills in real-world machine learning challenges.',
  },
  {
    id: 3,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="#FBBC04" strokeWidth="2" fill="none"/>
        <circle cx="8" cy="10" r="2.5" fill="#FBBC04"/>
        <circle cx="20" cy="10" r="2.5" fill="#FBBC04"/>
        <circle cx="14" cy="20" r="2.5" fill="#FBBC04"/>
        <line x1="8" y1="10" x2="20" y2="10" stroke="#FBBC04" strokeWidth="1.5"/>
        <line x1="8" y1="10" x2="14" y2="20" stroke="#FBBC04" strokeWidth="1.5"/>
        <line x1="20" y1="10" x2="14" y2="20" stroke="#FBBC04" strokeWidth="1.5"/>
      </svg>
    ),
    color: '#F9AB00',
    lightBg: '#fef9e7',
    title: 'Study Groups',
    description: 'Collaborative learning circles with free Google swag for hosts — build skills together.',
  },
  {
    id: 4,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="8" r="4" stroke="#EA4335" strokeWidth="2" fill="none"/>
        <circle cx="6" cy="20" r="3" stroke="#EA4335" strokeWidth="2" fill="none"/>
        <circle cx="22" cy="20" r="3" stroke="#EA4335" strokeWidth="2" fill="none"/>
        <line x1="14" y1="12" x2="6" y2="17" stroke="#EA4335" strokeWidth="1.5"/>
        <line x1="14" y1="12" x2="22" y2="17" stroke="#EA4335" strokeWidth="1.5"/>
      </svg>
    ),
    color: '#EA4335',
    lightBg: '#fce8e6',
    title: 'Community Support',
    description: 'Networking, mentorship, and resources via our Google AI affiliation — grow together.',
  },
];

export default function Services() {
  return (
    <section className="component-gap-x component-gap-y bg-[#f8f9fa]">
      <div className="text-center mb-14">
        <span className="text-xs font-semibold text-[#4285F4] uppercase tracking-widest">What We Do</span>
        <h2 className="heading-56 font-bold text-[#202124] mt-3 mb-4">
          What We Do at ML Bangladesh
        </h2>
        <p className="text-[#5f6368] subheading-24 max-w-2xl mx-auto">
          Empowering AI enthusiasts through action
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {activities.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-6 flex flex-col gap-4 border border-[#dadce0] hover:shadow-md transition-shadow duration-300"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: item.lightBg }}
            >
              {item.icon}
            </div>
            <h3 className="text-[1rem] font-semibold text-[#202124]">{item.title}</h3>
            <p className="text-[#5f6368] text-sm leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
