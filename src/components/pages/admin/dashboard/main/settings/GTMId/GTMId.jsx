"use client";

import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { useForm } from "react-hook-form";
import gtmStore from "@/store/gtmStore";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash2, Info } from "lucide-react";
import DeleteDialog from "@/components/utilityComponents/DeleteDialog/DeleteDialog";
import { toast } from "react-toastify";

export default function GtmId() {
  const snap = useSnapshot(gtmStore);

  const [editMode, setEditMode] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const updatedBy = snap?.auth?.user?.role || "super-admin";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { gtmId: "" } });


  useEffect(() => {
    gtmStore.getGtm();
  }, []);


useEffect(() => {
  if (snap.gtm.data?._id) {
    reset({ gtmId: snap.gtm.data.gtmId }); 
    setEditMode(false);
  }
}, [snap.gtm.data]);



  if (snap.gtm.loading) {
    return <p>Loading…</p>;
  }

  const isExisting = !!snap.gtm.data?._id;


  const onAdd = handleSubmit(async (data) => {
    const payload = { gtmId: data.gtmId, updatedBy };
    const [res, err] = await gtmStore.createGtm(payload);

    if (err) return toast.error(err);
    toast.success("GTM ID Added Successfully!");
  });

  const onSave = handleSubmit(async (data) => {
    const id = snap.gtm.data?._id;
    const payload = { gtmId: data.gtmId, updatedBy };

    const [res, err] = await gtmStore.updateGtm(id, payload);

    if (err) return toast.error(err);
    toast.success("GTM ID Updated Successfully!");
    setEditMode(false);
  });

  const handleDelete = async () => {
    const id = snap.gtm.data?._id;

    const [res, err] = await gtmStore.deleteGtm(id);
    if (err) return toast.error(err);

    reset({ gtmId: "" });
    toast.success("Deleted Successfully!");
    setEditMode(false);
    setOpenDelete(false);
  };

  return (
    <div className="w-full space-y-2 border p-4 rounded">
      <div className="flex items-center gap-2">
        <label className="font-semibold text-sm">Google Tag Manager ID</label>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="inline-flex cursor-help text-gray-500 hover:text-gray-700 focus:outline-none">
              <Info className="w-4 h-4" aria-hidden />
            </span>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            Google Tag Manager lets you manage and deploy marketing tags (e.g.
            analytics, conversion tracking) from one place without editing site
            code. Enter your GTM container ID (e.g. GTM-XXXXXX) so the site can
            load your container.
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <input
          {...register("gtmId", { required: true })}
          disabled={isExisting && !editMode}
          placeholder="GTM-XXXXXX"
          className={`border px-3 py-2 rounded w-full ${
            isExisting && !editMode ? "bg-gray-100" : ""
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
