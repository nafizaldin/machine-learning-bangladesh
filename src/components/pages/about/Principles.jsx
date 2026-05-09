const principles = [
  {
    title: 'Open Learning',
    description: 'All workshops, resources, and events are free and open to everyone regardless of skill level.',
    color: '#4285F4',
    bg: '#e8f0fe',
  },
  {
    title: 'Ethical AI',
    description: 'We promote responsible AI development grounded in Google\'s 7 AI principles.',
    color: '#34A853',
    bg: '#e6f4ea',
  },
  {
    title: 'Collaboration',
    description: 'Building together through study groups, mentorship, and knowledge sharing.',
    color: '#FBBC04',
    bg: '#fef9e7',
  },
  {
    title: 'Innovation',
    description: 'Pushing boundaries with real-world challenges on platforms like Kaggle.',
    color: '#EA4335',
    bg: '#fce8e6',
  },
];

export default function Principles() {
  return (
    <section className="w-full component-gap-x component-gap-y text-center bg-[#f8f9fa]">
      <span className="text-xs font-semibold text-[#4285F4] uppercase tracking-widest">Values</span>
      <h2 className="heading-56 text-[#202124] mt-3 mb-14 max-w-[640px] mx-auto">
        The Principles We Live By
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {principles.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-7 flex flex-col items-center gap-4 border border-[#dadce0] hover:shadow-md transition-shadow duration-300"
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold"
              style={{ backgroundColor: item.bg, color: item.color }}
            >
              {index + 1}
            </div>
            <h3 className="text-[1rem] font-semibold text-[#202124]">{item.title}</h3>
            <p className="text-[#5f6368] text-sm leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
