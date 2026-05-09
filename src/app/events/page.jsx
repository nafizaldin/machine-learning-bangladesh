import EventsHero from '@/components/pages/events/EventsHero';
import EventsList from '@/components/pages/events/EventsList';
import TalkProjectBanner from '@/components/pages/landing/TalkProjectBanner';

export const metadata = {
  title: "Events — Machine Learning Bangladesh",
  description: "Upcoming and past AI/ML events, workshops, and competitions organized by ML Bangladesh.",
};

const EventsPage = () => {
  return (
    <div>
      <EventsHero />
      <EventsList />
      <TalkProjectBanner
        heading="Interested in Hosting an Event?"
        text="We welcome proposals for workshops, study groups, and ML challenges. Reach out and let's build the community together."
        buttonText="Get In Touch"
        secondaryText="View Resources"
        secondaryHref="/resources"
      />
    </div>
  );
};

export default EventsPage;
