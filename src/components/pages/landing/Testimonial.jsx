"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import projectStore from "@/store/projectStore";
import CommonSkeleton from "@/components/utilityComponents/commonSkeleton/CommonSkeleton";


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

export default function Testimonial() {
  const projectSnap = useSnapshot(projectStore);
  const [visible, setVisible] = useState(false);
  const [allTestimonials, setAllTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      await projectStore.getAllProjects();
      setLoading(false);
    };
    fetchProjects();
  }, []);

  useLayoutEffect(() => {
    if (projectSnap?.projects?.data?.length) {
      const testimonials = projectSnap.projects.data
        .map((prj) => prj.testimonials || [])
        .flat();
      setAllTestimonials(testimonials.slice(0, 10));
      setVisible(true);
    } else {
      setAllTestimonials([]);
      setVisible(false);
    }
  }, [projectSnap.projects.data]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const loopRef = useRef();

  const handleCarouselChange = (idx) => setCurrentIndex(idx);

  return (
    <>
 
      <section className="w-full component-gap-y component-gap-x hidden md:block">
        <div className="px-4">
          <h2 className="heading-56 mb-12 text-center">
            Your Growth Is Our Priority
          </h2>

          {loading ? (
            <CommonSkeleton type="cards" count={3} className="mt-8" />
          ) : visible && allTestimonials.length > 0 ? (
            <div className="grid grid-cols-4 gap-6 auto-rows-[1fr]">
              <Card {...allTestimonials[0]} className="col-span-1 bg-light" />
              <Card {...allTestimonials[1]} className="col-span-2" />
              <Card {...allTestimonials[2]} className="col-span-1 bg-light" />
              <div className="col-span-1"></div>
              <Card {...allTestimonials[3]} className="col-span-1 bg-light" />
              <Card {...allTestimonials[4]} className="col-span-1 bg-light" />
              <div className="col-span-1"></div>
            </div>
          ) : (
            <p className="text-center text-secondary">No testimonials found.</p>
          )}
        </div>
      </section>

      
      <section className="w-full component-gap-y component-gap-x block md:hidden">
        <h2 className="text-center text-primary heading-56 mb-6">
          Your Growth Is Our Priority
        </h2>

        {loading ? (
          <div className="px-4">
            <CommonSkeleton type="cards" count={1} />
          </div>
        ) : visible && allTestimonials.length > 0 ? (
          <Swiper
            modules={[Pagination, Autoplay]}
            slidesPerView={1}
            spaceBetween={20}
            pagination={{
              clickable: true,
              bulletClass: "custom-bullet swiper-pagination-bullet",
              bulletActiveClass:
                "custom-bullet-active swiper-pagination-bullet-active",
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            className="mySwiper px-4"
          >
            {allTestimonials.map((card, i) => (
              <SwiperSlide key={i}>
                <Card {...card} className="bg-light shadow-md" />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-secondary px-4">
            No testimonials found.
          </p>
        )}
      </section>
    </>
  );
}

function Card({ image, comment, userName, company, className = "" }) {
  return (
    <div
      className={`rounded-2xl p-6 flex flex-col items-center text-center h-full ${className}`}
    >
      <div className="relative w-16 h-16">
        <img
          src={image ? `${baseUrl}${image}` : "/images/placeholder.webp"}
          alt={userName || "User"}
          className="object-cover rounded-full w-16 h-16 border border-gray-200 dark:border-gray-700"
        />
      </div>
      <p className="text-primary text-14 my-4 leading-relaxed line-clamp-4">
        “{comment || "No comment available"}”
      </p>
      <h4 className="font-semibold text-14">{userName || "Anonymous"}</h4>
      <p className="text-secondary text-12">{company || "No company info"}</p>
    </div>
  );
}
