'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="w-full component-gap-x bg-[#f8f9fa] pt-12 pb-0">
      <div className="flex flex-col md:flex-row items-center gap-12 pb-16">

        {/* Left */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          {/* Google AI Community badge */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-white border border-[#dadce0] text-[#5f6368] text-xs font-medium px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#4285F4] inline-block"></span>
              Google AI Community Network
            </span>
          </div>

          <h1 className="heading-56 font-bold text-[#202124] leading-tight">
            Machine Learning{' '}
            <span className="text-[#4285F4]">Bangladesh</span>
          </h1>

          <p className="text-[1.1rem] text-[#5f6368] leading-relaxed">
            Igniting Passion for AI and Machine Learning Across Bangladesh
          </p>

          <p className="text-[0.95rem] text-[#5f6368] leading-relaxed">
            A dynamic community dedicated to everyone passionate about AI and ML. Founded in September 2023, we&apos;ve grown from the TensorFlow User Group North Bengal into a nationwide hub with over 1.9K members and 7+ events.
          </p>

          <div className="flex flex-wrap gap-3 mt-2">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 bg-[#4285F4] text-white font-medium px-6 py-3 rounded-lg hover:bg-[#1967d2] transition-colors duration-200"
            >
              Explore Events
            </Link>
            <Link
              href="/about-us"
              className="inline-flex items-center gap-2 bg-white text-[#202124] font-medium px-6 py-3 rounded-lg border border-[#dadce0] hover:border-[#4285F4] hover:text-[#4285F4] transition-colors duration-200"
            >
              Learn More
            </Link>
          </div>

          {/* Stats strip */}
          <div className="flex gap-8 mt-4 pt-4 border-t border-[#dadce0]">
            <div>
              <div className="text-[1.5rem] font-bold text-[#202124]">1.9K+</div>
              <div className="text-xs text-[#5f6368]">Members</div>
            </div>
            <div>
              <div className="text-[1.5rem] font-bold text-[#202124]">7+</div>
              <div className="text-xs text-[#5f6368]">Events</div>
            </div>
            <div>
              <div className="text-[1.5rem] font-bold text-[#202124]">300+</div>
              <div className="text-xs text-[#5f6368]">Olympiad Participants</div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-[520px] aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-[#e8f0fe] to-[#d2e3fc]">
            {/* Abstract ML/AI illustration placeholder */}
            <svg viewBox="0 0 520 390" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Neural network visualization */}
              <rect width="520" height="390" fill="url(#heroGrad)" />
              <defs>
                <linearGradient id="heroGrad" x1="0" y1="0" x2="520" y2="390">
                  <stop stopColor="#e8f0fe" />
                  <stop offset="1" stopColor="#c2d7f5" />
                </linearGradient>
              </defs>

              {/* Layer 1 — input nodes */}
              {[80, 140, 200, 260, 320].map((y, i) => (
                <circle key={`l1-${i}`} cx="100" cy={y} r="16" fill="#4285F4" fillOpacity="0.85" />
              ))}
              {/* Layer 2 — hidden nodes */}
              {[100, 180, 260, 340].map((y, i) => (
                <circle key={`l2-${i}`} cx="230" cy={y} r="16" fill="#34A853" fillOpacity="0.75" />
              ))}
              {/* Layer 3 — output nodes */}
              {[130, 220, 310].map((y, i) => (
                <circle key={`l3-${i}`} cx="360" cy={y} r="16" fill="#FBBC04" fillOpacity="0.85" />
              ))}

              {/* Connections L1→L2 */}
              {[80, 140, 200, 260, 320].map((y1, i) =>
                [100, 180, 260, 340].map((y2, j) => (
                  <line key={`c1-${i}-${j}`} x1="116" y1={y1} x2="214" y2={y2} stroke="#4285F4" strokeOpacity="0.18" strokeWidth="1" />
                ))
              )}
              {/* Connections L2→L3 */}
              {[100, 180, 260, 340].map((y1, i) =>
                [130, 220, 310].map((y2, j) => (
                  <line key={`c2-${i}-${j}`} x1="246" y1={y1} x2="344" y2={y2} stroke="#34A853" strokeOpacity="0.18" strokeWidth="1" />
                ))
              )}

              {/* Labels */}
              <text x="100" y="365" textAnchor="middle" fill="#5f6368" fontSize="11" fontFamily="Arial">Input</text>
              <text x="230" y="365" textAnchor="middle" fill="#5f6368" fontSize="11" fontFamily="Arial">Hidden</text>
              <text x="360" y="365" textAnchor="middle" fill="#5f6368" fontSize="11" fontFamily="Arial">Output</text>

              {/* ML text watermark */}
              <text x="460" y="60" textAnchor="end" fill="#4285F4" fillOpacity="0.12" fontSize="80" fontWeight="700" fontFamily="Arial">ML</text>
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
}
