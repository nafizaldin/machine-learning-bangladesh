"use client";

import React from "react";
import { Trash2 } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const Testimonials = ({ project, mode, options }) => {
  const { onDelete } = options || {};
  const { testimonials } = project;

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div className=" w-full flex justify-center">
      <div className="w-full mx-auto max-w-5xl">
        <Swiper
          modules={[Pagination, Autoplay]}
            autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet custom-bullet', 
            bulletActiveClass: 'swiper-pagination-bullet-active custom-bullet-active',
          }}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          className="!pb-12"
          style={{
            overflow: "visible",
          }}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide
              key={item.id || index}
              className="flex justify-center items-center"
            >
              <div
                className="relative w-full  bg-light dark:bg-[#1E1E1E] rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-300"
               
              >
                {/* Delete button */}
                {onDelete && (
                  <button
                    className="absolute top-3 right-3 p-2 rounded-full border border-gray-300 text-gray-700 hover:bg-red-500 hover:text-white dark:border-gray-600 dark:text-white dark:hover:bg-red-600 transition"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onDelete(item, index);
                    }}
                    title="Delete Testimonial"
                    type="button"
                  >
                    <Trash2 size={16} />
                  </button>
                )}

                {/* Profile Image */}
                <div className="flex justify-center mb-4">
                  <img
                    src={
                      item?.image
                        ? baseUrl + item?.image
                        : "/images/placeholder.webp"
                    }
                    alt={item?.userName || "User"}
                    className="object-cover rounded-full w-16 h-16 border border-gray-200 dark:border-gray-700"
                  />
                </div>

                {/* Comment */}
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed my-3 line-clamp-4">
                  “{item?.comment || "No comment available"}”
                </p>

                {/* User info */}
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                  {item?.userName || "Anonymous"}
                </h4>
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                  {item?.company || "No company info"}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
