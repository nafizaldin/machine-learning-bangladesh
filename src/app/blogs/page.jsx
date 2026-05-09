import { MetaDataBuilder } from '@/classes';
import AllBlogs from '@/components/pages/blogs/all-blogs/AllBlogs';
import Insight from '@/components/pages/landing/Insight';
import TalkProjectBanner from '@/components/pages/landing/TalkProjectBanner';
import Testimonial from '@/components/pages/landing/Testimonial';

import React from 'react'

 export async function generateMetadata() {
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
    const _signature = process.env.NEXT_PUBLIC_SIGN || '';
    
    let data = {
      title: "Orifine | Blogs",
      description: "Orifine - Your Digital Companion",
    };

    try {
        const res = await fetch(`${baseurl}/metadata/blogs`, {
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



const BlogsPage = () => {
  
  return (
    <div>
        <Insight/>
      <AllBlogs/>
      <TalkProjectBanner/>
      <Testimonial/>
    </div>
  )
}

export default BlogsPage