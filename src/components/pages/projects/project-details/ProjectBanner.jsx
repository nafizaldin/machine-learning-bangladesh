import Image from 'next/image'
import React from 'react'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const ProjectBanner = ({project}) => {

  const {title,shortName,type,featuredImage} = project

  return (
    <section className='component-gap-y ca-project-details'>

       <div className="project">
        <h1>Projects</h1>
        <span className="arrow">{'>'}</span>
        <span className="project-name">{shortName}</span>
      </div>
      <div className='title '>
        <h1 className='mb-3'>
          {title} 
        </h1>
        <p className='text-secondary'>{type}</p>
      </div>
   
        <div>
            <img src={`${baseUrl}${featuredImage}`} alt='project banner'
            className='banner-image'
            width={500} height={500}/>
        </div>
    </section>
  )
}

export default ProjectBanner
