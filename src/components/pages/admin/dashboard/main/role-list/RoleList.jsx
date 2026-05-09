"use client";

import { useEffect, useState } from "react";
import { DotsVerticalSvg, EditSvg, TrashSvg } from "@/components/base/svgs/SvgIcon";
import { CATable } from "@/components/utilityComponents/table/caTable/CATable";
import TablePagination from "@/components/utilityComponents/table/tablePagination/TablePagination";
import utilStore from "@/store/utilStore";
import { useSnapshot } from "valtio";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CheckIcon } from "@radix-ui/react-icons";
import { toast } from "react-toastify";

const ROLE_ENUMS = [
  { value: "admin", name: "Admin" },
  { value: "user", name: "User" },
  { value: "account_department", name: "Account Dept" },
  { value: "publisher_department", name: "Publisher Dept" },
  { value: "content_creator", name: "Content Creator" },
  { value: "marketer", name: "Marketer" },
];

const RoleList = () => {
  const utilsSnap = useSnapshot(utilStore);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch users
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    const [res, err] = await utilStore.usersForRoleList();
    if (err) {
      setError(err);
      setUsers([]);
    } else if (res) {
      const arr = Array.isArray(res.data) ? res.data : [];
      setUsers(arr);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Update role with optimistic UI
  const handleRoleChange = async (userId, newRole) => {
    const id = userId;
    // store previous role for rollback
    const prevUser = users.find(u => (u.id || u._id) === id);
    const prevRole = prevUser?.role || "user";

    // optimistic update
    setUsers(prev => prev.map(u => ((u.id || u._id) === id ? { ...u, role: newRole } : u)));

    const [res, err] = await utilStore.updateUserRole(id, { role: newRole });
    if (err) {
      console.error("updateUserRole error:", err);
      // rollback
      setUsers(prev => prev.map(u => ((u.id || u._id) === id ? { ...u, role: prevRole } : u)));
      setError(err);
      setTimeout(() => setError(null), 4000);
    } else {
      // if server returns updated user object (res.data), replace it
      if (res && res.data) {
        toast.success("Role updated successfully!");
        setUsers(prev => prev.map(u => ((u.id || u._id) === id ? (res.data || u) : u)));
      }
    }
  };

  const RoleBadge = ({ role }) => {
    const cleaned = (role || "user").toLowerCase();
    const roleFromEnum = ROLE_ENUMS.find(r => r.value === cleaned);
    return (
      <div className="member-status-cell">
        <div className={`member-status ${cleaned}`}>
          {roleFromEnum ? roleFromEnum.name : cleaned}
        </div>
      </div>
    );
  };

  const columns = [
    {
      accessorKey: "thumb",
      header: "Img",
      cell: ({ row }) => (
        <div className="member-img-cell">
          <img
            src={row.original.thumb}
            alt={row.original.username || row.original.email}
            className="w-10 h-10 rounded-full"
          />
        </div>
      ),
    },
    {
      accessorKey: "username",
      header: "Name",
      cell: ({ row }) => <div>{row.original.username || row.original.shortName || "-"}</div>,
    },
    {
      accessorKey: "email",
      header: "E-mail",
      cell: ({ row }) => <div>{row.original.email}</div>,
    },
    {
      accessorKey: "role",
      header: "Role",
      // cell: ({ row }) => {
      //   const role = row.original.role.toLowerCase();
      //   const roleFromEnum = ROLE_ENUMS.find((r) => r.value == role);

      //   return (
      //     <div className="member-status-cell">
      //       <div className={`member-status ${role}`}>
      //         {roleFromEnum ? roleFromEnum.name : role}
      //       </div>  
      //     </div>
      //   );
      // },
      cell: ({ row }) => {
        const user = row.original;
        const id = user.id || user._id;
        const role = (user.role || "user").toLowerCase();

        return (
          <div className="flex items-center member-status-cell">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                {/* trigger visually is the badge */}
                <button
                  className="member-status bg-transparent p-0 border-0 cursor-pointer"
                  aria-label={`Change role for ${user.username || user.email}`}
                >
                  <RoleBadge role={role} />
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  side="bottom"
                  align="start"
                  className="z-50 min-w-[160px] bg-light shadow-md rounded-md p-1"
                >
                  {ROLE_ENUMS.map(r => (
                    <DropdownMenu.Item
                      key={r.value}
                      onSelect={(e) => {
                        e.preventDefault();
                        // if same role, just close
                        if (r.value === role) return;
                        handleRoleChange(id, r.value);
                      }}
                      className="flex items-center justify-between px-3 py-2 text-sm rounded-md cursor-pointer hover:opacity-80"
                    >
                      <span>{r.name}</span>
                      {r.value === role ? (
                        <CheckIcon className="w-4 h-4 text-green-500" />
                      ) : null}
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>

            {/* optional small caret for visual affordance */}
            <svg
              className="ml-2 w-3 h-3 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        );
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="member-actions-cell">
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
    <section className="min-h-screen">
      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && <CATable columns={columns} data={users} />}
      <br />
      <TablePagination totalPage={"2"} />
    </section>
  );
};

export default RoleList;
