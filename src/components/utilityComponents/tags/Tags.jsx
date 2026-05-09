import { useState } from "react";
import { X } from "lucide-react";

export default function TagsInput({ placeholder = "Add Tags", onChange, prefillValue = [] }) {
  const [tags, setTags] = useState(prefillValue?.length ? prefillValue : []);
  const [inputValue, setInputValue] = useState("");

  const addTag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      const newTags = [...tags, inputValue.trim()];
      setTags(newTags);
      if (onChange) onChange(newTags);
    }
    setInputValue("");
  };

  const removeTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    if (onChange) onChange(newTags);
  };

  return (
   <div className="flex flex-wrap items-center gap-2 border border-[#3F3D56] rounded-full px-3 py-2 text-[#B6B3C5]">

  {tags.map((tag, index) => (
    <span
      key={index}
      className="flex items-center gap-1 bg-[#f3f3f3] text-primary px-3 py-2 rounded-full text-sm h-[32px]"
    >
      {tag}
      <button
        type="button"
        onClick={() => removeTag(index)}
        className="hover:text-secondary cursor-pointer"
      >
        <X size={14} />
      </button>
    </span>
  ))}

  <input
    type="text"
    placeholder={placeholder}
    className="bg-transparent text-primary outline-none text-sm px-2 py-2 leading-none h-[32px]"
    value={inputValue}
    onChange={(e) => setInputValue(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && addTag(e)}
  />

</div>

  );
}
