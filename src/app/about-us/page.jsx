import { MetaDataBuilder } from '@/classes';
import AboutUsHero from '@/components/pages/about/AboutUsHero';
import Journey from '@/components/pages/about/Journey';
import MissionVision from '@/components/pages/about/MissionVision';
import Principles from '@/components/pages/about/Principles';
import TalkProjectBanner from '@/components/pages/landing/TalkProjectBanner';
import Insight from '@/components/pages/landing/Insight';

export async function generateMetadata() {
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
  const _signature = process.env.NEXT_PUBLIC_SIGN || '';
  let data = {
    title: "About — Machine Learning Bangladesh",
    description: "A Community United by AI Passion",
  };

  try {
    const res = await fetch(`${baseurl}/metadata/about`, {
      cache: "no-store",
      headers: { 'x-client-sign': _signature },
    });
    if (!res?.ok) return new MetaDataBuilder(data).build();
    data = await res.json();
    return new MetaDataBuilder(data).build();
  } catch (err) {
    return new MetaDataBuilder(data).build();
  }
}

const AboutUsPage = () => {
  return (
    <div>
      <AboutUsHero />
      <Journey />
      <MissionVision />
      <Principles />
      <TalkProjectBanner
        heading="Ready to Join the Community?"
        text="Connect with 1.9K+ AI enthusiasts across Bangladesh. All events and resources are free."
        buttonText="Become a Member"
      />
      <Insight />
    </div>
  );
};

export default AboutUsPage;
