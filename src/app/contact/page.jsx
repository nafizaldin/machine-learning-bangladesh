import { MetaDataBuilder } from '@/classes';
import Contact from '@/components/pages/contact/Contact';

import React from 'react'

 export async function generateMetadata() {
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
    const _signature = process.env.NEXT_PUBLIC_SIGN || '';

    let data = {
      title: "Machine Learning Bangladesh | Contact",
      description: "Get in touch with us. Have questions or want to learn more about our machine learning initiatives in Bangladesh?",
    };

    try {
        const res = await fetch(`${baseurl}/metadata/contact-us`, {
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

const ContactPage = () => {
  return (
    <div>
      <Contact/>
    </div>
  )
}

export default ContactPage