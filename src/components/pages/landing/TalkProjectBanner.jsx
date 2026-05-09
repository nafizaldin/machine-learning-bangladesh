'use client';

import Link from 'next/link';

const TalkProjectBanner = ({
  heading = 'Join the ML Bangladesh Community',
  text = 'Whether you\'re a beginner or an expert, there\'s a place for you. Connect, learn, and grow with 1.9K+ AI enthusiasts across Bangladesh.',
  buttonText = 'Become a Member',
  secondaryText = 'Explore Events',
  secondaryHref = '/events',
}) => {
  return (
    <section className="component-gap-y mx-4 lg:mx-20 bg-[#e8f0fe] rounded-3xl overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center gap-8">

        {/* Left */}
        <div className="lg:w-3/5 w-full px-10 py-12 flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 bg-white text-[#1967d2] text-xs font-semibold px-3 py-1.5 rounded-full w-fit">
            <span className="w-2 h-2 rounded-full bg-[#4285F4]"></span>
            Google AI Community Network
          </div>
          <h2 className="heading-56 text-[#202124] font-bold leading-tight">
            {heading}
          </h2>
          <p className="text-[#5f6368] subheading-24">{text}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#4285F4] text-white font-medium px-6 py-3 rounded-lg hover:bg-[#1967d2] transition-colors duration-200"
            >
              {buttonText}
            </Link>
            <Link
              href={secondaryHref}
              className="inline-flex items-center gap-2 bg-white text-[#202124] font-medium px-6 py-3 rounded-lg border border-[#dadce0] hover:border-[#4285F4] hover:text-[#4285F4] transition-colors duration-200"
            >
              {secondaryText}
            </Link>
          </div>
        </div>

        {/* Right — decorative */}
        <div className="lg:w-2/5 w-full flex justify-center py-10 pr-10">
          <svg viewBox="0 0 240 240" className="w-52 h-52" fill="none">
            {/* Concentric circles */}
            <circle cx="120" cy="120" r="110" stroke="#4285F4" strokeOpacity="0.15" strokeWidth="2" fill="none"/>
            <circle cx="120" cy="120" r="80" stroke="#4285F4" strokeOpacity="0.2" strokeWidth="2" fill="none"/>
            <circle cx="120" cy="120" r="50" stroke="#4285F4" strokeOpacity="0.3" strokeWidth="2" fill="none"/>
            {/* Center */}
            <circle cx="120" cy="120" r="24" fill="#4285F4" fillOpacity="0.9"/>
            <text x="120" y="126" textAnchor="middle" fill="white" fontSize="14" fontWeight="700" fontFamily="Arial">ML</text>
            {/* Orbiting dots */}
            {[0, 60, 120, 180, 240, 300].map((deg, i) => {
              const r = 80;
              const x = 120 + r * Math.cos((deg * Math.PI) / 180);
              const y = 120 + r * Math.sin((deg * Math.PI) / 180);
              const colors = ['#4285F4', '#34A853', '#FBBC04', '#EA4335', '#4285F4', '#34A853'];
              return <circle key={i} cx={x} cy={y} r="8" fill={colors[i]} fillOpacity="0.8" />;
            })}
          </svg>
        </div>

      </div>
    </section>
  );
};

export default TalkProjectBanner;
