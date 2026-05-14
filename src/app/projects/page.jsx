import { MetaDataBuilder } from '@/classes';
import Insight from '@/components/pages/landing/Insight';
import Process from '@/components/pages/landing/Process';
import TalkProjectBanner from '@/components/pages/landing/TalkProjectBanner';
import Testimonial from '@/components/pages/landing/Testimonial';
import AllProjects from '@/components/pages/projects/all-projects/AllProjects';

import React from 'react'

 export async function generateMetadata() {
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
    const _signature = process.env.NEXT_PUBLIC_SIGN || '';
   
    let data = {
      title: "Projects — Machine Learning Bangladesh",
      description: "ML Bangladesh community projects and initiatives.",
    };

    try {
        const res = await fetch(`${baseurl}/metadata/projects`, { 
          cache: "no-store",
          headers: {
            'x-client-sign': _signature,
          }
        });
        
        if (!res?.ok) {
          return new MetaDataBuilder(data).build();
        }
        data = await res.json();
        
        return new MetaDataBuilder(data).build()
    } catch (err) {
        
        return new MetaDataBuilder(data).build();
    }
  }

const ProjectPage = () => {
  return (
    <div>
      <AllProjects/>
      <Process/>
                <TalkProjectBanner/>
                <Insight/>
                <Testimonial/>
    </div>
  )
}

export default ProjectPage