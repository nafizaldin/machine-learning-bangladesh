"use client";
import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { LearnMoreBtn, TiptapEditor } from "@/components/utilityComponents";
import ImageUpload from "@/components/utilityComponents/imageUpload/ImgaeUpload";
import TagsInput from "@/components/utilityComponents/tags/Tags";
import { ClockPlusSvg } from "@/components/base/svgs/SvgIcon";
import $axios from "@/_api/axios";
import resourceStore from "@/store/resourceStore"; // Assumed store
import FlexibleButton from "@/components/utilityComponents/customBtns/FlexibleButton";
import DraftModal from "@/components/utilityComponents/DraftModal/DraftModal";
import { stripBaseUrl } from "@/utils/cleanHtml";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function CreateNewResource() {
  const router = useRouter();
  // Form field states
  const [resourcePageTitle, setResourcePageTitle] = useState("");
  const [resourceTitle, setResourceTitle] = useState("");
  const [resourceDescription, setResourceDescription] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null); // For file name display
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState("");

  const [draftModalOpen, setDraftModalOpen] = useState(false);

  // Error states
  const [errors, setErrors] = useState({});

  // Image upload handler (mainImage and featuredImage)
  // NOTE: added "fieldKey" so we can set errors under a stable key (mainImage / featuredImage)
  const onDropImage = useCallback(async (files, setImage, setPreview, fieldKey) => {
    if (files.length === 0) return;
    const f = files[0];

    // Check file size (4MB)
    if (f.size > 4 * 1024 * 1024) {
      toast.error("Image size must not exceed 4MB");
      setErrors((prev) => ({ ...prev, [fieldKey]: "Image size must not exceed 4MB" }));
      return;
    }

    // Clear previous error for this field
    setErrors((prev) => ({ ...prev, [fieldKey]: null }));

    // Read file for preview
    const reader = new FileReader();
    reader.readAsDataURL(f);
    reader.onload = () => setPreview(reader.result);

    // Upload image
    try {
      const fd = new FormData();
      fd.append("file", f);
      const res = await $axios.post("/v1/media/image", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data?.success) {
        setImage(res.data.path);
      } else {
        throw new Error("Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setPreview(null);
      setImage(null);
      toast.error("Failed to upload image");
      setErrors((prev) => ({ ...prev, [fieldKey]: "Failed to upload image" }));
    }
  }, []);

  // File upload handler
  const onDropFile = useCallback(async (files) => {
    if (files.length === 0) return;
    const f = files[0];

    // Check file size (4MB)
    if (f.size > 4 * 1024 * 1024) {
      toast.error("File size must not exceed 4MB");
      setErrors((prev) => ({ ...prev, file: "File size must not exceed 4MB" }));
      return;
    }

    // Clear previous error
    setErrors((prev) => ({ ...prev, file: null }));

    // Set file name for preview
    setFilePreview(f.name);

    // Upload file
    try {
      const fd = new FormData();
      fd.append("file", f);
      const res = await $axios.post("/v1/media/file", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data?.success) {
        setFile(res.data.path);
      } else {
        throw new Error("Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setFilePreview(null);
      setFile(null);
      toast.error("Failed to upload file");
      setErrors((prev) => ({ ...prev, file: "Failed to upload file" }));
    }
  }, []);

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!resourcePageTitle) {
      newErrors.resourcePageTitle = "Resource Page Title is required";
    } else if (resourcePageTitle.length < 3) {
      newErrors.resourcePageTitle = "Resource Page Title must be at least 3 characters";
    }

    if (!resourceTitle) {
      newErrors.resourceTitle = "Resource Title is required";
    } else if (resourceTitle.length < 3) {
      newErrors.resourceTitle = "Resource Title must be at least 3 characters";
    }

    if (!description) {
      newErrors.description = "Description is required";
    }

    if (!mainImage) {
      newErrors.mainImage = "Main Image is required";
    }

    if (!category) {
      newErrors.category = "Category is required";
    }

    // file is required per your earlier UI
    if (!file) {
      newErrors.file = "File is required";
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

    const cleanDescription = stripBaseUrl(description);


    // Clear errors if validation passes
    setErrors({});

    // Build payload matching backend schema
    const obj = {
      // backend expects: title, description, categories, tags, image, video(optional), resourceTitle, resourceDescription, featuredImage, file
      title: resourcePageTitle,               // page title -> backend 'title'
      resourceTitle: resourceTitle,          // resource specific title
      resourceDescription: resourceDescription,
       description: cleanDescription,
      image: mainImage,                      // main image path (backend expects 'image')
      featuredImage: featuredImage,
      file: file,
      tags: tags,
      categories: [category],
      status: "published",
    };

    console.log("Form submitted:", obj);

    const [data, error] = await resourceStore.createResource(obj);

    if (data) {
      toast.success("Resource created successfully");
      // reset inputs (keep the same structure as before)
      setResourcePageTitle("");
      setResourceTitle("");
      setResourceDescription("");
      setMainImage(null);
      setMainImagePreview(null);
      setFeaturedImage(null);
      setFeaturedImagePreview(null);
      setFile(null);
      setFilePreview(null);
      setDescription("");
      setTags([]);
      setCategory("");
      setErrors({});
      resourceStore.reset();
      router.push("/admin/resources/resource-list");
    } else {
      toast.error(error?.message || error || "Failed to create resource");
    }
  };

  const handleSaveDraft = async () => {

     const cleanDescription = stripBaseUrl(description);
  const obj = {
    title: resourcePageTitle,
    resourceTitle,
    resourceDescription,
    description: cleanDescription,
    image: mainImage,
    featuredImage,
    file,
    tags,
    categories: [category],
    status: "draft",
  };

  const [data, error] = await resourceStore.createResource(obj);

  if (data) {
    toast.success("Draft saved successfully");
    router.push("/admin/resources/resource-list");
  } else {
    toast.error(error?.message || "Failed to save draft");
  }
};


  return (
    <div className="ca-create-resource">
      <form onSubmit={onSubmit}>
        {/* Main Image */}
        <div className="main-img my-4">
          <label>Add Image* (7:3, 700×300 px)</label>
          <ImageUpload
            label="Drop main image"
            height="h-48"
            onDrop={(files) => onDropImage(files, setMainImage, setMainImagePreview, "mainImage")}
            preview={mainImagePreview}
            rounded="rounded-full"
            accept="image/*"
            aspectRatio="7:3"
            recommendedDimensions="700×300 px"
          />
          {errors.mainImage && (
            <p className="text-red-500 text-sm">{errors.mainImage}</p>
          )}
        </div>

        <br /> <br />

        {/* Resource Page Title */}
        <div className="resource-page my-4">
          <label>Resource Page Title*</label>
          <input
            type="text"
            placeholder="Enter resource page title here"
            value={resourcePageTitle}
            onChange={(e) => { setResourcePageTitle(e.target.value); setErrors(prev => ({ ...prev, resourcePageTitle: undefined })); }}
          />
          {errors.resourcePageTitle && (
            <p className="text-red-500 text-sm">{errors.resourcePageTitle}</p>
          )}
        </div>

        <br /> <br />

        {/* Main Description */}
        <div className="main-desc my-4">
          <label>Write Descriptions</label>
          <div>
            <TiptapEditor
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
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        <br /> <br />

        {/* Categories & Tags */}
        <div className="cate-tags my-4">
          <div className="cate">
            <label>Categories</label>
            <select
              value={category}
              onChange={(e) => { setCategory(e.target.value); setErrors(prev => ({ ...prev, category: undefined })); }}
            >
              <option value="">Select Category</option>
              <option value="tech">Technology</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="education">Education</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}
          </div>

          <div className="tags">
            <label>Add Tags</label>
            <TagsInput onChange={(val) => { setTags(val); setErrors(prev => ({ ...prev, tags: undefined })); }} />
          </div>
        </div>

        <br /> <br />

        {/* Resource Title */}
        <div className="resource-title my-4">
          <label>Resource Title*</label>
          <input
            type="text"
            placeholder="Enter resource title here"
            value={resourceTitle}
            onChange={(e) => { setResourceTitle(e.target.value); setErrors(prev => ({ ...prev, resourceTitle: undefined })); }}
          />
          {errors.resourceTitle && (
            <p className="text-red-500 text-sm">{errors.resourceTitle}</p>
          )}
        </div>

        <br /> <br />

        {/* Resource Description */}
        <div className="resource-description my-4">
          <label>Resource Descriptions</label>
          <div>
            <textarea
              rows={7}
              value={resourceDescription}
              onChange={(e) => { setResourceDescription(e.target.value); setErrors(prev => ({ ...prev, resourceDescription: undefined })); }}
            />
          </div>
        </div>

        <br /> <br />

        {/* Featured Image */}
        <div className="featured-image my-4">
          <label>Featured Image (1:1, 3000×3000 px)</label>
          <ImageUpload
            label="Drop featured image"
            height="h-40"
            onDrop={(files) =>
              onDropImage(files, setFeaturedImage, setFeaturedImagePreview, "featuredImage")
            }
            preview={featuredImagePreview}
            rounded="rounded-full"
            accept="image/*"
            aspectRatio="1:1"
            recommendedDimensions="3000×3000 px"
          />
          {errors.featuredImage && (
            <p className="text-red-500 text-sm">{errors.featuredImage}</p>
          )}
        </div>

        <br /> <br />

        {/* File Upload */}
        <div className="featured-file my-4">
          <label>Add File*</label>
          <div className="w-full">
            <ImageUpload
              label="Add File"
              height="h-40"
              onDrop={onDropFile}
              preview={filePreview}
              rounded="rounded-full"
              accept="*/*"
            />
          </div>
          {errors.file && (
            <p className="text-red-500 text-sm">{errors.file}</p>
          )}
        </div>

        <br /> <br />

        {/* Buttons */}
        <div className="btn my-4">
            <FlexibleButton
                                         label="Draft Resource"
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
                                         label="Publish Resource"
                                         iconName="document"
                                         variant="solid"
                                         className="flex-1 "
                                         
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
