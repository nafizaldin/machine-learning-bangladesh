'use client';

import Link from 'next/link';

export default function AboutUsHero() {
  return (
    <section className="w-full component-gap-x bg-[#f8f9fa] pt-12 pb-16">
      <div className="max-w-[800px] mx-auto flex flex-col text-center gap-6">
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-1.5 bg-white border border-[#dadce0] text-[#5f6368] text-xs font-medium px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#4285F4] inline-block"></span>
            Google AI Community Network
          </span>
        </div>

        <h1 className="heading-56 font-bold text-[#202124]">
          About Machine Learning{' '}
          <span className="text-[#4285F4]">Bangladesh</span>
        </h1>

        <p className="text-[1.1rem] text-[#5f6368] leading-relaxed">
          A Community United by AI Passion
        </p>

        <p className="text-[0.95rem] text-[#5f6368] leading-relaxed max-w-2xl mx-auto">
          Founded in September 2023 as the TensorFlow User Group North Bengal, we evolved into Machine Learning Bangladesh to serve the entire nation. Today we are a proud member of the Google AI Community Network with 1.9K+ members and counting.
        </p>

        <div className="flex justify-center gap-3 mt-2">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 bg-[#4285F4] text-white font-medium px-6 py-3 rounded-lg hover:bg-[#1967d2] transition-colors duration-200"
          >
            Explore Events
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#202124] font-medium px-6 py-3 rounded-lg border border-[#dadce0] hover:border-[#4285F4] hover:text-[#4285F4] transition-colors duration-200"
          >
            Join Community
          </Link>
        </div>
      </div>
    </section>
  );
}
