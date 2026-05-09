

import { MetaDataBuilder } from '@/classes'


import ProjectDetails from '@/components/pages/projects/project-details/ProjectDetails'

import projectStore from '@/store/projectStore'

import React from 'react'

export async function generateMetadata({ params }) {
  const { id } = params;
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
  const _signature = process.env.NEXT_PUBLIC_SIGN || '';
  const defaultMeta = {
    title: "Orifine | Single Project",
    description: "Orifine | Single Project",
  };

  try {
    const res = await fetch(`${baseurl}/metadata/projects/${id}`, {
      cache: "no-store",
      headers: {
        'x-client-sign': _signature,
      }
    });

    if (!res.ok) throw new Error('Metadata fetch failed');

    const { success, data: metaFromApi } = await res.json();
    if (!success) throw new Error('API returned failure');

    // feed *only* the raw metadata object into your builder
    return new MetaDataBuilder(metaFromApi, {
      openGraph: true,
      twitter: true,
    }).build();
    
  } catch (err) {
    return new MetaDataBuilder(defaultMeta).build();
  }
}

const ProjectDetailsPage = async ({params}) => {
 

  
  const { slug } = params;

  // const [res, err] = await projectStore.loadProjectFromJson(id);

  // if (err) {
  //   return <p>Project not found.</p>;
  // }

  // if (!res) {
  //   return <p>Failed to load project.</p>;
  // }

  // console.log({res, err});


  

  return (
    <div>
     <ProjectDetails projectSlug={slug} />
    </div>
  )
}

export default ProjectDetailsPage