'use client';

import Link from 'next/link';

export default function WhoWeAre() {
  return (
    <section className="w-full component-gap-y component-gap-x bg-white">
      <div className="text-center mb-12">
        <span className="text-xs font-semibold text-[#4285F4] uppercase tracking-widest">About Us</span>
        <h2 className="heading-56 font-bold text-[#202124] mt-3 mb-4">
          Who We Are
        </h2>
        <p className="text-[#5f6368] subheading-24 max-w-2xl mx-auto">
          A nationwide community united by the passion for AI and Machine Learning
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-12">

        {/* Left — image / illustration */}
        <div className="w-full md:w-2/5">
          <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#e8f0fe] to-[#d2e3fc] aspect-square flex items-center justify-center shadow-sm">
            <svg viewBox="0 0 300 300" className="w-4/5 h-4/5" fill="none">
              <circle cx="150" cy="150" r="100" fill="#4285F4" fillOpacity="0.1" />
              <circle cx="150" cy="150" r="70" fill="#4285F4" fillOpacity="0.15" />
              <circle cx="150" cy="150" r="40" fill="#4285F4" fillOpacity="0.25" />
              {/* People dots */}
              {[
                [150, 50], [220, 90], [240, 170], [200, 240],
                [100, 240], [60, 170], [80, 90]
              ].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="10" fill="#4285F4" fillOpacity="0.6" />
              ))}
              {/* Lines connecting */}
              {[
                [150,50,220,90], [220,90,240,170], [240,170,200,240],
                [200,240,100,240], [100,240,60,170], [60,170,80,90], [80,90,150,50]
              ].map(([x1,y1,x2,y2], i) => (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#4285F4" strokeOpacity="0.3" strokeWidth="1.5" />
              ))}
              <text x="150" y="158" textAnchor="middle" fill="#4285F4" fontSize="22" fontWeight="700" fontFamily="Arial">ML BD</text>
            </svg>
          </div>
        </div>

        {/* Right — text */}
        <div className="w-full md:w-3/5 flex flex-col gap-6">
          <p className="subheading-24 text-[#5f6368] leading-relaxed text-justify">
            Machine Learning Bangladesh is a dynamic community dedicated to everyone passionate about AI and ML. Founded in September 2023, we&apos;ve grown from our roots as the TensorFlow User Group North Bengal into a nationwide hub, now part of the Google AI Community Network.
          </p>
          <p className="subheading-24 text-[#5f6368] leading-relaxed text-justify">
            With over 1.9K members and 7+ events under our belt, we&apos;re building a supportive space for learning, innovation, and collaboration. We organize workshops, seminars, competitions, and study groups to make AI/ML accessible and exciting.
          </p>

          <div className="flex flex-wrap gap-2 mt-2">
            {['TensorFlow', 'Kaggle', 'Google AI', 'Deep Learning', 'Ethics in AI'].map((tag) => (
              <span key={tag} className="bg-[#e8f0fe] text-[#1967d2] text-xs font-medium px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <Link
            href="/about-us"
            className="self-start inline-flex items-center gap-2 bg-white text-[#202124] font-medium px-6 py-3 rounded-lg border border-[#dadce0] hover:border-[#4285F4] hover:text-[#4285F4] transition-colors duration-200 mt-2"
          >
            Learn More About Us
          </Link>
        </div>
      </div>
    </section>
  );
}
