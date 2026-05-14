"use client";

import { useEffect, useState, useMemo } from "react";
import { CATable } from "@/components/utilityComponents/table/caTable/CATable";
import TablePagination from "@/components/utilityComponents/table/tablePagination/TablePagination";
import resourceStore from "@/store/resourceStore";
import { EditSvg } from "@/components/base/svgs/SvgIcon";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";

const ConsumerList = () => {
  const [allSubscribers, setAllSubscribers] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(100);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const [resourceNames, setResourceNames] = useState(["All"]);
  const [filterResource, setFilterResource] = useState("All");
  const [viewSubscriber, setViewSubscriber] = useState(null);

  const fetchSubscribers = async (p = 1) => {
    setLoading(true);
    setError(null);
    try {
      const query = `?page=${p}&limit=${limit}`;
      const [res, err] = await resourceStore.getAllSubscribers(query);
      if (err) {
        setSubscribers([]);
        setError(err);
      } else if (res) {
        const data = Array.isArray(res.data) ? [...res.data] : [];
        setSubscribers(data);
        setAllSubscribers(data);
        setResourceNames(["All", ...new Set(data.map((item) => item.resource_name))]);
        setTotal(res.total || data.length || 0);
        setTotalPages(Math.max(1, Math.ceil((res.total || res.count || data.length) / limit)));
        setError(null);
      } else {
        setSubscribers([]);
        setAllSubscribers([]);
        setError("No data");
      }
    } catch (e) {
      setSubscribers([]);
      setAllSubscribers([]);
      setError("Failed to fetch subscribers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSubscribers(page); }, [page]);

  useEffect(() => {
    if (filterResource === "All") {
      setSubscribers(allSubscribers);
    } else {
      setSubscribers(allSubscribers.filter((item) => item.resource_name === filterResource));
    }
  }, [filterResource]);

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div>{row.original.name || "N/A"}</div>,
    },
    {
      accessorKey: "email",
      header: "E-mail",
      cell: ({ row }) => <div>{row.original.email}</div>,
    },
    {
      accessorKey: "resource_name",
      header: "Resource",
      cell: ({ row }) => <div>{row.original.resource_name}</div>,
    },
    {
      accessorKey: "created_at",
      header: "Subscribed At",
      cell: ({ row }) => {
        const raw = row.original.created_at;
        let pretty = "N/A";
        if (raw) {
          try { pretty = new Date(raw).toLocaleString(); } catch (e) { pretty = raw; }
        }
        return <div>{pretty}</div>;
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="member-actions-cell">
          <button
            className="edit-btn"
            title="View details"
            onClick={() => setViewSubscriber(row.original)}
          >
            <EditSvg />
          </button>
        </div>
      ),
    },
  ];

  return (
    <section className="min-h-screen p-4">
      <div className="flex items-center justify-between mb-4 gap-4">
        <div className="flex items-center gap-3">
          <label className="mr-2 font-medium text-[#202124]">Filter by Resource:</label>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button
                className="inline-flex bg-white items-center gap-2 px-3 py-1 rounded-md border border-[#dadce0] shadow-sm text-[#202124]"
                aria-label="Select resource filter"
              >
                <span className="text-sm">{filterResource}</span>
                <ChevronDownIcon className="w-4 h-4" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                side="bottom"
                align="start"
                className="z-50 min-w-[160px] bg-white border border-[#dadce0] shadow-md rounded-md p-1"
              >
                <div className="max-h-60 overflow-auto">
                  {resourceNames.map((r) => (
                    <DropdownMenu.Item
                      key={r}
                      onSelect={(e) => {
                        e.preventDefault();
                        if (r === filterResource) return;
                        setFilterResource(r);
                      }}
                      className="flex items-center justify-between px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-[#e8f0fe] hover:text-[#4285F4]"
                    >
                      <span>{r}</span>
                      {r === filterResource && <CheckIcon className="w-4 h-4 text-[#4285F4]" />}
                    </DropdownMenu.Item>
                  ))}
                </div>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
        <span className="text-sm text-[#5f6368]">
          Total: <strong>{subscribers?.length || 0}</strong>
        </span>
      </div>

      {loading && <p className="text-[#5f6368]">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && <CATable columns={columns} data={subscribers} />}
      <TablePagination totalPage={totalPages} onPageChange={(p) => setPage(p)} currentPage={page} />

      {/* Detail modal */}
      <Dialog open={!!viewSubscriber} onOpenChange={(open) => { if (!open) setViewSubscriber(null); }}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Subscriber Details</DialogTitle>
          </DialogHeader>
          {viewSubscriber && (
            <div className="space-y-3 text-sm text-[#202124]">
              <div>
                <span className="text-[#5f6368] font-medium block">Name</span>
                <span>{viewSubscriber.name || "N/A"}</span>
              </div>
              <div>
                <span className="text-[#5f6368] font-medium block">Email</span>
                <span>{viewSubscriber.email}</span>
              </div>
              <div>
                <span className="text-[#5f6368] font-medium block">Resource</span>
                <span>{viewSubscriber.resource_name}</span>
              </div>
              <div>
                <span className="text-[#5f6368] font-medium block">Subscribed At</span>
                <span>{viewSubscriber.created_at ? new Date(viewSubscriber.created_at).toLocaleString() : "N/A"}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ConsumerList;
