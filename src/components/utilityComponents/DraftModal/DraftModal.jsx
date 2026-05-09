"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function DraftModal({ open, onClose, onConfirm }) {
  const [note, setNote] = useState("");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Save as Draft</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-gray-600 mb-2">
          You can save it as a draft and publish it later.
        </p>

        {/* <Textarea
          placeholder="Optional note (e.g. pending review)…"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="min-h-[80px]"
        /> */}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button
            onClick={() => {
              onConfirm(note);
              setNote("");
            }}
          >
            Save Draft
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
