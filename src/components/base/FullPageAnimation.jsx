'use client';
import React, { useEffect } from 'react'
import Image from 'next/image';
import { gsap } from 'gsap';

const FullPageAnimation = () => {

  useEffect(() => {

    // gsap.to("#blob", {duration: 6, repeat: -1, yoyo:true, morphSVG:finalPath})
  }, [])

  return (
    <div className="full-page-animation">
        <div className="anim-1">
            <Image src="/animation.svg"  alt="svg animation" width={500} height={500} />
        </div>
    </div>
  )
}

export default FullPageAnimation