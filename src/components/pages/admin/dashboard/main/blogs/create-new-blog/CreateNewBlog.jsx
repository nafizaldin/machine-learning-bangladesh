"use client";

import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { TiptapEditor } from "@/components/utilityComponents";
import TagsInput from "@/components/utilityComponents/tags/Tags";
import ImageUpload from "@/components/utilityComponents/imageUpload/ImgaeUpload";
import { ClockPlusSvg } from "@/components/base/svgs/SvgIcon";
import $axios from "@/_api/axios";
import blogStore from "@/store/blogStore";
import { useRouter } from "next/navigation";
import FlexibleButton from "@/components/utilityComponents/customBtns/FlexibleButton";
import DraftModal from "@/components/utilityComponents/DraftModal/DraftModal";
import { stripBaseUrl } from "@/utils/cleanHtml";

const allCategories = [
  { name: "Technology", value: "tech" },
  { name: "Lifestyle", value: "lifestyle" },
  { name: "Education", value: "education" },
  { name: "Web Design", value: "web-design" },
  { name: "Web Development", value: "web-development" },
  { name: "Mobile App Design", value: "mobile-app-design" },
  { name: "Mobile App Development", value: "mobile-app-development" },
  { name: "Products & SaaS", value: "products-saas" },
  { name: "Illustrations", value: "illustrations" },
  { name: "Graphic Design", value: "graphic-design" },
  { name: "Digital Marketing", value: "digital-marketing" },
  { name: "Healthcare", value: "healthcare" },
  { name: "Finance", value: "finance" },
  { name: "Travel", value: "travel" },
];

export default function CreateNewBlog() {
  const router = useRouter();

  const [blogTitle, setBlogTitle] = useState("");
  const [blogSummary, setBlogSummary] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState({});
    const [draftModalOpen, setDraftModalOpen] = useState(false);

  const onDrop = useCallback(async (files) => {
    if (files.length === 0) return;
    const file = files[0];

    if (file.size > 4 * 1024 * 1024) {
      toast.error("Image size must not exceed 4MB");
      setErrors((prev) => ({ ...prev, mainImage: "Image size must not exceed 4MB" }));
      return;
    }

    setErrors((prev) => ({ ...prev, mainImage: null }));

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setMainImagePreview(reader.result);

    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await $axios.post("/v1/media/image", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.success) setMainImage(res.data.path);
      else throw new Error("Upload failed");
    } catch (err) {
      console.error("Upload error:", err);
      setMainImagePreview(null);
      setMainImage(null);
      toast.error("Failed to upload image");
      setErrors((prev) => ({ ...prev, mainImage: "Failed to upload image" }));
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!blogTitle) newErrors.blogTitle = "Blog Title is required";
    else if (blogTitle.length < 3) newErrors.blogTitle = "Blog Title must be at least 3 characters";

    if (!blogSummary) newErrors.blogSummary = "Blog Summary is required";
    else if (blogSummary.length < 10) newErrors.blogSummary = "Blog Summary must be at least 10 characters";
    else if (blogSummary.length > 200) newErrors.blogSummary = "Blog Summary must not exceed 200 characters";

    if (!metaTitle) newErrors.metaTitle = "Blog Meta Title is required";
    else if (metaTitle.length < 3) newErrors.metaTitle = "Blog Meta Title must be at least 3 characters";
    else if (metaTitle.length > 60) newErrors.metaTitle = "Blog Meta Title must not exceed 60 characters";

    if (!metaDescription) newErrors.metaDescription = "Blog Meta Description is required";
    else if (metaDescription.length < 10) newErrors.metaDescription = "Blog Meta Description must be at least 10 characters";
    else if (metaDescription.length > 160) newErrors.metaDescription = "Blog Meta Description must not exceed 160 characters";

    if (!mainImage) newErrors.mainImage = "Main Image is required";
    if (!description) newErrors.description = "Blog content is required";

    return newErrors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
 const cleanDescription = stripBaseUrl(description);
    setErrors({});

    const obj = {
      title: blogTitle,
      author: { name: "ML Bangladesh", bio: "", image: "" },
      metadata: { title: metaTitle, description: metaDescription },
      content: cleanDescription,
      summary: blogSummary,
      featuredImage: mainImage,
      tags: tags,
      categories: [category],
      status: "published",
    };

    const [data, error] = await blogStore.createBlog(obj);

    if (data) {
      toast.success("Blog created successfully");
      setBlogTitle(""); setBlogSummary(""); setMetaTitle(""); setMetaDescription("");
      setMainImage(null); setMainImagePreview(null); setDescription(""); setTags([]); setCategory(""); setErrors({});
      blogStore.reset();
      router.push("/admin/blogs/blog-list");
    } else toast.error(error);
  };

    const handleSaveDraft = async (note) => {
    setDraftModalOpen(false);
   const cleanDescription = stripBaseUrl(description );
    const obj = {
      title: blogTitle,
      author: { name: "ML Bangladesh", bio: "", image: "" },
      metadata: { title: metaTitle, description: metaDescription },
      content: cleanDescription,
      summary: blogSummary,
      featuredImage: mainImage,
      tags,
      categories: [category],
      status: "draft",
      // draftDescription: note || "",
    };
  
    const [data, error] = await blogStore.createBlog(obj);
  
    if (data) {
      toast.success("Draft saved!");
      blogStore.reset();
      router.push("/admin/blogs/blog-list");
    } else {
      toast.error(error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm text-gray-900">
      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        {/* Blog Title */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Blog Title*</label>
          <input
            type="text"
            placeholder="Enter blog title here"
            value={blogTitle}
            onChange={(e) => { setBlogTitle(e.target.value); setErrors(prev => ({ ...prev, blogTitle: undefined })); }}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.blogTitle && <p className="text-red-500 text-sm">{errors.blogTitle}</p>}
        </div>

        {/* Main Image */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Add Image* (7:3, 700×300 px)</label>
          <ImageUpload
            label="Drop main image"
            height="h-48"
            onDrop={onDrop}
            preview={mainImagePreview}
            rounded="rounded-md"
            aspectRatio="7:3"
            recommendedDimensions="700×300 px"
          />
          {errors.mainImage && <p className="text-red-500 text-sm">{errors.mainImage}</p>}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Write Blog*</label>
          <TiptapEditor
            value={description}
            mode="write"
            onContentChange={({ html }) => { setDescription(html === "<p></p>" ? "" : html); setErrors(prev => ({ ...prev, description: undefined })); }}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        {/* Categories & Tags */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col gap-1 flex-1">
            <label className="font-medium">Categories</label>
            <select
              value={category}
              onChange={(e) => { setCategory(e.target.value); setErrors(prev => ({ ...prev, category: undefined })); }}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Category</option>
              {allCategories.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1 flex-1 ">
            <label className="font-medium">Add Tags</label>
            <TagsInput onChange={(val) => { setTags(val); setErrors(prev => ({ ...prev, tags: undefined })); }} />
          </div>
        </div>

        {/* Blog Summary */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Blog Summary*</label>
          <textarea
            placeholder="Enter blog summary"
            value={blogSummary}
            onChange={(e) => { setBlogSummary(e.target.value); setErrors(prev => ({ ...prev, blogSummary: undefined })); }}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.blogSummary && <p className="text-red-500 text-sm">{errors.blogSummary}</p>}
        </div>

        {/* Meta Title */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Blog Meta Title*</label>
          <input
            type="text"
            placeholder="Enter blog meta title"
            value={metaTitle}
            onChange={(e) => { setMetaTitle(e.target.value); setErrors(prev => ({ ...prev, metaTitle: undefined })); }}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.metaTitle && <p className="text-red-500 text-sm">{errors.metaTitle}</p>}
        </div>

        {/* Meta Description */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Blog Meta Description*</label>
          <textarea
            placeholder="Enter blog meta description"
            value={metaDescription}
            onChange={(e) => { setMetaDescription(e.target.value); setErrors(prev => ({ ...prev, metaDescription: undefined })); }}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.metaDescription && <p className="text-red-500 text-sm">{errors.metaDescription}</p>}
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <FlexibleButton
           label="Save as draft"
           iconName="document"
           variant="outline"
           className="flex-1"
           onClick={(e) => {
             e.preventDefault(); 
             setDraftModalOpen(true); 
           }}
         />
          <FlexibleButton
            label="Publish Blogs"
            iconName="book"
            variant="solid"
            className="flex-1"
          />
        </div>
      </form>
         <DraftModal
        open={draftModalOpen}
        onClose={() => setDraftModalOpen(false)}
        onConfirm={handleSaveDraft}
      />
    </div>
  );
}
