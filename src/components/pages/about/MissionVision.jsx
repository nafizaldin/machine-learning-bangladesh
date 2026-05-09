'use client';

export default function MissionVision() {
  const stats = [
    { value: '1.9K+', label: 'Members', color: '#4285F4', bg: '#e8f0fe' },
    { value: '7+', label: 'Events', color: '#34A853', bg: '#e6f4ea' },
    { value: '2023', label: 'Founded', color: '#EA4335', bg: '#fce8e6' },
  ];

  return (
    <section className="component-gap-y component-gap-x">
      <h2 className="heading-56 text-[#202124] text-center mb-16">Mission &amp; Vision</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-12">

        {/* Left — illustration + stats */}
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#e8f0fe] to-[#c2d7f5] aspect-[4/3] flex items-center justify-center shadow-sm">
            <svg viewBox="0 0 400 300" className="w-4/5 h-4/5" fill="none">
              {/* Bangladesh map-like shape + AI theme */}
              <circle cx="200" cy="150" r="90" fill="#4285F4" fillOpacity="0.1"/>
              <circle cx="200" cy="150" r="60" fill="#4285F4" fillOpacity="0.15"/>
              <circle cx="200" cy="150" r="30" fill="#4285F4" fillOpacity="0.3"/>
              <text x="200" y="158" textAnchor="middle" fill="#4285F4" fontSize="18" fontWeight="700" fontFamily="Arial">AI for BD</text>
              {/* Google color dots */}
              {[
                [200, 60, '#4285F4'], [270, 90, '#34A853'], [300, 150, '#FBBC04'],
                [270, 210, '#EA4335'], [200, 240, '#4285F4'], [130, 210, '#34A853'],
                [100, 150, '#FBBC04'], [130, 90, '#EA4335'],
              ].map(([cx, cy, fill], i) => (
                <circle key={i} cx={cx} cy={cy} r="10" fill={fill} fillOpacity="0.7"/>
              ))}
            </svg>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {stats.map((s, i) => (
              <div key={i} className="bg-white rounded-xl border border-[#dadce0] p-5 text-center">
                <div className="text-[1.75rem] font-bold" style={{ color: s.color }}>{s.value}</div>
                <div className="text-[#5f6368] text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — mission/vision cards */}
        <div className="flex flex-col gap-6">
          <div className="p-7 rounded-2xl border border-[#dadce0] bg-white">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-lg bg-[#e8f0fe] flex items-center justify-center text-[#4285F4] font-bold text-sm">M</span>
              <h3 className="text-[1.1rem] font-semibold text-[#202124]">Mission</h3>
            </div>
            <p className="text-[#5f6368] leading-relaxed subheading-24">
              To democratize AI and ML education in Bangladesh by providing free resources, workshops, and collaborative opportunities for all skill levels.
            </p>
          </div>

          <div className="p-7 rounded-2xl border border-[#dadce0] bg-white">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-lg bg-[#e6f4ea] flex items-center justify-center text-[#34A853] font-bold text-sm">V</span>
              <h3 className="text-[1.1rem] font-semibold text-[#202124]">Vision</h3>
            </div>
            <p className="text-[#5f6368] leading-relaxed subheading-24">
              To build a thriving network of AI innovators who drive technological advancement and ethical practices in Bangladesh and beyond.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[#e8f0fe] border border-[#c5d9f7]">
            <h3 className="text-[1rem] font-semibold text-[#202124] mb-3">Community Values</h3>
            <div className="flex flex-wrap gap-2">
              {['Openness', 'Collaboration', 'Ethical AI', 'Inclusivity', 'Innovation', 'Free Access'].map((v) => (
                <span key={v} className="bg-white text-[#1967d2] text-xs font-medium px-3 py-1 rounded-full border border-[#c5d9f7]">
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
