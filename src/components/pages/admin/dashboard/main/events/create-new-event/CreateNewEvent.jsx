"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ImageUpload from "@/components/utilityComponents/imageUpload/ImgaeUpload";
import TagsInput from "@/components/utilityComponents/tags/Tags";
import FlexibleButton from "@/components/utilityComponents/customBtns/FlexibleButton";
import $axios from "@/_api/axios";
import eventStore from "@/store/eventStore";

const EVENT_TAGS = ["Competition", "Workshop", "Seminar", "Study Group"];
const EVENT_STATUSES = ["upcoming", "past", "draft"];

export default function CreateNewEvent() {
  const router = useRouter();

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

  const onDrop = useCallback(async (files) => {
    if (!files.length) return;
    const file = files[0];
    if (file.size > 4 * 1024 * 1024) {
      toast.error("Image size must not exceed 4MB");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setImagePreview(reader.result);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await $axios.post("/v1/media/image", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
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

    const payload = {
      title,
      summary,
      description,
      date,
      tag,
      status,
      platform,
      registrationLink,
      participants,
      highlights,
      featuredImage,
    };

    const [data, error] = await eventStore.createEvent(payload);
    setLoading(false);
    if (data) {
      toast.success("Event created successfully!");
      router.push("/admin/events/event-list");
    } else {
      toast.error(error || "Failed to create event");
    }
  };

  const inputClass = "w-full border border-[#dadce0] rounded-lg px-3 py-2.5 text-sm text-[#202124] focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent";
  const labelClass = "block text-sm font-medium text-[#202124] mb-1.5";
  const errClass = "text-[#EA4335] text-xs mt-1";

  return (
    <div className="bg-white p-6 rounded-xl border border-[#dadce0]">
      <h2 className="text-xl font-semibold text-[#202124] mb-6">Create New Event</h2>

      <form onSubmit={onSubmit} className="flex flex-col gap-6">

        {/* Title */}
        <div>
          <label className={labelClass}>Event Title *</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. ML Olympiad 2025" className={inputClass} />
          {errors.title && <p className={errClass}>{errors.title}</p>}
        </div>

        {/* Tag + Status row */}
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

        {/* Date + Platform row */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className={labelClass}>Date *</label>
            <input type="text" value={date} onChange={e => setDate(e.target.value)} placeholder="e.g. March 2025" className={inputClass} />
            {errors.date && <p className={errClass}>{errors.date}</p>}
          </div>
          <div className="flex-1">
            <label className={labelClass}>Platform</label>
            <input type="text" value={platform} onChange={e => setPlatform(e.target.value)} placeholder="e.g. Kaggle, Online, In-Person" className={inputClass} />
          </div>
        </div>

        {/* Registration Link + Participants */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className={labelClass}>Registration Link</label>
            <input type="url" value={registrationLink} onChange={e => setRegistrationLink(e.target.value)} placeholder="https://..." className={inputClass} />
          </div>
          <div className="flex-1">
            <label className={labelClass}>Participants</label>
            <input type="text" value={participants} onChange={e => setParticipants(e.target.value)} placeholder="e.g. 300+" className={inputClass} />
          </div>
        </div>

        {/* Featured Image */}
        <div>
          <label className={labelClass}>Event Banner Image</label>
          <ImageUpload
            label="Drop event banner (16:9 recommended)"
            height="h-40"
            onDrop={onDrop}
            preview={imagePreview}
            rounded="rounded-lg"
            aspectRatio="16:9"
            recommendedDimensions="1200×675 px"
          />
        </div>

        {/* Summary */}
        <div>
          <label className={labelClass}>Summary * <span className="text-[#5f6368] font-normal">(shown on cards)</span></label>
          <textarea
            rows={3}
            value={summary}
            onChange={e => setSummary(e.target.value)}
            placeholder="Short description shown on event cards"
            className={inputClass}
          />
          {errors.summary && <p className={errClass}>{errors.summary}</p>}
        </div>

        {/* Description */}
        <div>
          <label className={labelClass}>Full Description</label>
          <textarea
            rows={5}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Detailed event description"
            className={inputClass}
          />
        </div>

        {/* Highlights */}
        <div>
          <label className={labelClass}>Highlights <span className="text-[#5f6368] font-normal">(press Enter to add)</span></label>
          <TagsInput onChange={setHighlights} />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <FlexibleButton
            label={loading ? "Creating..." : "Create Event"}
            variant="solid"
            className="flex-1"
            type="submit"
          />
          <FlexibleButton
            label="Cancel"
            variant="outline"
            className="flex-1"
            onClick={() => router.push("/admin/events/event-list")}
          />
        </div>
      </form>
    </div>
  );
}
