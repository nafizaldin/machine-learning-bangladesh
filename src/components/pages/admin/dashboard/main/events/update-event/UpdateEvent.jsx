"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import ImageUpload from "@/components/utilityComponents/imageUpload/ImgaeUpload";
import TagsInput from "@/components/utilityComponents/tags/Tags";
import FlexibleButton from "@/components/utilityComponents/customBtns/FlexibleButton";
import $axios from "@/_api/axios";
import eventStore from "@/store/eventStore";

const EVENT_TAGS = ["Competition", "Workshop", "Seminar", "Study Group"];
const EVENT_STATUSES = ["upcoming", "past", "draft"];

export default function UpdateEvent() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id || "";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [tag, setTag] = useState("");
  const [status, setStatus] = useState("upcoming");
  const [platform, setPlatform] = useState("");
  const [registrationLink, setRegistrationLink] = useState("");
  const [participants, setParticipants] = useState("");
  const [highlights, setHighlights] = useState([]);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [triggerer, setTriggerer] = useState(0);

  useEffect(() => {
    if (!id) return;
    (async () => {
      setFetching(true);
      const [data, err] = await eventStore.getEvent(id);
      if (err) { toast.error("Failed to load event"); setFetching(false); return; }
      setTitle(data.title || "");
      setSummary(data.summary || "");
      setDescription(data.description || "");
      setDate(data.date || "");
      setTag(data.tag || "");
      setStatus(data.status || "upcoming");
      setPlatform(data.platform || "");
      setRegistrationLink(data.registrationLink || "");
      setParticipants(data.participants || "");
      setHighlights(data.highlights || []);
      setFeaturedImage(data.featuredImage || null);
      if (data.featuredImage) setImagePreview(`${baseUrl}${data.featuredImage}`);
      setFetching(false);
      setTimeout(() => setTriggerer(t => t + 1), 100);
    })();
  }, [id, baseUrl]);

  const onDrop = useCallback(async (files) => {
    if (!files.length) return;
    const file = files[0];
    if (file.size > 4 * 1024 * 1024) { toast.error("Image must be under 4MB"); return; }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setImagePreview(reader.result);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await $axios.post("/v1/media/image", fd, { headers: { "Content-Type": "multipart/form-data" } });
      if (res.data.success) setFeaturedImage(res.data.path);
      else throw new Error();
    } catch {
      setImagePreview(null);
      setFeaturedImage(null);
      toast.error("Failed to upload image");
    }
  }, []);

  const validate = () => {
    const e = {};
    if (!title || title.length < 3) e.title = "Title must be at least 3 characters";
    if (!summary || summary.length < 10) e.summary = "Summary must be at least 10 characters";
    if (!tag) e.tag = "Event type is required";
    if (!date) e.date = "Date is required";
    return e;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    const payload = { title, summary, description, date, tag, status, platform, registrationLink, participants, highlights, featuredImage };
    const [data, error] = await eventStore.updateEvent(id, payload);
    setLoading(false);
    if (data) { toast.success("Event updated!"); router.push("/admin/events/event-list"); }
    else toast.error(error || "Failed to update event");
  };

  const inputClass = "w-full border border-[#dadce0] rounded-lg px-3 py-2.5 text-sm text-[#202124] focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent";
  const labelClass = "block text-sm font-medium text-[#202124] mb-1.5";
  const errClass = "text-[#EA4335] text-xs mt-1";

  if (fetching) return <div className="p-8 text-[#5f6368]">Loading event...</div>;

  return (
    <div className="bg-white p-6 rounded-xl border border-[#dadce0]">
      <h2 className="text-xl font-semibold text-[#202124] mb-6">Update Event</h2>

      <form onSubmit={onSubmit} className="flex flex-col gap-6">

        <div>
          <label className={labelClass}>Event Title *</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} className={inputClass} />
          {errors.title && <p className={errClass}>{errors.title}</p>}
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className={labelClass}>Event Type *</label>
            <select value={tag} onChange={e => setTag(e.target.value)} className={inputClass}>
              <option value="">Select type</option>
              {EVENT_TAGS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            {errors.tag && <p className={errClass}>{errors.tag}</p>}
          </div>
          <div className="flex-1">
            <label className={labelClass}>Status</label>
            <select value={status} onChange={e => setStatus(e.target.value)} className={inputClass}>
              {EVENT_STATUSES.map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className={labelClass}>Date *</label>
            <input type="text" value={date} onChange={e => setDate(e.target.value)} className={inputClass} />
            {errors.date && <p className={errClass}>{errors.date}</p>}
          </div>
          <div className="flex-1">
            <label className={labelClass}>Platform</label>
            <input type="text" value={platform} onChange={e => setPlatform(e.target.value)} className={inputClass} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className={labelClass}>Registration Link</label>
            <input type="url" value={registrationLink} onChange={e => setRegistrationLink(e.target.value)} className={inputClass} />
          </div>
          <div className="flex-1">
            <label className={labelClass}>Participants</label>
            <input type="text" value={participants} onChange={e => setParticipants(e.target.value)} className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Event Banner Image</label>
          <ImageUpload label="Drop event banner" height="h-40" onDrop={onDrop} preview={imagePreview} rounded="rounded-lg" aspectRatio="16:9" recommendedDimensions="1200×675 px" />
        </div>

        <div>
          <label className={labelClass}>Summary *</label>
          <textarea rows={3} value={summary} onChange={e => setSummary(e.target.value)} className={inputClass} />
          {errors.summary && <p className={errClass}>{errors.summary}</p>}
        </div>

        <div>
          <label className={labelClass}>Full Description</label>
          <textarea rows={5} value={description} onChange={e => setDescription(e.target.value)} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Highlights <span className="text-[#5f6368] font-normal">(press Enter to add)</span></label>
          <TagsInput key={triggerer} onChange={setHighlights} prefillValue={highlights} />
        </div>

        <div className="flex gap-3 pt-2">
          <FlexibleButton label={loading ? "Saving..." : "Update Event"} variant="solid" className="flex-1" />
          <FlexibleButton label="Cancel" variant="outline" className="flex-1" onClick={() => router.push("/admin/events/event-list")} />
        </div>
      </form>
    </div>
  );
}
