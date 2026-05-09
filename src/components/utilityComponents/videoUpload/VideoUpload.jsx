import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";

export default function VideoUpload({
  label = "Upload Video",
  onDrop,
  preview,
  accept = "video/*",
}) {
  const { getRootProps, isDragActive, getInputProps } = useDropzone({
    onDrop,
    accept: { [accept]: [] },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`w-full border border-gray-700 flex flex-col items-center justify-center h-60 rounded-4xl cursor-pointer relative p-4 ${
        isDragActive ? "border-blue-500 bg-blue-50" : ""
      }`}
    >
      <input {...getInputProps()} />
      {preview ? (
        <video
          src={preview}
          controls
          className="h-full w-full object-contain"
        />
      ) : (
        <div className="flex gap-1 items-center text-gray-400">
          <p className="text-[0.875rem]">{label}</p>
          <Upload size={16} />
        </div>
      )}
    </div>
  );
}
