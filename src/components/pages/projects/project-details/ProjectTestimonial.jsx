// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { LearnMoreBtn } from '@/components/utilityComponents';
// import { LeftSvgIcon, RightSvgIcon } from '@/components/base/svgs/SvgIcon';
// import Image from 'next/image';

// import { SvgIcon1, SvgIcon2 } from '@/components/base/svgs/SvgBlobs';
// import { Box, Carousel } from '../../landing/ProjectShowcase';



// const ProjectTestimonial = ({project}) => {


//   const { testimonials } = project;

// const [currentIndex, setCurrentIndex] = useState(0);
// const loopRef = useRef();


// const handleCarouselChange = (idx) => {
//   setCurrentIndex(idx);
// };


// return (
//     <div className="container ca-testimonial">
//             <div className="top">
//                     <h3 className="title">Hear what our clients have to say!</h3>
//             </div>
//             <div className="body">
//                     <Carousel
//                         showControls={true}
//                         config={{ speed: 1, snap: 1, draggable: false,}}
//                         // autoplay={true}
//                         ref={loopRef}
//                         onChange={handleCarouselChange}
//                     >
//                             {
//                                     testimonials.map((project) => (
//                                             <Box key={project.id + 'prj'} className="box00" onClick={(e) => console.log(`Clicked on ${project.title}`)}>
//                                                     <SvgIcon1 className="svg-icon1" />
//                                                    <Image
//   src={project?.image || "/default.jpg"}
//   alt={`${project?.shortName} Project`}
//   width={500}
//   height={300}
// />

//                                                     <div className="right">
//                                                             <h5>
//                                                                     {project?.comment}
//                                                             </h5>
//                                                             <h6>
//                                                                     {project?.userName} 
//                                                             </h6>
//                                                             <p>
//                                                                     {project?.userOccupation}
//                                                             </p>
//                                                             <p>
//                                                                     {project?.company}
//                                                             </p>
//                                                     </div>
//                                             </Box> 
//                                     ))
//                             }
//                     </Carousel>
//                     <div className="carousel-dots">
//   {testimonials.map((_, idx) => (
//     <button
//       className={`dot${idx === currentIndex ? ' active' : ''}`}
//       onClick={() =>
//         loopRef.current?.toIndex(idx, { duration: 0.5, ease: 'power1.inOut' })
//       }
//       aria-label={`Go to slide ${idx + 1}`}
//       type="button"
//       tabIndex={0}
//       key={idx}
//     />
//   ))}
// </div>

//             </div>
//     </div>
// )
// }


// export default ProjectTestimonial;