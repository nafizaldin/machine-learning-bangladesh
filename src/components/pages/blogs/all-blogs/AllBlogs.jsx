"use client";

import React, { useEffect, useState } from "react";
import FlexibleButton from "@/components/utilityComponents/customBtns/FlexibleButton";
import blogStore from "@/store/blogStore";
import Link from "next/link";
import { useSnapshot } from "valtio";
import { toast } from "react-toastify";

import CommonSkeleton from "@/components/utilityComponents/commonSkeleton/CommonSkeleton";


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function AllBlogs() {
  const [selectedCategory, setSelectedCategory] = useState("All Blogs");
  const [allBlogs, setAllBlogs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [loading, setLoading] = useState(true);
  const blogSnap = useSnapshot(blogStore);

  async function fetchAllBlogs() {
    setLoading(true);
    const [blogs, err] = await blogStore.getAllBlogs();

    if (err || !blogs?.length) {
    
      setAllBlogs([]);
      setLoading(false);
      return;
    }

    setAllBlogs(blogs);
    setLoading(false);
  }

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const visibleBlogs = allBlogs.slice(0, visibleCount);

  return (
    <section className="component-gap-y component-gap-x">
      {/* Heading Section */}
      <div className="mb-12">
        <h2 className="heading-56 text-primary">Related Blogs</h2>
      </div>

      {/* Grid Section */}
      {loading ? (
        
        <CommonSkeleton count={3} />
      ) : allBlogs.length === 0 ? (
 
  <div className="w-full py-20 flex flex-col items-center justify-center text-center">
   
    <h3 className="text-2xl font-semibold text-gray-700 mb-2">
      No Blogs Available
    </h3>
    <p className="text-gray-500 max-w-sm mb-6">
      There are currently no blogs added.
    </p>

  </div>
) :  (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {visibleBlogs.map((blog) => (
            <div
              key={blog._id || blog.id}
              className="p-4 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              <img
                src={`${baseUrl}${blog.featuredImage}`}
                alt={blog.title}
                className="w-full h-60 object-cover rounded-xl"
              />
              <div className="flex flex-col flex-grow">
                <div className="flex gap-4 text-secondary mt-3.5 mb-3 text-sm">
                  <span>
                    {blog?.publishedAt
                      ? new Date(blog.publishedAt)
                          .toLocaleDateString("en-GB")
                          .replace(/\//g, "-")
                      : "No date"}
                  </span>
                  <span>
                    {blog?.categories?.map((cat, idx) => (
                      <span className="mr-2" key={idx}>
                        {cat}
                      </span>
                    ))}
                  </span>
                </div>

                {/* Title clamp */}
                <Link href={`/blogs/${blog.slug}`}>
                  <h3 className="text-20 font-semibold text-primary mt-2 mb-2 line-clamp-2">
                    {blog.title}
                  </h3>
                </Link>

                {/* Subtitle clamp */}
                <p className="text-secondary flex-grow line-clamp-3">
                  {blog.summary}
                </p>

                <Link href={`/blogs/${blog.slug}`}>
                  <FlexibleButton
                    label="Explore More"
                    iconName="book"
                    variant="outline"
                    className="mt-4 w-full"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More Button */}
      {visibleCount < allBlogs.length && !loading && (
        <div className="flex justify-center mt-12">
          <FlexibleButton
            label="Check All Blogs"
            iconName="document"
            variant="outline"
            className="text-16"
            onClick={handleLoadMore}
          />
        </div>
      )}
    </section>
  );
}
