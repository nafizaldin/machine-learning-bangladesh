"use client"

import React, { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import projectStore from '@/store/projectStore';

import ProjectBanner from './ProjectBanner';
import Overview from './Overview';
import WholeDesign from './WholeDesign';
import Achievements from './Achievements';
import ProjectTestimonial from './ProjectTestimonial';
import { OtherProjects } from './OtherProjects';
import CommonSkeleton from '@/components/utilityComponents/commonSkeleton/CommonSkeleton';


const ProjectDetails = ({ projectSlug }) => {
  const snap = useSnapshot(projectStore);
  const [project, setProject] = useState(null);

  useEffect(() => {
    console.log('Fetching project for slug:', projectSlug);

    projectStore.getSingleProject(projectSlug).then(([data, err]) => {
      if (err) {
        console.error('Load project error:', err);
      } else {
        console.log('Project loaded:', data);
        setProject(data);
      }
    });
  }, [projectSlug]);

  // Error handling
  if (snap.projects.error) return <p>{snap.projects.error}</p>;

  // Loading state
  if (!project) {
    return <CommonSkeleton type="content" className="my-12 component-gap-x" />;
  }

  return (
    <section className='component-gap-x'>
      <ProjectBanner project={project} />
      <Overview project={project} />
      {/* <WholeDesign project={project} /> */}
      <Achievements project={project} />
      {/* <ProjectTestimonial project={project} /> */}
      {/* <OtherProjects project={project} /> */}
    </section>
  );
};

export default ProjectDetails;
