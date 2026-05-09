"use client";

import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { useForm } from "react-hook-form";
import fbPixelStore from "@/store/fbPixelStore";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash2, Info } from "lucide-react";
import DeleteDialog from "@/components/utilityComponents/DeleteDialog/DeleteDialog";
import { toast } from "react-toastify";

export default function FbPixelId() {
  const snap = useSnapshot(fbPixelStore);
  const [editMode, setEditMode] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const updatedBy = snap?.auth?.user?.role || "super-admin";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { pixelId: "" } });

  useEffect(() => {
    fbPixelStore.getFbPixel();
  }, []);

  useEffect(() => {
    if (snap.fbPixel.data?._id) {
      reset({ pixelId: snap.fbPixel.data.pixelId });
      setEditMode(false);
    }
  }, [snap.fbPixel.data, reset]);

  if (snap.fbPixel.loading) {
    return <p>Loading…</p>;
  }

  const isExisting = !!snap.fbPixel.data?._id;

  const onAdd = handleSubmit(async (data) => {
    const payload = { pixelId: data.pixelId, updatedBy };
    const [, err] = await fbPixelStore.createFbPixel(payload);
    if (err) return toast.error(err);
    toast.success("Facebook Pixel ID added successfully!");
  });

  const onSave = handleSubmit(async (data) => {
    const id = snap.fbPixel.data?._id;
    const payload = { pixelId: data.pixelId, updatedBy };
    const [, err] = await fbPixelStore.updateFbPixel(id, payload);
    if (err) return toast.error(err);
    toast.success("Facebook Pixel ID updated successfully!");
    setEditMode(false);
  });

  const handleDelete = async () => {
    const id = snap.fbPixel.data?._id;
    const [, err] = await fbPixelStore.deleteFbPixel(id);
    if (err) return toast.error(err);
    reset({ pixelId: "" });
    toast.success("Deleted successfully!");
    setEditMode(false);
    setOpenDelete(false);
  };

  return (
    <div className="w-full space-y-2 border p-4 rounded">
      <div className="flex items-center gap-2">
        <label className="font-semibold text-sm">Facebook Pixel ID</label>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="inline-flex cursor-help text-gray-500 hover:text-gray-700 focus:outline-none">
              <Info className="w-4 h-4" aria-hidden />
            </span>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            The Facebook Pixel tracks visitor activity on your site for Meta
            Ads—conversion tracking, remarketing, and analytics. Enter your
            Pixel ID from Meta Events Manager so the site can send events to
            Facebook.
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <input
          {...register("pixelId", { required: true })}
          disabled={isExisting && !editMode}
          placeholder="1234567890123456"
          className={`border px-3 py-2 rounded w-full ${
            isExisting && !editMode ? "bg-gray-100 dark:bg-gray-800" : ""
          }`}
        />
        {!isExisting ? (
          <Button onClick={onAdd} className="cursor-pointer">Add</Button>
        ) : editMode ? (
          <Button onClick={onSave} className="cursor-pointer">Save</Button>
        ) : (
          <Button onClick={() => setEditMode(true)} className="cursor-pointer">
            Update
          </Button>
        )}
        {isExisting && !editMode && (
          <Trash2
            onClick={() => setOpenDelete(true)}
            className="cursor-pointer text-red-600"
            size={24}
          />
        )}
      </div>
      <DeleteDialog
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
