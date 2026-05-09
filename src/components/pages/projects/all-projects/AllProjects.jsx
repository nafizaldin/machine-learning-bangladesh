'use client';

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import FlexibleButton from "@/components/utilityComponents/customBtns/FlexibleButton";


// Swiper imports for v12+
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid";

import caseStudyStore from "@/store/caseStudyStore";
import CommonSkeleton from "@/components/utilityComponents/commonSkeleton/CommonSkeleton";
import Link from "next/link";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function AllProjects() {
  const swiperRef = useRef(null);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [data, error] = await caseStudyStore.getAllProjects();
        if (error) throw new Error(error);
        setAllProjects(data || []);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="bg-[#f9fafb] component-gap-y component-gap-x">

      <div className="text-center mb-12">
        <h2 className="text-primary heading-56">Our Works</h2>
        <p className="mt-3 text-secondary subheading-24">
          A glimpse of the projects we’ve proudly crafted.
        </p>
      </div>

     
      {loading ? (
        <CommonSkeleton type="cards" count={3} />
      ) : (
        <Swiper
          modules={[Pagination, Autoplay, Grid]}
          spaceBetween={20}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet custom-bullet', 
            bulletActiveClass: 'swiper-pagination-bullet-active custom-bullet-active',
          }}
          grid={{
            rows: 2,
            fill: "row",
          }}
          breakpoints={{
            0: { slidesPerView: 1, grid: { rows: 1 } },
            768: { slidesPerView: 2, grid: { rows: 2 } },
            1024: { slidesPerView: 3, grid: { rows: 2 } }, 
          }}
          className="mySwiper pb-12"
        >
          {allProjects.map((work) => (
            <SwiperSlide key={work.id}>
              <div className="bg-white rounded-xl shadow-sm border hover:shadow-md flex flex-col h-[430px] p-4">
                <div className="relative h-72 w-full rounded-t-xl overflow-hidden">
                  <img
                    src={work?.featuredImage ? baseUrl + work.featuredImage : ""}
                    alt={`${work.title} Project`}
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col flex-1 mt-3">
                 <Link href={`/projects/${work.slug}`}> <h3 className="text-20 font-bold text-primary line-clamp-2">
                    {work.shortName}
                  </h3> </Link> 
                  <p className="text-secondary mt-1 text-14 flex-1 line-clamp-3">
                    {work.summary}
                  </p>
              <Link href={`/projects/${work.slug}`}>
                  <FlexibleButton
                    label="Explore More"
                    iconName="book"
                    variant="outline"
                    className="mt-4 w-full"
                  />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}
