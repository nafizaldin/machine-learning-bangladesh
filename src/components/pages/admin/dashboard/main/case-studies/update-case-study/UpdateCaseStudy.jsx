"use client";
import { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { TiptapEditor } from "@/components/utilityComponents";
import TagsInput from "@/components/utilityComponents/tags/Tags";
import { ClockPlusSvg } from "@/components/base/svgs/SvgIcon";
import ImageUpload from "@/components/utilityComponents/imageUpload/ImgaeUpload";
import VideoUpload from "@/components/utilityComponents/videoUpload/VideoUpload";
import $axios from "@/_api/axios";
import caseStudyStore from "@/store/caseStudyStore";
import { useRouter, useParams } from "next/navigation";
import * as Dialog from '@radix-ui/react-dialog';
import TestimonialComponent from "../Testimonial";
import FlexibleButton from "@/components/utilityComponents/customBtns/FlexibleButton";
import DraftModal from "@/components/utilityComponents/DraftModal/DraftModal";
import { addBaseUrl, stripBaseUrl } from "@/utils/cleanHtml";

const allCategories = [
  { name: "Web Design", value: "web-design" },
  { name: "Web Development", value: "web-development" },
  { name: "E-commerce", value: "e-commerce" },
  { name: "Content Creation", value: "content-creation" },
  { name: "SEO", value: "seo" },
  { name: "UX/UI", value: "ux-ui" },
  { name: "Data Science", value: "data-science" },
  { name: "Machine Learning", value: "machine-learning" },
  { name: "Cloud Computing", value: "cloud-computing" },
  { name: "Cybersecurity", value: "cybersecurity" },
  { name: "Mobile App Design", value: "mobile-app-design" },
  { name: "Mobile App Development", value: "mobile-app-development" },
  { name: "Frontend Development", value: "frontend-dev" },
  { name: "Backend Development", value: "backend-dev" },
  { name: "Fullstack Development", value: "fullstack-dev" },
  { name: "DevOps", value: "devops" },
  { name: "AI", value: "ai" },
  { name: "Game Development", value: "game-dev" },
  { name: "AR/VR", value: "ar-vr" },
  { name: "Automation", value: "automation" },
  { name: "Products & SaaS", value: "products-saas" },
  { name: "Graphic Design", value: "graphic-design" },
  { name: "Digital Marketing", value: "digital-marketing" },
  { name: "LLMS", value: "llms" },
  { name: "Artificial Intelligence", value: "ai" },
  { name: "Blockchain", value: "blockchain" },
  { name: "IoT", value: "iot" },
];

export default function UpdateCaseStudy() {
  const router = useRouter();
  const params = useParams();
  const idOrSlug = params?.id || "";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const [triggerer, setTriggerer] = useState(0);
  const [title, setTitle] = useState("");
  const [shortName, setShortName] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [problemStatement, setProblemStatement] = useState({ text: "", image: "" });
  const [solutionImplemented, setSolutionImplemented] = useState({ text: "", image: "" });
  const [visualDesign, setVisualDesign] = useState({ text: "", image: "" });
  const [achievement, setAchievement] = useState({ text: "", image: "" });
  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [mainVideo, setMainVideo] = useState(null);
  const [mainVideoPreview, setMainVideoPreview] = useState(null);
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState({});
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialOpen, setTestimonialOpen] = useState(false);
  const [draftModalOpen, setDraftModalOpen] = useState(false);

  const [testimonial, setTestimonial] = useState({
    image: null,
    imagePreview: null,
    comment: "",
    userName: "",
    userOccupation: "",
    company: ""
  });
  const [editIndex, setEditIndex] = useState(null);
  const makePreviewUrl = (p) => {
    if (!p) return null;
    if (!p.startsWith("/")) return `${baseUrl}/${p}`;
    return `${baseUrl}${p}`;
  };
  useEffect(() => {
    if (!idOrSlug) return;
    (async () => {
      try {
        setFetching(true);
        const [data, err] = await caseStudyStore.getProject(idOrSlug);
        if (err) {
          toast.error(err || "Failed to load case study");
          return;
        }
        const cs = data;
         const fixedHTML = addBaseUrl(cs.description, baseUrl);
        console.log(cs?.description)
        setTitle(cs?.title || "");
        setShortName(cs?.shortName || "");
        setSummary(cs?.summary || "");
        setDescription(fixedHTML || "");
        setProblemStatement(cs?.problemStatement || { text: "", image: "" });
        setSolutionImplemented(cs?.solutionImplemented || { text: "", image: "" });
        setVisualDesign(cs?.visualDesign || { text: "", image: "" });
        setAchievement(cs?.achievement || { text: "", image: "" });
        setMainImage(cs?.featuredImage || null);
        setMainImagePreview(makePreviewUrl(cs?.featuredImage));
        setMainVideo(cs?.featuredVideo || null);
        setMainVideoPreview(cs?.featuredVideo ? makePreviewUrl(cs?.featuredVideo) : null);
        setTags(cs?.tags?.length ? cs.tags : []);
        setCategory((cs?.categories && cs.categories[0]) || "");
        setTestimonials(cs?.testimonials || []);
      } catch (e) {
        toast.error("Failed to load case study");
      } finally {
        setFetching(false);
        setTimeout(() => { setTriggerer((t) => t + 1); }, 100);
      }
    })();
  }, [idOrSlug]);
  const handleTestimonialImage = async (files) => {
    if (files.length === 0) return;
    const file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setTestimonial(t => ({ ...t, imagePreview: reader.result }));
    setTestimonial(t => ({ ...t, image: file }));
  };

  const onTestimonialSave = async () => {
    let imagePath = testimonial.imagePreview;
    if (testimonial.image) {
      const fd = new FormData();
      fd.append("file", testimonial.image);
      const res = await $axios.post("/v1/media/image", fd, { headers: { "Content-Type": "multipart/form-data" } });
      if (res.data.success) imagePath = res.data.path;
    }
    const newTestimonial = {
      id: testimonial.id || Date.now().toString(),
      image: imagePath,
      comment: testimonial.comment,
      userName: testimonial.userName,
      userOccupation: testimonial.userOccupation,
      company: testimonial.company
    };
    if (editIndex !== null) {
      setTestimonials(prev => prev.map((t, i) => i === editIndex ? newTestimonial : t));
    } else {
      setTestimonials(prev => [...prev, newTestimonial]);
    }
    setTestimonialOpen(false);
    setTestimonial({ image: null, imagePreview: null, comment: "", userName: "", userOccupation: "", company: "" });
    setEditIndex(null);
  };

  const handleEditTestimonial = (testimonialObj, idx) => {

    setTestimonial({ ...testimonialObj, imagePreview: makePreviewUrl(testimonialObj.image) });
    setEditIndex(idx);
    setTestimonialOpen(true);
  };

  const handleDeleteTestimonial = (testimonial, idx) => {
    setTestimonials(prev => prev.filter((_, i) => i !== idx));
  };
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
      if (res.data?.success) {
        setMainImage(res.data.path);
        setMainImagePreview(makePreviewUrl(res.data.path));
      } else {
        throw new Error("Upload failed");
      }
    } catch (err) {
      setMainImagePreview(null);
      setMainImage(null);
      toast.error("Failed to upload image");
      setErrors((prev) => ({ ...prev, mainImage: "Failed to upload image" }));
    }
  }, [baseUrl]);
  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Title is required";
    else if (title.length < 3) newErrors.title = "Title must be at least 3 characters";
    if (!shortName) newErrors.shortName = "Short Name is required";
    else if (shortName.length < 3) newErrors.shortName = "Short Name must be at least 3 characters";
    if (!summary) newErrors.summary = "Summary is required";
    else if (summary.length < 10) newErrors.summary = "Summary must be at least 10 characters";
    else if (summary.length > 200) newErrors.summary = "Summary must not exceed 200 characters";
    if (!description) newErrors.description = "Description is required";
    else if (description.length < 10) newErrors.description = "Description must be at least 10 characters";
    if (!problemStatement.text) newErrors.problemStatement = "Problem Statement is required";
    if (!solutionImplemented.text) newErrors.solutionImplemented = "Solution Implemented is required";
    if (!visualDesign.text) newErrors.visualDesign = "Visual Design is required";
    if (!achievement.text) newErrors.achievement = "Achievement is required";
    if (!mainImage) newErrors.mainImage = "Main Image is required";
    if (mainVideo) {
      const isValidVideoUrl = (url) => {
        // Simple regex for YouTube and Vimeo URLs
        return (
          /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com)\/.+$/i.test(url)
        );
      };
      if (!isValidVideoUrl(mainVideo)) newErrors.mainVideo = "Please enter a valid YouTube or Vimeo URL";
    }
    if (!tags.length) newErrors.tags = "At least one tag is required";
    if (!category) newErrors.category = "Category is required";
    return newErrors;
  };
  const onDropVideo = useCallback(async (files) => {
    if (files.length === 0) return;
    const file = files[0];
    if (file.size > 20 * 1024 * 1024) {
      toast.error("Video size must not exceed 20MB");
      setErrors((prev) => ({ ...prev, video: "Video size must not exceed 20MB" }));
      return;
    }
    setErrors((prev) => ({ ...prev, video: null }));
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setMainVideoPreview(reader.result);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await $axios.post("/v1/media/video", fd, {
        headers: { "Content-Type": "multipart/form-data", "Accept": "multipart/form-data" },
      });
      if (res.data.success) {
        setMainVideo(res.data.path);
        setMainVideoPreview(baseUrl + res.data.path);
      } else {
        throw new Error("Upload failed");
      }
    } catch (err) {
      setMainVideoPreview(null);
      setMainVideo(null);
      toast.error("Failed to upload video");
      setErrors((prev) => ({ ...prev, mainVideo: "Failed to upload video" }));
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    const cleanDescription = stripBaseUrl(description);
    const obj = {
      title,
      shortName,
      type: "Development & Case Study",
      summary,
      description:cleanDescription,
      problemStatement,
      solutionImplemented,
      visualDesign,
      achievement,
      featuredImage: mainImage,
      featuredVideo: mainVideo,
      gallery: [],
      startDate: "2024-01-10",
      endDate: "2024-03-20",
      status: "published",
      repoUrl: "",
      liveUrl: "",
      tags,
      categories: [category],
      testimonials: testimonials,
      authors: [
        { name: "ML Bangladesh", role: "", image: "" }
      ]
    };
    try {
      const [data, error] = await caseStudyStore.updateProject(idOrSlug, obj);
      if (data) {
        toast.success("Project updated successfully");
        router.push("/admin/case-studies/list");
      } else {
        toast.error(error || "Failed to update project");
      }
    } catch (err) {
      toast.error("Failed to update project");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    const cleanDescription = stripBaseUrl(description);
  const obj = {
    title,
    shortName,
    type: "Development & Case Study",
    summary,
    description: cleanDescription,
    problemStatement,
    solutionImplemented,
    visualDesign,
    achievement,
    featuredImage: mainImage,
    featuredVideo: mainVideo,
    gallery: [],
    startDate: "2024-01-10",
    endDate: "2024-03-20",
    status: "draft",          
    publishedAt: null,       
    repoUrl: "",
    liveUrl: "",
    tags,
    categories: [category],
    testimonials,
    authors: [
      { name: "ML Bangladesh", role: "", image: "" }
    ]
  };

  const [data, error] = await caseStudyStore.updateProject(idOrSlug, obj);

  if (data) {
    toast.success("Saved as Draft");
    router.push("/admin/case-studies/list");
  } else {
    toast.error(error || "Failed to save draft");
  }
};

  return (
    <div className="ca-case-study-details">
  <form onSubmit={onSubmit}>
        <div className="resource-page">
          <label>Title*</label>
          <input type="text" placeholder="Enter case study title here" value={title} onChange={(e) => { setTitle(e.target.value); setErrors(prev => ({ ...prev, title: undefined })); }} />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>
        <div className="resource-page">
          <label>Short Name*</label>
          <input type="text" placeholder="Enter short name here" value={shortName} onChange={(e) => { setShortName(e.target.value); setErrors(prev => ({ ...prev, shortName: undefined })); }} />
          {errors.shortName && <p className="text-red-500 text-sm">{errors.shortName}</p>}
        </div>
        <br /> <br />
        <div className="main-img">
          <label>Add Image* (7:3, 700×300 px)</label>
          <ImageUpload label="Drop main image" height="h-48" onDrop={onDrop} preview={mainImagePreview} rounded="rounded-full" aspectRatio="7:3" recommendedDimensions="700×300 px" />
          {errors.mainImage && <p className="text-red-500 text-sm">{errors.mainImage}</p>}
        </div>
        <br /> <br />
        <div className="main-desc">
          <label>Project Overview*</label>
          <div>
            <TiptapEditor key={triggerer} content={description} mode="write" onContentChange={({ html }) => { setDescription(html === '<p></p>' ? '' : html); setErrors(prev => ({ ...prev, description: undefined })); }} />
          </div>
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>
        <div className="cate-tags">
          <div className="cate">
            <label>Categories</label>
            <select value={category} onChange={(e) => { setCategory(e.target.value); setErrors(prev => ({ ...prev, category: undefined })); }}>
              <option value="">Select Category</option>
              {allCategories.map((cat,idx) => (
                <option key={idx} value={cat?.value}>{cat?.name}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
          </div>
          <div className="tags">
            <label>Add Tags</label>
            <TagsInput key={triggerer} onChange={(val) => { setTags(val); setErrors(prev => ({ ...prev, tags: undefined })); }} prefillValue={tags} />
            {errors.tags && <p className="text-red-500 text-sm">{errors.tags}</p>}
          </div>
        </div>
        <br /> <br />
        <div className="resource-page">
          <label>Summary*</label>
          <textarea placeholder="Enter case study summary" value={summary} onChange={(e) => { setSummary(e.target.value); setErrors(prev => ({ ...prev, summary: undefined })); }} />
          {errors.summary && <p className="text-red-500 text-sm">{errors.summary}</p>}
        </div>
        <br /> <br />
        <div className="cs-box-outer">
          <label>Problem Statement* (image 1:1, 3000×3000 px)</label>
          <div className="cs-box-inner cs-2/1">
            <span>
              <TiptapEditor key={triggerer} content={problemStatement.text} mode="write" onContentChange={({ html }) => { setProblemStatement(ps => ({ ...ps, text: html === '<p></p>' ? '' : html })); setErrors(prev => ({ ...prev, problemStatement: undefined })); }} />
              {errors.problemStatement && <p className="text-red-500 text-sm">{errors.problemStatement}</p>}
            </span>
            <span>
              <ImageUpload label="Upload image for problem statement or leave blank" aspectRatio="1:1" recommendedDimensions="3000×3000 px" onDrop={async (files) => {
                if (files.length === 0) return;
                const file = files[0];
                const fd = new FormData();
                fd.append("file", file);
                const res = await $axios.post("/v1/media/image", fd, { headers: { "Content-Type": "multipart/form-data" } });
                if (res.data.success) setProblemStatement(ps => ({ ...ps, image: res.data.path }));
              }} preview={problemStatement.image ? makePreviewUrl(problemStatement.image) : null} rounded="rounded-full" />
            </span>
          </div>
        </div>
        <br /> <br />
        <div className="cs-box-outer">
          <label>Solution Implemented* (image 1:1, 3000×3000 px)</label>
          <div className="cs-box-inner cs-2/1">
            <span>
              <TiptapEditor key={triggerer} content={solutionImplemented.text} mode="write" onContentChange={({ html }) => { setSolutionImplemented(si => ({ ...si, text: html === '<p></p>' ? '' : html })); setErrors(prev => ({ ...prev, solutionImplemented: undefined })); }} />
              {errors.solutionImplemented && <p className="text-red-500 text-sm">{errors.solutionImplemented}</p>}
            </span>
            <span>
              <ImageUpload label="Upload image for solution implemented or leave blank" aspectRatio="1:1" recommendedDimensions="3000×3000 px" onDrop={async (files) => {
                if (files.length === 0) return;
                const file = files[0];
                const fd = new FormData();
                fd.append("file", file);
                const res = await $axios.post("/v1/media/image", fd, { headers: { "Content-Type": "multipart/form-data" } });
                if (res.data.success) setSolutionImplemented(si => ({ ...si, image: res.data.path }));
              }} preview={solutionImplemented.image ? makePreviewUrl(solutionImplemented.image) : null} rounded="rounded-full" />
            </span>
          </div>
        </div>
        <br /> <br />
        <div className="cs-box-outer">
          <label>Visual Design* (image 1:1, 3000×3000 px)</label>
          <div className="cs-box-inner cs-1/2">
            <span>
              <ImageUpload label="Upload image for visual design or leave blank" aspectRatio="1:1" recommendedDimensions="3000×3000 px" onDrop={async (files) => {
                if (files.length === 0) return;
                const file = files[0];
                const fd = new FormData();
                fd.append("file", file);
                const res = await $axios.post("/v1/media/image", fd, { headers: { "Content-Type": "multipart/form-data" } });
                if (res.data.success) setVisualDesign(vd => ({ ...vd, image: res.data.path }));
              }} preview={visualDesign.image ? makePreviewUrl(visualDesign.image) : null} rounded="rounded-full" />
            </span>
            <span>
              <TiptapEditor key={triggerer} content={visualDesign.text} mode="write" onContentChange={({ html }) => { setVisualDesign(vd => ({ ...vd, text: html === '<p></p>' ? '' : html })); setErrors(prev => ({ ...prev, visualDesign: undefined })); }} />
              {errors.visualDesign && <p className="text-red-500 text-sm">{errors.visualDesign}</p>}
            </span>
          </div>
        </div>
        <br /> <br />
        <div className="resource-page">
          <label>Add Video (YouTube/Vimeo URL)*</label>
          <input
            type="text"
            placeholder="Enter YouTube or Vimeo video URL"
            value={mainVideo || ''}
            onChange={e => { setMainVideo(e.target.value); setErrors(prev => ({ ...prev, mainVideo: undefined })); }}
            className="w-full p-3 border border-[#3F3D56] rounded-lg"
          />
          {mainVideo && (isValidVideoUrl(mainVideo)) && (
            <div className="mt-2">
              <VideoPreview url={mainVideo} />
            </div>
          )}
          {errors.mainVideo && <p className="text-red-500 text-sm">{errors.mainVideo}</p>}
        </div>
        <br /> <br />
        <div className="cs-box-outer">
          <label>Achievements* (image 1:1, 3000×3000 px)</label>
          <div className="cs-box-inner cs-2/1">
            <span>
              <TiptapEditor key={triggerer} content={achievement.text} mode="write" onContentChange={({ html }) => { setAchievement(a => ({ ...a, text: html === '<p></p>' ? '' : html })); setErrors(prev => ({ ...prev, achievement: undefined })); }} />
              {errors.achievement && <p className="text-red-500 text-sm">{errors.achievement}</p>}
            </span>
            <span>
              <ImageUpload label="Upload image for achievement or leave blank" aspectRatio="1:1" recommendedDimensions="3000×3000 px" onDrop={async (files) => {
                if (files.length === 0) return;
                const file = files[0];
                const fd = new FormData();
                fd.append("file", file);
                const res = await $axios.post("/v1/media/image", fd, { headers: { "Content-Type": "multipart/form-data" } });
                if (res.data.success) setAchievement(a => ({ ...a, image: res.data.path }));
              }} preview={achievement.image ? makePreviewUrl(achievement.image) : null} rounded="rounded-full" />
            </span>
          </div>
        </div>
        <br /> <br />
       <div className="labs">
  <label className="text-[#202124]">Edit/Add Testimonials (image 1:1, 3000×3000 px)</label>
  
  <Dialog.Root open={testimonialOpen} onOpenChange={setTestimonialOpen}>
    <Dialog.Trigger asChild>
      <FlexibleButton
        label="Add New Testimonials"
        iconName="book"
        variant="outline"
        className="w-1/2"
        onClick={(e) => {
          e.preventDefault();
          setTestimonialOpen(true);
        }}
      />
    </Dialog.Trigger>

    <Dialog.Portal>
      {/* Dark/light overlay */}
      <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />

      <Dialog.Content className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-[40rem] shadow-lg text-[#202124]">
        <Dialog.Title className="text-lg font-bold pb-4">Add/Edit Testimonial (image 1:1, 3000×3000 px)</Dialog.Title>

        <div className="flex gap-4">
          {/* Image Upload */}
          <div className="pb-3 w-1/2">
            <ImageUpload
              label="Upload image"
              onDrop={handleTestimonialImage}
              preview={testimonial.imagePreview}
              aspectRatio="1:1"
              recommendedDimensions="3000×3000 px"
            />
          </div>

          <div className="flex-1">
            <div className="pb-3">
              <textarea
                placeholder="Comment"
                value={testimonial.comment}
                onChange={(e) =>
                  setTestimonial((t) => ({ ...t, comment: e.target.value }))
                }
                className="w-full p-3 border border-[#dadce0] rounded-lg resize-none bg-white text-[#202124]"
                rows={3}
              />
            </div>

            <div className="pb-3">
              <input
                type="text"
                placeholder="User Name"
                value={testimonial.userName}
                onChange={(e) =>
                  setTestimonial((t) => ({ ...t, userName: e.target.value }))
                }
                className="w-full p-3 border border-[#dadce0] rounded-full bg-white text-[#202124]"
              />
            </div>

            <div className="pb-3">
              <input
                type="text"
                placeholder="Occupation"
                value={testimonial.userOccupation}
                onChange={(e) =>
                  setTestimonial((t) => ({ ...t, userOccupation: e.target.value }))
                }
                className="w-full p-3 border border-[#dadce0] rounded-full bg-white text-[#202124]"
              />
            </div>

            <div className="pb-3">
              <input
                type="text"
                placeholder="Company"
                value={testimonial.company}
                onChange={(e) =>
                  setTestimonial((t) => ({ ...t, company: e.target.value }))
                }
                className="w-full p-3 border border-[#dadce0] rounded-full bg-white text-[#202124]"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 justify-between pt-4">
          <Dialog.Close asChild>
            <FlexibleButton
  label="Cancel"
  variant="outline" 
  className="w-[10rem] text-[#202124]"
  onClick={() => setTestimonialOpen(false)}
/>
          </Dialog.Close>

         <FlexibleButton
  label="Save"
  variant="solid"
  className="w-[10rem]"
  onClick={() => {
    onTestimonialSave();
    setTestimonialOpen(false);
  }}
/>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
</div>

        <br /> <br />
        <div >
          <TestimonialComponent
            key={testimonials.length}
            project={{ testimonials }}
            options={{
              onEdit: handleEditTestimonial,
              onDelete: handleDeleteTestimonial
            }}
          />
        </div>
        <br /> <br />
        {/* <div className="resource-page">
          <label>Meta Title*</label>
          <input type="text" placeholder="Enter meta title" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} />
          {errors.metaTitle && <p className="text-red-500 text-sm">{errors.metaTitle}</p>}
        </div>
        <br /> <br />
        <div className="resource-page">
          <label>Meta Description*</label>
          <textarea placeholder="Enter meta description" value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} />
          {errors.metaDescription && <p className="text-red-500 text-sm">{errors.metaDescription}</p>}
        </div> */}
        {/* <br /> <br /> */}
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
  label={loading ? "Updating..." : "Publish & Update"}
  iconName="document"
  variant="solid"
  className="flex-1 "
  disabled={loading}
/>

        </div>
      </form>
      <DraftModal
  open={draftModalOpen}
  setOpen={setDraftModalOpen}
  onConfirm={handleSaveDraft}
/>

    </div>
  );
}

function isValidVideoUrl(url) {
  // Simple regex for YouTube and Vimeo
  return (
    /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com)\/.+$/i.test(url)
  );
}

function VideoPreview({ url }) {
  let embedUrl = null;
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    // Extract YouTube video ID
    let id = '';
    if (url.includes('youtu.be/')) {
      id = url.split('youtu.be/')[1].split(/[?&]/)[0];
    } else {
      const match = url.match(/[?&]v=([^&]+)/);
      if (match) id = match[1];
    }
    if (id) embedUrl = `https://www.youtube.com/embed/${id}`;
  } else if (url.includes('vimeo.com')) {
    // Extract Vimeo video ID
    const match = url.match(/vimeo.com\/(\d+)/);
    if (match) embedUrl = `https://player.vimeo.com/video/${match[1]}`;
  }
  if (!embedUrl) return null;
  return (
    <iframe
      width="420"
      height="236"
      src={embedUrl}
      title="Video preview"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="rounded-lg border border-gray-300"
    />
  );
}
