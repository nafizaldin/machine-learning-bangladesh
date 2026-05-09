"use client";
import { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { LearnMoreBtn, TiptapEditor } from "@/components/utilityComponents";
import TagsInput from "@/components/utilityComponents/tags/Tags";
import { ClockPlusSvg } from "@/components/base/svgs/SvgIcon";
import ImageUpload from "@/components/utilityComponents/imageUpload/ImgaeUpload";
import $axios from "@/_api/axios";
import blogStore from "@/store/blogStore";
import { useRouter, useParams } from "next/navigation";
import FlexibleButton from "@/components/utilityComponents/customBtns/FlexibleButton";
import DraftModal from "@/components/utilityComponents/DraftModal/DraftModal";
import { addBaseUrl, stripBaseUrl } from "@/utils/cleanHtml";

const allCategories = [
  {
    name: "Technology",
    value: "tech",
  },
  {
    name: "Lifestyle",
    value: "lifestyle",
  },
  {
    name: "Education",
    value: "education",
  },
  {
    name: "Web Design",
    value: "web-design",
  },
  {
    name: "Web Development",
    value: "web-development",
  },
  {
    name: "Mobile App Design",
    value: "mobile-app-design",
  },
  {
    name: "Mobile App Development",
    value: "mobile-app-development",
  },
  {
    name: "Products & SaaS",
    value: "products-saas",
  },
  {
    name: "Illustrations",
    value: "illustrations",
  },
  {
    name: "Graphic Design",
    value: "graphic-design",
  },
  {
    name: "Digital Marketing",
    value: "digital-marketing",
  },
];

export default function UpdateBlog() {
  const router = useRouter();
  const params = useParams();
  const idOrSlug = params?.id || ""; // expects route /.../update/[idOrSlug]
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const [triggerer, setTriggerer] = useState(0);



  // Form field states
  const [blogTitle, setBlogTitle] = useState("");
  const [blogSummary, setBlogSummary] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState("");
  const [draftModalOpen, setDraftModalOpen] = useState(false);


  // Error & loading states
  const [errors, setErrors] = useState({});
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);

  // helper to build preview urls
  const makePreviewUrl = (p) => {
    if (!p) return null;
    if (!p.startsWith("/")) return `${baseUrl}/${p}`;
    return `${baseUrl}${p}`;
  };

  // Fetch blog and prefill
  useEffect(() => {
    if (!idOrSlug) return;

    (async () => {
      try {
        setFetching(true);
        const [data, err] = await blogStore.getBlog(idOrSlug);
        if (err) {
          toast.error(err || "Failed to load blog");
          return;
        }
        const blog = data;



        const fixedHTML = addBaseUrl(blog.content, baseUrl);

        // Prefill fields
        setBlogTitle(blog?.title || "");
        setBlogSummary(blog?.summary || "");
        setMetaTitle(blog?.metadata?.title || "");
        setMetaDescription(blog?.metadata?.description || "");
       


        setDescription(fixedHTML || "");
        setTags(blog?.tags?.length ? blog.tags : []);
        setCategory((blog?.categories && blog.categories[0]) || "");
        setMainImage(blog?.featuredImage || null);
        setMainImagePreview(makePreviewUrl(blog?.featuredImage));
      } catch (e) {
        console.error("Error fetching blog:", e);
        toast.error("Failed to load blog");
      } finally {
        setFetching(false);
        setTimeout(() => {
          setTriggerer((t) => t + 1);
        }, 100);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idOrSlug]);

  const onDrop = useCallback(async (files) => {
    if (files.length === 0) return;
    const file = files[0];

    // Check file size (4MB = 4 * 1024 * 1024 bytes)
    if (file.size > 4 * 1024 * 1024) {
      toast.error("Image size must not exceed 4MB");
      setErrors((prev) => ({ ...prev, mainImage: "Image size must not exceed 4MB" }));
      return;
    }

    // Clear previous error
    setErrors((prev) => ({ ...prev, mainImage: null }));

    // Read file for preview
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setMainImagePreview(reader.result);

    // Upload image
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await $axios.post("/v1/media/image", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data?.success) {
        setMainImage(res.data.path);
        // set preview to server path if available
        setMainImagePreview(makePreviewUrl(res.data.path));
      } else {
        throw new Error("Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setMainImagePreview(null);
      setMainImage(null);
      toast.error("Failed to upload image");
      setErrors((prev) => ({ ...prev, mainImage: "Failed to upload image" }));
    }
  }, [baseUrl]);

  // Validation function (unchanged)
  const validateForm = () => {
    const newErrors = {};

    if (!blogTitle) {
      newErrors.blogTitle = "Blog Title is required";
    } else if (blogTitle.length < 3) {
      newErrors.blogTitle = "Blog Title must be at least 3 characters";
    }

    if (!blogSummary) {
      newErrors.blogSummary = "Blog Summary is required";
    } else if (blogSummary.length < 10) {
      newErrors.blogSummary = "Blog Summary must be at least 10 characters";
    } else if (blogSummary.length > 200) {
      newErrors.blogSummary = "Blog Summary must not exceed 200 characters";
    }

    if (!metaTitle) {
      newErrors.metaTitle = "Blog Meta Title is required";
    } else if (metaTitle.length < 3) {
      newErrors.metaTitle = "Blog Meta Title must be at least 3 characters";
    } else if (metaTitle.length > 60) {
      newErrors.metaTitle = "Blog Meta Title must not exceed 60 characters";
    }

    if (!metaDescription) {
      newErrors.metaDescription = "Blog Meta Description is required";
    } else if (metaDescription.length < 10) {
      newErrors.metaDescription = "Blog Meta Description must be at least 10 characters";
    } else if (metaDescription.length > 160) {
      newErrors.metaDescription = "Blog Meta Description must not exceed 160 characters";
    }

    if (!mainImage) {
      newErrors.mainImage = "Main Image is required";
    }

    if (!description) {
      newErrors.description = "Blog content is required";
    }

    return newErrors;
  };

  // onSubmit handler
  const onSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear errors if validation passes
    setErrors({});
    setLoading(true);

     const cleanDescription = stripBaseUrl(description);

    const obj = {
      title: blogTitle,
      author: {
        name: "Orifine",
        bio: "",
        image: "",
      },
      metadata: {
        title: metaTitle,
        description: metaDescription,
      },
       content: cleanDescription,
      summary: blogSummary,
      featuredImage: mainImage,
      tags: tags,
      categories: [category],
      status: "published",
    };

    try {
      // NOTE: pass idOrSlug as first arg — adjust if your blogStore signature differs
      const [data, error] = await blogStore.updateBlog(idOrSlug, obj);

      if (data) {
        toast.success("Blog Updated successfully");
        setBlogTitle("");
        setBlogSummary("");
        setMetaTitle("");
        setMetaDescription("");
        setMainImage(null);
        setMainImagePreview(null);
        setDescription("");
        setTags([]);
        setCategory("");
        setErrors({});
        blogStore.reset();
        router.push("/admin/blogs/blog-list");
      } else {
        toast.error(error || "Failed to update blog");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Failed to update blog");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = async (note) => {
  setDraftModalOpen(false);
  setLoading(true);
 const cleanDescription = stripBaseUrl(description);
  const obj = {
    title: blogTitle,
    author: { name: "Orifine", bio: "", image: "" },
    metadata: { title: metaTitle, description: metaDescription },
    content: cleanDescription,
    summary: blogSummary,
    featuredImage: mainImage,
    tags,
    categories: [category],
    status: "draft",
    // draftDescription: note,
  };

  try {
    const [data, error] = await blogStore.updateBlog(idOrSlug, obj);

    if (data) {
      toast.success("Blog saved as draft");
      blogStore.reset();
      router.push("/admin/blogs/blog-list");
    } else {
      toast.error(error || "Failed to save draft");
    }
  } catch (err) {
    console.error("Draft error:", err);
    toast.error("Draft save failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="ca-create-resource">
      <form onSubmit={onSubmit}>
        {/* Blog Title */}
        <div className="resource-page">
          <label>Blog Title*</label>
          <input
            type="text"
            placeholder="Enter blog title here"
            value={blogTitle}
            onChange={(e) => { setBlogTitle(e.target.value); setErrors(prev => ({ ...prev, blogTitle: undefined })); }}
          />
          {errors.blogTitle && <p className="text-red-500 text-sm">{errors.blogTitle}</p>}
        </div>

        <br /> <br />

        {/* Main Image */}
        <div className="main-img">
          <label>Add Image* (7:3, 700×300 px)</label>
          <ImageUpload label="Drop main image" height="h-48" onDrop={onDrop} preview={mainImagePreview} rounded="rounded-full" aspectRatio="7:3" recommendedDimensions="700×300 px" />
          {errors.mainImage && <p className="text-red-500 text-sm">{errors.mainImage}</p>}
        </div>

        <br /> <br />

        {/* Main Description */}
        <div className="main-desc">
          <label>Write Blog*</label>
          <div>
                <TiptapEditor
              key={triggerer}
              content={description}
              onContentChange={({ html }) => {
                if (html === "<p></p>") {
                  setDescription("");
                } else {
                  setDescription(html);
                }
                setErrors(prev => ({ ...prev, description: undefined }));
              }}
              mode="write"
            />
          </div>
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        <br /> <br />

        {/* Categories & Tags */}
        <div className="cate-tags">
          <div className="cate">
            <label>Categories</label>
            <select value={category} onChange={(e) => { setCategory(e.target.value); setErrors(prev => ({ ...prev, category: undefined })); }}>
              <option value="">Select Category</option>
              {allCategories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="tags">
            <label>Add Tags</label>
            <TagsInput key={triggerer} onChange={(val) => { setTags(val); setErrors(prev => ({ ...prev, tags: undefined })); }} prefillValue={tags} />
          </div>
        </div>

        <br /> <br />

        {/* Blog Summary */}
        <div className="resource-page">
          <label>Blog Summary*</label>
          <textarea placeholder="Enter blog summary" value={blogSummary} onChange={(e) => { setBlogSummary(e.target.value); setErrors(prev => ({ ...prev, blogSummary: undefined })); }} />
          {errors.blogSummary && <p className="text-red-500 text-sm">{errors.blogSummary}</p>}
        </div>

        <br /> <br />

        {/* Meta Title */}
        <div className="resource-page">
          <label>Blog Meta Title*</label>
          <input type="text" placeholder="Enter blog meta title" value={metaTitle} onChange={(e) => { setMetaTitle(e.target.value); setErrors(prev => ({ ...prev, metaTitle: undefined })); }} />
          {errors.metaTitle && <p className="text-red-500 text-sm">{errors.metaTitle}</p>}
        </div>

        <br /> <br />

        {/* Meta Description */}
        <div className="resource-page">
          <label>Blog Meta Description*</label>
          <textarea placeholder="Enter blog meta description" value={metaDescription} onChange={(e) => { setMetaDescription(e.target.value); setErrors(prev => ({ ...prev, metaDescription: undefined })); }} />
          {errors.metaDescription && <p className="text-red-500 text-sm">{errors.metaDescription}</p>}
        </div>

        <br /> <br />

        {/* Buttons */}
        <div className="btn">
        <FlexibleButton
  label="Save as Draft"
  iconName="document"
  variant="outline"
  className="flex-1"
  onClick={(e) => {
    e.preventDefault();
    setDraftModalOpen(true); 
  }}
/>

              <FlexibleButton
  type="submit"
  label={loading ? "Updating..." : "Update & Publish"}
  iconName="document"
  variant="solid"
  className="flex-1 "
  disabled={loading}
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
