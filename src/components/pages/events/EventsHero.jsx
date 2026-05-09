import Link from 'next/link';

export default function EventsHero() {
  return (
    <section className="w-full component-gap-x bg-[#f8f9fa] pt-12 pb-16">
      <div className="max-w-[760px] mx-auto flex flex-col text-center gap-6">
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-1.5 bg-white border border-[#dadce0] text-[#5f6368] text-xs font-medium px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#4285F4] inline-block"></span>
            ML Bangladesh Events
          </span>
        </div>

        <h1 className="heading-56 font-bold text-[#202124]">
          Upcoming &amp; Past <span className="text-[#4285F4]">Events</span>
        </h1>

        <p className="text-[1rem] text-[#5f6368] leading-relaxed">
          Join the Action in AI/ML
        </p>

        <p className="text-[0.95rem] text-[#5f6368] leading-relaxed max-w-xl mx-auto">
          Discover our lineup of events designed to inspire and educate. From virtual workshops to competitive Olympiads, there&apos;s something for every AI enthusiast.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-2">
          {['Competition', 'Workshop', 'Seminar', 'Study Group'].map((type) => (
            <span key={type} className="bg-white border border-[#dadce0] text-[#5f6368] text-xs font-medium px-3 py-1.5 rounded-full">
              {type}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
