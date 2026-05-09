"use client";
import { LearnMoreBtn } from "@/components/utilityComponents";
import CommonSkeleton from "@/components/utilityComponents/commonSkeleton/CommonSkeleton";
import FlexibleButton from "@/components/utilityComponents/customBtns/FlexibleButton";
import DeleteDialog from "@/components/utilityComponents/DeleteDialog/DeleteDialog";
import TablePagination from "@/components/utilityComponents/table/tablePagination/TablePagination";
import blogStore from "@/store/blogStore";
import { Trash2, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSnapshot } from "valtio";


export default function BlogList() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
   const [selectedCategory, setSelectedCategory] = useState("All Blogs");
  const [allBlogs, setAllBlogs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [loading, setLoading] = useState(true);
  const blogSnap = useSnapshot(blogStore);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
const [selectedBlogId, setSelectedBlogId] = useState(null);


  async function fetchAllBlogs() {
    setLoading(true);
    const [blogs, err] = await blogStore.getAllAdminBlogs();
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
    setVisibleCount((prev) => prev + 6);
  };

  const visibleBlogs = allBlogs.slice(0, visibleCount);

 async function handleDeleteConfirm() {
    if (!selectedBlogId) return;

    const [data, error] = await blogStore.deleteBlog(selectedBlogId);

    if (error) {
      toast.error(error);
    } else {
      toast.success("Blog deleted successfully!");
      setAllBlogs(prev => prev.filter(b => (b._id || b.id) !== selectedBlogId));
    }

    setOpenDeleteModal(false);
    setSelectedBlogId(null);
  }
  return (
    
<>
 <DeleteDialog
        open={openDeleteModal}
        title="Delete Blog?"
        description="Are you sure you want to delete this blog? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setOpenDeleteModal(false)}
      />
   <section className="component-gap-y component-gap-x">
        {/* Heading Section */}
        <div className="mb-12">
          <h2 className="heading-56 text-primary">All Blogs</h2>
        </div>
  
        {/* Grid Section */}
        {loading ? (
          
          <CommonSkeleton count={3} />
        ) : allBlogs.length === 0 ? (
  // EMPTY STATE UI
  <div className="w-full py-20 flex flex-col items-center justify-center text-center">
    <div className="text-gray-400 mb-4">
      <Trash2 className="w-12 h-12 opacity-40" />
    </div>
    <h3 className="text-2xl font-semibold text-gray-700 mb-2">
      No Blogs Available
    </h3>
    <p className="text-gray-500 max-w-sm mb-6">
      There are currently no blogs added. You can create a new blog to get started.
    </p>
    <Link href="/admin/blogs/create-new-blog">
      <FlexibleButton
        label="Create New Blog"
        variant="outline"
        className="px-6"
      />
    </Link>
  </div>
): (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {visibleBlogs.map((blog) => (
              <div
                key={blog._id || blog.id}
                className="p-4 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                   <div className="relative w-full h-56">
  <img
    src={baseUrl + blog?.featuredImage}
    alt={blog?.title}
    className="w-full h-full object-cover"
  />

  {blog.status === "draft" && (
    <span className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
      Not Published
    </span>
  )}
</div>
                <div className="flex flex-col flex-grow">
                  <div className="flex gap-10 text-secondary mt-3.5 mb-3 text-sm">
                    <span>
                      {blog?.publishedAt
                        ? new Date(blog.publishedAt)
                            .toLocaleDateString("en-GB")
                            .replace(/\//g, "-")
                        : " Draft"}
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
                  <div className="flex items-start justify-between gap-2">
  <Link
    href={`/admin/blogs/update/${blog._id || blog.id}`}
    className="title flex-1"
  >
    <h3>{blog.title}</h3>
  </Link>

  <div className="flex items-center gap-0.5 shrink-0">
    <Link
      href={`/admin/blogs/update/${blog._id || blog.id}`}
      className="text-gray-500 hover:text-gray-700 transition p-1 cursor-pointer"
      title="Edit Blog"
    >
      <Pencil size={18} />
    </Link>
    <button
      onClick={() => {
        setSelectedBlogId(blog._id || blog.id);
        setOpenDeleteModal(true);
      }}
      className="text-red-500 hover:text-red-600 transition p-1 cursor-pointer"
      title="Delete Blog"
    >
      <Trash2 size={18} />
    </button>
  </div>
</div>

  
                  {/* Subtitle clamp */}
                  <p className="text-secondary flex-grow line-clamp-3">
                    {blog.summary}
                  </p>
  
                  <Link href={`/blogs/${blog.slug}`} target="_blank">
                    <FlexibleButton
                      label="Preview"
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
</>
  );
}
