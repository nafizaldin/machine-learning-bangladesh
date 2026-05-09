"use client";

import FlexibleButton from "@/components/utilityComponents/customBtns/FlexibleButton";
import blogStore from "@/store/blogStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import CommonInsightSkeleton from "@/components/utilityComponents/CommonInsightSkeleton/CommonInsightSkeleton";



const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const Insight = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); 
  const blogSnap = useSnapshot(blogStore);
  const pathname = usePathname();
  const blogsInsights = pathname.startsWith("/blogs");
  const router = useRouter();

  //  Fetch all blogs from backend via valtio store
  async function fetchAllBlogs() {
    setLoading(true);
    const [data, err] = await blogStore.getAllBlogs();

    if (err || !data?.length) {
      setLoading(false);
      return;
    }

    setBlogs(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  //  Format date
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-GB").replace(/\//g, "-");


  const bigBlogs = blogs.slice(0, 2);
  const smallBlogs = blogs.slice(2, 6);

  return (
    <section className="component-gap-y component-gap-x">
      {/* Heading Section */}
      <div className="mb-12">
        {blogsInsights ? (
          <div className="text-center">
            <span className="text-xs font-semibold text-[#4285F4] uppercase tracking-widest">Blog</span>
            <h2 className="heading-56 text-[#202124] mt-3">ML Bangladesh Blog</h2>
            <p className="subheading-24 text-[#5f6368] mt-2">
              Insights, recaps, and AI trends from our community
            </p>
          </div>
        ) : (
          <div className="flex flex-col justify-center md:flex-row md:justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <span className="text-xs font-semibold text-[#4285F4] uppercase tracking-widest">Blog</span>
              <h2 className="heading-56 text-[#202124] mt-3">ML Bangladesh Blog</h2>
              <p className="subheading-24 text-[#5f6368] mt-2">
                Insights, recaps, and AI trends from our community
              </p>
            </div>
            <div>
              <FlexibleButton
                label="All Blog Posts"
                iconName="document"
                variant="outline"
                className="text-16"
                onClick={() => router.push('/blogs')}
              />
            </div>
          </div>
        )}
      </div>

      
      {loading ? (
        <CommonInsightSkeleton bigCount={2} smallCount={4} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/*  Big Blogs */}
          {bigBlogs.map((blog) => (
            <div
              key={blog._id}
              className="rounded-2xl overflow-hidden transition-all flex flex-col"
            >
              <img
                src={`${baseUrl}${blog.featuredImage}`}
                alt={blog.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <div className="flex gap-4 text-secondary mb-2 text-sm">
                  <span>{formatDate(blog.publishedAt)}</span>
                  <span>
                    {blog.categories?.map((cat, idx) => (
                      <span key={idx} className="mr-2">
                        {cat}
                      </span>
                    ))}
                  </span>
                </div>
                <Link href={`/blogs/${blog.slug}`}>
                  <h3 className="text-20 font-semibold text-primary mt-3 mb-2 line-clamp-2">
                    {blog.title}
                  </h3>
                </Link>
                <p className="text-secondary mt-1 line-clamp-3">
                  {blog.summary}
                </p>
              </div>
            </div>
          ))}

          {/*  Small Blogs */}
          <div className="grid grid-cols-1 gap-4">
            {smallBlogs.map((blog) => (
              <div
                key={blog._id}
                className="rounded-2xl flex overflow-hidden  transition-all"
              >
                <img
                  src={`${baseUrl}${blog.featuredImage}`}
                  alt={blog.title}
                  className="w-24 h-24 object-cover"
                />
                <div className="p-3 flex flex-col gap-1">
                  <div className="flex gap-4 text-secondary text-sm">
                    <span>{formatDate(blog.publishedAt)}</span>
                    <span>
                      {blog.categories?.map((cat, idx) => (
                        <span key={idx} className="mr-2">
                          {cat}
                        </span>
                      ))}
                    </span>
                  </div>
                  <Link href={`/blogs/${blog.slug}`}>
                    <h4 className="text-18 font-semibold text-primary line-clamp-2">
                      {blog.title}
                    </h4>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Insight;
