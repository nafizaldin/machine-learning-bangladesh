"use client";

import { TrashSvg } from "@/components/base/svgs/SvgIcon";
import { CATable } from "@/components/utilityComponents/table/caTable/CATable";
import TablePagination from "@/components/utilityComponents/table/tablePagination/TablePagination";
import utilStore from "@/store/utilStore";
import { useEffect, useState } from "react";
import DeleteDialog from "@/components/utilityComponents/DeleteDialog/DeleteDialog";
import { toast } from "react-toastify";

const SubscriberList = () => {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchSubscribers = async (p = 1, limit = 100) => {
    setError(null);
    setLoading(true);
    try {
      const query = `?page=${p}&limit=${limit}`;
      const [res, err] = await utilStore.getAllNewsletterSubscribers(query);
      if (err) {
        setMembers([]);
        setError(err);
      } else if (res?.data) {
        setMembers(Array.isArray(res.data) ? [...res.data] : []);
        setError(null);
      } else {
        setMembers([]);
        setError("No data");
      }
    } catch (e) {
      console.error("fetchSubscribers error:", e);
      setMembers([]);
      setError("Failed to fetch subscribers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleReadToggle = async (member) => {
    const [updated, err] = await utilStore.updateNewsletterRead(member._id, !member.read);
    if (err) {
      toast.error(err);
      return;
    }
    setMembers((prev) =>
      prev.map((m) => (m._id === member._id ? { ...m, read: updated?.read ?? !member.read } : m))
    );
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const [_, err] = await utilStore.deleteNewsletter(deleteId);
    if (err) toast.error(err);
    else {
      toast.success("Subscriber removed.");
      setMembers((prev) => prev.filter((m) => m._id !== deleteId));
    }
    setDeleteId(null);
  };

  const columns = [
    {
      accessorKey: "read",
      header: "Read",
      cell: ({ row }) => {
        const m = row.original;
        return (
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="checkbox"
              checked={!!m.read}
              onChange={() => handleReadToggle(m)}
              className="rounded border-gray-300"
            />
          </label>
        );
      },
    },
    {
      accessorKey: "email",
      header: "E-mail",
      cell: ({ row }) => (
        <div className="member-email-cell">{row.original.email}</div>
      ),
    },
    {
      accessorKey: "subscribedAt",
      header: "Subscribed",
      cell: ({ row }) => (
        <div className="text-sm">
          {row.original.subscribedAt
            ? new Date(row.original.subscribedAt).toLocaleString()
            : "—"}
        </div>
      ),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const m = row.original;
        return (
          <div className="member-actions-cell">
            <button
              type="button"
              onClick={() => setDeleteId(m._id)}
              className="delete-btn text-red-600 hover:bg-red-50 p-1 rounded"
              title="Remove subscriber"
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
        data={members}
        getRowClassName={(row) =>
          row.original.read ? "bg-sky-50/90" : ""
        }
      />
      <br />
      <TablePagination totalPage={"2"} />

      <DeleteDialog
        open={!!deleteId}
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Remove this subscriber?"
        description="They will be removed from the newsletter list. This action cannot be undone."
      />
    </section>
  );
};

export default SubscriberList;
