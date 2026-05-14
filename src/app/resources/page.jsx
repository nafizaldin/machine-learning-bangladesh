
import TalkProjectBanner from '@/components/pages/landing/TalkProjectBanner';
import Testimonial from '@/components/pages/landing/Testimonial';
import Resources from '@/components/pages/resources/Resources';

import React from 'react'

export const metadata = {
  title: 'Resources — Machine Learning Bangladesh',
  description: 'Curated ML and AI learning materials, guides, datasets, and tools for the Bangladesh AI community.',
};
const resourcesPage = () => {
  return (
    <div>
      <Resources/>
        <TalkProjectBanner/>
      <Testimonial/>
    </div>
  )
}

export default resourcesPage