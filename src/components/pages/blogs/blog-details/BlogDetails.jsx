"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import FlexibleButton from "@/components/utilityComponents/customBtns/FlexibleButton";
import blogStore from "@/store/blogStore";
import Link from "next/link";
import { toast } from "react-toastify";
import CommonSkeleton from "@/components/utilityComponents/commonSkeleton/CommonSkeleton";
import { addBaseUrl } from "@/utils/cleanHtml";


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

export default function BlogDetails({ data }) {
  const params = useParams();
  const idOrSlug = params?.blogId || params?.id || params?.slug || ""; 
  const [blog, setBlog] = useState(data || null); 
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch blog + related when client-side
  useEffect(() => {
    if (!idOrSlug) return;

    const fetchBlog = async () => {
      try {
        setLoading(true);
        const [payload, err] = await blogStore.getBlogWithRelated(idOrSlug);
        if (err) throw new Error(err);

        const fetched = payload?.data || null;
        const related = payload?.related || [];

        if (fetched) setBlog(fetched);
        if (Array.isArray(related)) setRelatedBlogs(related);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
        toast.error("Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [idOrSlug]);

  const makePreviewUrl = (p) => {
    if (!p) return null;
    if (/^https?:\/\//i.test(p)) return p;
    return `${baseUrl}${p}`;
  };

  return (
    <section className="ca-blog-details component-gap-y component-gap-x">

      {/* Banner */}
      {loading ? (
        <CommonSkeleton type="banner" className="mb-6" />
      ) : blog?.featuredImage && (
        <img
          src={makePreviewUrl(blog.featuredImage)}
          alt={blog.title || "Blog banner"}
          width={500}
          height={250}
          className="banner-image mb-6"
        />
      )
      }

      {/* Blog Content */}
      {loading ? (
        <CommonSkeleton type="content" className="mb-8" />
      ) : (
        <div className="blog-content">
          <h2>{blog?.title || ""}</h2>
          {blog?.content && (
            <div className="section" dangerouslySetInnerHTML={{ __html:  addBaseUrl(blog.content, baseUrl)}} />
          )}
          {blog?.tags?.length > 0 && (
            <div className="tags mt-3">
              <strong>Tags:</strong> {blog.tags.join(", ")}
            </div>
          )}
        </div>
      )}

      {/* Related Blogs */}
      {loading ? (
        <CommonSkeleton type="cards" count={3} />
      ) : relatedBlogs.length > 0 ? (
        <>
          <h1 className="related-blogs mt-12 mb-6">Related Blogs</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {relatedBlogs.slice(0, 3).map((blog) => (
              <div
                key={blog._id}
                className="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                <img
                  src={`${baseUrl}${blog.featuredImage}`}
                  alt={blog.title}
                  className="w-full h-60 object-cover"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex gap-5 text-secondary mb-2 text-sm">
                    <span>
                      {blog?.createdAt
                        ? new Date(blog.createdAt).toLocaleDateString("en-GB").replace(/\//g, "-")
                        : "No date"}
                    </span>
                    <span>
                      {blog?.categories.map((cat, idx) => <span className="mr-2" key={idx}>{cat}</span>)}
                    </span>
                  </div>
                  <Link href={`/blogs/${blog.slug}`}>
                    <h3 className="text-20 font-semibold text-primary mt-2 mb-2 line-clamp-2">
                      {blog.title}
                    </h3>
                  </Link>
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
        </>
      ) : (
        <div className="text-center text-gray-500 text-lg font-medium mt-10">
          No related blogs found.
        </div>
      )}
    </section>
  );
}
