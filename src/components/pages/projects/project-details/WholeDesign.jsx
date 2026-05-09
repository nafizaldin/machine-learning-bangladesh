import React from 'react'

const WholeDesign = ({project}) => {

  const {featuredVideo} = project
  return (
    <div className='component-gap-y ca-whole-design' >
      <div className="center">
        <h1>Let’s Explore The Whole Design</h1>
        <video className="video" controls autoPlay loop muted playsInline>
          <source src={featuredVideo} type="video/mp4; codecs='avc1.64001E, mp4a.40.2'" />
        </video>
      </div>
    </div>
  )
}

export default WholeDesign
