"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";

/**
 * Format aspect ratio from dimensions for display (e.g. 1920×823 → "2.33:1")
 */
function formatAspectRatio(w, h) {
  if (!w || !h) return null;
  const r = w / h;
  if (r >= 1) return `${r.toFixed(2)}:1`;
  return `1:${(1 / r).toFixed(2)}`;
}

export default function ImageUpload({
  label = "Upload Image",
  onDrop,
  preview,
  accept = "image/*",
  height = "h-60",
  rounded = "rounded-4xl",
  aspectRatio = null,
  recommendedDimensions = null,
}) {
  const [uploadedDimensions, setUploadedDimensions] = useState(null);

  useEffect(() => {
    if (!preview) setUploadedDimensions(null);
  }, [preview]);

  const handleImageLoad = useCallback((e) => {
    const img = e.target;
    if (img?.naturalWidth && img?.naturalHeight) {
      setUploadedDimensions({ w: img.naturalWidth, h: img.naturalHeight });
    }
  }, []);

  const handleDrop = useCallback(
    (acceptedFiles, rejectedFiles, event) => {
      setUploadedDimensions(null);
      onDrop?.(acceptedFiles, rejectedFiles, event);
    },
    [onDrop]
  );

  const { getRootProps, isDragActive, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: accept ? { [accept]: [] } : undefined,
    multiple: false,
  });

  const hintText =
    aspectRatio && recommendedDimensions
      ? ` (${aspectRatio}, ${recommendedDimensions})`
      : "";
  const displayLabel = `${label}${hintText}`;

  return (
    <div className="w-full flex flex-col gap-1">
      <div
        {...getRootProps()}
        className={`w-full border border-gray-700 flex flex-col items-center justify-center rounded-4xl ${height} cursor-pointer relative p-4 ${
          isDragActive ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20" : ""
        }`}
      >
        <input {...getInputProps()} />
        {preview ? (
          <img
            src={preview}
            alt="preview"
            className="h-full w-full object-contain"
            onLoad={handleImageLoad}
          />
        ) : (
          <div className="flex gap-1 items-center text-gray-400">
            <p className="text-[0.875rem]">{displayLabel}</p>
            <Upload size={16} />
          </div>
        )}
      </div>
      {preview && (
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {uploadedDimensions ? (
            <span>
              Uploaded: {uploadedDimensions.w}×{uploadedDimensions.h} px
              {formatAspectRatio(uploadedDimensions.w, uploadedDimensions.h) && (
                <> ({formatAspectRatio(uploadedDimensions.w, uploadedDimensions.h)})</>
              )}
            </span>
          ) : (
            <span>Loading dimensions…</span>
          )}
        </div>
      )}
      {!preview && aspectRatio && recommendedDimensions && (
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Recommended: {aspectRatio}, {recommendedDimensions}
        </div>
      )}
    </div>
  );
}
