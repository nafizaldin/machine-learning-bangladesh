import { MetaDataBuilder } from '@/classes';
import Hero from '@/components/pages/landing/Hero';
import WhoWeAre from '@/components/pages/landing/WhoWeAre';
import Services from '@/components/pages/landing/Services';
import OurWorks from '@/components/pages/landing/OurWorks';
import Process from '@/components/pages/landing/Process';
import TalkProjectBanner from '@/components/pages/landing/TalkProjectBanner';
import Insight from '@/components/pages/landing/Insight';

export async function generateMetadata() {
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
  let data = {
    title: "Machine Learning Bangladesh",
    description: "Igniting Passion for AI and Machine Learning Across Bangladesh",
  };

  try {
    const res = await fetch(`${baseurl}/metadata/landing`, { cache: "no-store" });
    if (!res?.ok) return new MetaDataBuilder(data).build();
    data = await res.json();
    return new MetaDataBuilder(data).build();
  } catch (err) {
    return new MetaDataBuilder(data).build();
  }
}

const page = () => {
  return (
    <div>
      <Hero />
      <WhoWeAre />
      <Services />
      <OurWorks />
      <Process />
      <TalkProjectBanner />
      <Insight />
    </div>
  );
};

export default page;
