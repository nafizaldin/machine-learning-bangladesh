"use client";

import { TrashSvg } from "@/components/base/svgs/SvgIcon";
import { CATable } from "@/components/utilityComponents/table/caTable/CATable";
import TablePagination from "@/components/utilityComponents/table/tablePagination/TablePagination";
import { useSnapshot } from "valtio";
import utilStore from "@/store/utilStore";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DeleteDialog from "@/components/utilityComponents/DeleteDialog/DeleteDialog";
import { toast } from "react-toastify";
import { Send as SendIcon } from "lucide-react";

const ContactLists = () => {
  const utilsSnap = useSnapshot(utilStore);
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [replyContact, setReplyContact] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [sendingReply, setSendingReply] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchContacts = async (p = 1, limit = 100) => {
    setError(null);
    setLoading(true);
    try {
      const query = `page=${p}&limit=${limit}`;
      const [res, err] = await utilStore.getAllContacts(query);
      if (err) {
        setContacts([]);
        setError(err);
      } else if (res) {
        setContacts(Array.isArray(res.data) ? [...res.data] : []);
        setError(null);
      } else {
        setContacts([]);
        setError("No data");
      }
    } catch (e) {
      console.error("fetchContacts error:", e);
      setContacts([]);
      setError("Failed to fetch contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleReadToggle = async (contact) => {
    const [updated, err] = await utilStore.updateContactRead(contact._id, !contact.read);
    if (err) {
      toast.error(err);
      return;
    }
    setContacts((prev) =>
      prev.map((c) => (c._id === contact._id ? { ...c, read: updated?.read ?? !contact.read } : c))
    );
  };

  const openReplyModal = async (contact) => {
    setReplyContact(contact);
    setReplyModalOpen(true);
    setReplyMessage("");
    const [data, err] = await utilStore.getContactById(contact._id);
    if (err) {
      toast.error(err);
      return;
    }
    setReplyContact(data);
  };

  const handleSendReply = async () => {
    if (!replyContact?._id || !replyMessage.trim()) return;
    setSendingReply(true);
    const [updated, err] = await utilStore.replyToContact(replyContact._id, replyMessage.trim());
    if (err) {
      toast.error(err);
      setSendingReply(false);
      return;
    }
    toast.success("Reply sent by email.");
    setReplyContact(updated);
    setReplyMessage("");
    setContacts((prev) =>
      prev.map((c) =>
        c._id === replyContact._id
          ? { ...c, replies: updated?.replies ?? c.replies, read: updated?.read ?? true }
          : c
      )
    );
    setSendingReply(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const [_, err] = await utilStore.deleteContact(deleteId);
    if (err) toast.error(err);
    else {
      toast.success("Contact deleted.");
      setContacts((prev) => prev.filter((c) => c._id !== deleteId));
    }
    setDeleteId(null);
  };

  const columns = [
    {
      accessorKey: "read",
      header: "Read",
      cell: ({ row }) => {
        const c = row.original;
        return (
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="checkbox"
              checked={!!c.read}
              onChange={() => handleReadToggle(c)}
              className="rounded border-gray-300"
            />
          </label>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div>{row.original.name}</div>,
    },
    {
      accessorKey: "contact",
      header: "Contact",
      cell: ({ row }) => <div>{row.original.contact || "N/A"}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div>{row.original.email}</div>,
    },
    {
      accessorKey: "interest",
      header: "Interest",
      cell: ({ row }) => <div>{row.original.interest || "—"}</div>,
    },
    {
      accessorKey: "message",
      header: "Message",
      cell: ({ row }) => (
        <div className="max-w-md py-2 max-h-20 overflow-y-auto text-sm">
          {row.original.message}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => (
        <div className="text-sm">{new Date(row.original.createdAt).toLocaleString()}</div>
      ),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const c = row.original;
        return (
          <div className="member-actions-cell flex items-center gap-2">
            <button
              type="button"
              onClick={() => openReplyModal(c)}
              className="inline-flex items-center gap-1 px-2 py-1 text-sm border rounded hover:bg-gray-100"
              title="Reply"
            >
              <SendIcon className="w-4 h-4" />
              Reply
            </button>
            <button
              type="button"
              onClick={() => setDeleteId(c._id)}
              className="text-red-600 hover:bg-red-50 p-1 rounded"
              title="Delete"
            >
              <TrashSvg />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <section className="min-h-screen">
      <CATable
        columns={columns}
        data={contacts}
        getRowClassName={(row) =>
          row.original.read ? "bg-emerald-50/90" : ""
        }
      />
      <br />
      <TablePagination totalPage={"2"} />

      {/* Reply modal – messenger-style thread */}
      <Dialog open={replyModalOpen} onOpenChange={setReplyModalOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>
              Reply to {replyContact?.name} ({replyContact?.email})
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col flex-1 min-h-0">
            {/* Thread: user message left, admin replies right */}
            <div className="flex-1 overflow-y-auto space-y-3 py-2 border rounded-lg p-3 bg-gray-50/50 min-h-[200px]">
              {/* User's original message – left */}
              {replyContact && (
                <>
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-lg bg-gray-200 px-3 py-2 text-sm">
                      <p className="font-medium text-gray-600 text-xs">
                        {replyContact.name} · {new Date(replyContact.createdAt).toLocaleString()}
                      </p>
                      <p className="whitespace-pre-wrap mt-1">{replyContact.message}</p>
                    </div>
                  </div>
                  {/* Admin replies – right */}
                  {(replyContact.replies || []).map((r, i) => (
                    <div key={i} className="flex justify-end">
                      <div className="max-w-[85%] rounded-lg bg-blue-100 px-3 py-2 text-sm">
                        <p className="font-medium text-blue-800 text-xs">
                          {r.sentBy} · {new Date(r.sentAt).toLocaleString()}
                        </p>
                        <p className="whitespace-pre-wrap mt-1">{r.body}</p>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
            {/* Compose reply – bottom */}
            <div className="flex gap-2 mt-3">
              <textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Type your reply…"
                className="flex-1 min-h-[80px] border rounded-md px-3 py-2 text-sm resize-y"
                disabled={sendingReply}
              />
              <Button
                type="button"
                onClick={handleSendReply}
                disabled={!replyMessage.trim() || sendingReply}
                className="self-end shrink-0"
              >
                <SendIcon className="w-4 h-4 mr-1" />
                {sendingReply ? "Sending…" : "Send"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <DeleteDialog
        open={!!deleteId}
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete this contact?"
        description="This action cannot be undone."
      />
    </section>
  );
};

export default ContactLists;
