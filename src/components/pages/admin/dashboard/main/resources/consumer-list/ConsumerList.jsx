"use client";

import { useEffect, useState, useMemo } from "react";
import { CATable } from "@/components/utilityComponents/table/caTable/CATable";
import TablePagination from "@/components/utilityComponents/table/tablePagination/TablePagination";
import resourceStore from "@/store/resourceStore";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { DotsVerticalSvg, EditSvg, TrashSvg } from "@/components/base/svgs/SvgIcon";

const ConsumerList = () => {
  const [allSubscribers, setAllSubscribers] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(100);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);

  const [resourceNames, setResourceNames] = useState(['All']);
  const [filterResource, setFilterResource] = useState("All");

  const [bgColor, setBgColor] = useState("#ffffff"); // default light
  const textColor = useMemo(() => (bgColor === "#191919" ? "text-white" : "text-[#191919]"), [bgColor]);

  function setNames(arr) {
    setResourceNames(arr);
  }

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
        setSubscribers(Array.isArray(res.data) ? [...res.data] : []);
        setAllSubscribers(Array.isArray(res.data) ? [...res.data] : []);
        setNames(["All", ...new Set(res.data.map((item) => item.resource_name))]);
        setTotal(res.total || (res.data && res.data.length) || 0);
        setTotalPages(Math.max(1, Math.ceil((res.total || res.count || (res.data || []).length) / limit)));
        setError(null);
      } else {
        setSubscribers([]);
        setAllSubscribers([]);
        setError("No data");
      }
    } catch (e) {
      console.error("fetchSubscribers error:", e);
      setSubscribers([]);
      setAllSubscribers([]);
      setError("Failed to fetch subscribers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers(page);
  }, [page]);

  useEffect(() => {
    if (filterResource === "All") {
      setSubscribers(allSubscribers);
    } else {
      setSubscribers(allSubscribers.filter((item) => item.resource_name === filterResource));
    }
  }, [filterResource]);

  const displayed = useMemo(() => subscribers, [subscribers]);

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div className={`resource-name-cell ${textColor}`}>{row.original.name || "N/A"}</div>,
    },
    {
      accessorKey: "email",
      header: "E-mail",
      cell: ({ row }) => <div className={`resource-name-cell ${textColor}`}>{row.original.email}</div>,
    },
    {
      accessorKey: "resource_name",
      header: "Resource",
      cell: ({ row }) => <div className={`resource-name-cell ${textColor}`}>{row.original.resource_name}</div>,
    },
    {
      accessorKey: "created_at",
      header: "Subscribed At",
      cell: ({ row }) => {
        const raw = row.original.created_at;
        let pretty = "N/A";
        if (raw) {
          try {
            pretty = new Date(raw).toLocaleString();
          } catch (e) {
            pretty = raw;
          }
        }
        return <div className={`subscribed-at-cell ${textColor}`}>{pretty}</div>;
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="member-actions-cell flex gap-2">
          <button className="edit-btn">
            <EditSvg />
          </button>
          <button className="menu-btn">
            <DotsVerticalSvg />
          </button>
          <button className="delete-btn">
            <TrashSvg />
          </button>
        </div>
      ),
    },
  ];

  return (
    <section
      className="min-h-screen p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex items-center justify-between mb-4 gap-4">
        <div className="flex items-center gap-3">
          <label className={`mr-2 font-medium ${textColor}`}>Filter by Resource:</label>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button
                className={`inline-flex bg-light items-center gap-2 px-3 py-1 rounded-md border shadow-sm ${textColor}`}
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
                className="z-50 min-w-[160px] bg-light shadow-md rounded-md p-1"
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
                      className="flex items-center justify-between px-3 py-2 text-sm rounded-md cursor-pointer hover:opacity-80"
                    >
                      <span>{r}</span>
                      {r === filterResource ? <CheckIcon className="w-4 h-4 text-green-500" /> : null}
                    </DropdownMenu.Item>
                  ))}
                </div>
                <DropdownMenu.Arrow className="fill-white" />
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>

        <div className={textColor}>
          <span className="text-md pr-4">
            Total: <strong>{subscribers?.length || 0}</strong>
          </span>
        </div>
      </div>

      <CATable columns={columns} data={displayed} />
      <TablePagination totalPage={totalPages} onPageChange={(p) => setPage(p)} currentPage={page} />
    </section>
  );
};

export default ConsumerList;
