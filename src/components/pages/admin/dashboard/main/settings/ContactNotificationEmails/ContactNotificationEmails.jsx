"use client";

import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import contactNotificationEmailStore from "@/store/contactNotificationEmailStore";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash2, Mail, Info } from "lucide-react";
import DeleteDialog from "@/components/utilityComponents/DeleteDialog/DeleteDialog";
import { toast } from "react-toastify";

export default function ContactNotificationEmails() {
  const snap = useSnapshot(contactNotificationEmailStore);
  const [emailInput, setEmailInput] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    contactNotificationEmailStore.getList();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const email = emailInput.trim();
    if (!email) {
      toast.error("Please enter an email address.");
      return;
    }
    const [_, err] = await contactNotificationEmailStore.addEmail(email);
    if (err) {
      toast.error(err);
      return;
    }
    toast.success("Verification email sent. Ask the recipient to check their inbox and click the link to start receiving contact form notifications.");
    setEmailInput("");
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const [_, err] = await contactNotificationEmailStore.deleteEmail(deleteId);
    if (err) toast.error(err);
    else toast.success("Email removed from notifications.");
    setDeleteId(null);
  };

  return (
    <div className="w-full space-y-4 h-full border p-4 rounded">
      <div className="flex items-center gap-2">
        <Mail className="w-5 h-5 text-gray-600" />
        <label className="font-semibold text-sm">
          Contact form notification emails
        </label>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="inline-flex cursor-help text-gray-500 hover:text-gray-700 focus:outline-none">
              <Info className="w-4 h-4" aria-hidden />
            </span>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            When someone submits the Contact Us form, a copy of their message is
            emailed to every verified address listed here. Add an email and we
            send a verification link; once they click it, that address is
            whitelisted and will receive future submissions.
          </TooltipContent>
        </Tooltip>
      </div>
      <p className="text-xs text-gray-500">
        Add emails that will receive a copy of each contact form submission. Each email must verify via the link we send before it is whitelisted.
      </p>

      <form onSubmit={handleAdd} className="flex items-center gap-2">
        <input
          type="email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          placeholder="admin@example.com"
          className="border px-3 py-2 rounded flex-1 text-sm"
          disabled={snap.adding}
        />
        <Button type="submit" disabled={snap.adding} className="cursor-pointer">
          {snap.adding ? "Sending…" : "Add & send verification"}
        </Button>
      </form>

      {snap.loading ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : snap.list.length === 0 ? (
        <p className="text-sm text-gray-500">No notification emails added yet.</p>
      ) : (
        <ul className="space-y-2">
          {snap.list.map((item) => (
            <li
              key={item._id}
              className="flex items-center justify-between gap-2 py-2 border-b border-gray-100 last:border-0"
            >
              <span className="text-sm truncate flex-1">{item.email}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded shrink-0 ${
                  item.verified
                    ? "bg-green-100 text-green-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {item.verified ? "Verified" : "Pending verification"}
              </span>
              <Trash2
                onClick={() => setDeleteId(item._id)}
                className="cursor-pointer text-red-600 shrink-0"
                size={18}
              />
            </li>
          ))}
        </ul>
      )}

      <DeleteDialog
        open={!!deleteId}
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
