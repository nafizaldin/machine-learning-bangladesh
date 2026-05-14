"use client";

import { useEffect, useState } from "react";
import { EditSvg, TrashSvg } from "@/components/base/svgs/SvgIcon";
import { CATable } from "@/components/utilityComponents/table/caTable/CATable";
import TablePagination from "@/components/utilityComponents/table/tablePagination/TablePagination";
import utilStore from "@/store/utilStore";
import DeleteDialog from "@/components/utilityComponents/DeleteDialog/DeleteDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ReloadIcon } from "@radix-ui/react-icons";
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
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [editForm, setEditForm] = useState({ username: "", shortName: "", role: "user" });
  const [saving, setSaving] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    const [res, err] = await utilStore.usersForRoleList();
    if (err) { setError(err); setUsers([]); }
    else if (res) { setUsers(Array.isArray(res.data) ? res.data : []); }
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const openEditModal = (user) => {
    setEditUser(user);
    setEditForm({
      username: user.username || "",
      shortName: user.shortName || "",
      role: (user.role || "user").toLowerCase(),
    });
  };

  const handleEditSave = async () => {
    if (!editUser) return;
    setSaving(true);
    const id = editUser.id || editUser._id;
    const [res, err] = await utilStore.updateUserProfile(id, editForm);
    if (err) { toast.error(err); }
    else {
      toast.success("User updated!");
      const updated = res?.data || { ...editUser, ...editForm };
      setUsers(prev => prev.map(u => (u.id || u._id) === id ? { ...u, ...updated } : u));
      setEditUser(null);
    }
    setSaving(false);
  };

  const handleRegenerateAvatar = async () => {
    if (!editUser) return;
    setRegenerating(true);
    const id = editUser.id || editUser._id;
    const [res, err] = await utilStore.regenerateUserAvatar(id);
    if (err) { toast.error(err); }
    else {
      const updated = res?.data || editUser;
      setEditUser(updated);
      setUsers(prev => prev.map(u => (u.id || u._id) === id ? { ...u, thumb: updated.thumb } : u));
      toast.success("Avatar regenerated!");
    }
    setRegenerating(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const [_, err] = await utilStore.deleteUser(deleteId);
    if (err) toast.error(err);
    else {
      toast.success("User removed.");
      setUsers(prev => prev.filter(u => (u.id || u._id) !== deleteId));
    }
    setDeleteId(null);
  };

  // Inline role dropdown (quick change without opening modal)
  const handleRoleChange = async (userId, newRole) => {
    const prevRole = users.find(u => (u.id || u._id) === userId)?.role || "user";
    setUsers(prev => prev.map(u => (u.id || u._id) === userId ? { ...u, role: newRole } : u));
    const [res, err] = await utilStore.updateUserRole(userId, { role: newRole });
    if (err) {
      setUsers(prev => prev.map(u => (u.id || u._id) === userId ? { ...u, role: prevRole } : u));
      toast.error(err);
    } else if (res?.data) {
      toast.success("Role updated!");
    }
  };

  const RoleBadge = ({ role }) => {
    const cleaned = (role || "user").toLowerCase();
    const label = ROLE_ENUMS.find(r => r.value === cleaned)?.name || cleaned;
    return (
      <div className="member-status-cell">
        <div className={`member-status ${cleaned}`}>{label}</div>
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
            src={row.original.thumb || `https://ui-avatars.com/api/?name=${encodeURIComponent(row.original.username || "U")}&background=4285F4&color=fff`}
            alt={row.original.username || row.original.email}
            className="w-10 h-10 rounded-full object-cover"
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
      cell: ({ row }) => {
        const user = row.original;
        const id = user.id || user._id;
        const role = (user.role || "user").toLowerCase();
        return (
          <div className="flex items-center member-status-cell">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="member-status bg-transparent p-0 border-0 cursor-pointer" aria-label="Change role">
                  <RoleBadge role={role} />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content side="bottom" align="start" className="z-50 min-w-[160px] bg-white border border-[#dadce0] shadow-md rounded-md p-1">
                  {ROLE_ENUMS.map(r => (
                    <DropdownMenu.Item
                      key={r.value}
                      onSelect={(e) => { e.preventDefault(); if (r.value !== role) handleRoleChange(id, r.value); }}
                      className="flex items-center justify-between px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-[#e8f0fe] hover:text-[#4285F4]"
                    >
                      <span>{r.name}</span>
                      {r.value === role && <CheckIcon className="w-4 h-4 text-[#4285F4]" />}
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
            <svg className="ml-2 w-3 h-3 text-[#5f6368]" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const s = row.original.status || "inactive";
        return (
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${s === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-[#5f6368]"}`}>
            {s}
          </span>
        );
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original;
        const id = user.id || user._id;
        return (
          <div className="member-actions-cell">
            <button className="edit-btn" title="Edit user" onClick={() => openEditModal(user)}>
              <EditSvg />
            </button>
            <button className="delete-btn" title="Remove user" onClick={() => setDeleteId(id)}>
              <TrashSvg />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <section className="min-h-screen">
      {loading && <p className="text-[#5f6368]">Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && <CATable columns={columns} data={users} />}
      <br />
      <TablePagination totalPage={"2"} />

      {/* Edit user modal */}
      <Dialog open={!!editUser} onOpenChange={(open) => { if (!open) setEditUser(null); }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>

          {editUser && (
            <div className="space-y-4 py-2">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <img
                  src={editUser.thumb || `https://ui-avatars.com/api/?name=${encodeURIComponent(editUser.username || "U")}&background=4285F4&color=fff`}
                  alt={editUser.username}
                  className="w-16 h-16 rounded-full object-cover border border-[#dadce0]"
                />
                <div>
                  <p className="text-sm text-[#5f6368]">{editUser.email}</p>
                  <button
                    type="button"
                    onClick={handleRegenerateAvatar}
                    disabled={regenerating}
                    className="mt-1 text-xs text-[#4285F4] hover:underline disabled:opacity-50 flex items-center gap-1"
                  >
                    {regenerating ? "Regenerating..." : "↻ Regenerate Gravatar"}
                  </button>
                </div>
              </div>

              {/* Username */}
              <div>
                <label className="text-sm font-medium text-[#5f6368] block mb-1">Username</label>
                <input
                  type="text"
                  value={editForm.username}
                  onChange={(e) => setEditForm(f => ({ ...f, username: e.target.value }))}
                  className="w-full border border-[#dadce0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#4285F4] text-[#202124]"
                />
              </div>

              {/* Short Name */}
              <div>
                <label className="text-sm font-medium text-[#5f6368] block mb-1">Display Name</label>
                <input
                  type="text"
                  value={editForm.shortName}
                  onChange={(e) => setEditForm(f => ({ ...f, shortName: e.target.value }))}
                  placeholder="Short display name"
                  className="w-full border border-[#dadce0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#4285F4] text-[#202124]"
                />
              </div>

              {/* Role */}
              <div>
                <label className="text-sm font-medium text-[#5f6368] block mb-1">Role</label>
                <select
                  value={editForm.role}
                  onChange={(e) => setEditForm(f => ({ ...f, role: e.target.value }))}
                  className="w-full border border-[#dadce0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#4285F4] text-[#202124]"
                >
                  {ROLE_ENUMS.map(r => (
                    <option key={r.value} value={r.value}>{r.name}</option>
                  ))}
                </select>
              </div>

              {/* Read-only info */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="text-xs text-[#5f6368] font-medium block">Provider</span>
                  <span className="text-sm capitalize">{editUser.provider || "email"}</span>
                </div>
                <div>
                  <span className="text-xs text-[#5f6368] font-medium block">Status</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${editUser.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-[#5f6368]"}`}>
                    {editUser.status || "inactive"}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-[#5f6368] font-medium block">Joined</span>
                  <span className="text-sm">{editUser.createdAt ? new Date(editUser.createdAt).toLocaleDateString() : "—"}</span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex justify-end gap-2 mt-2">
            <Button variant="outline" onClick={() => setEditUser(null)}>Cancel</Button>
            <Button onClick={handleEditSave} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DeleteDialog
        open={!!deleteId}
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Remove this user?"
        description="This will permanently remove the user from the system. This action cannot be undone."
      />
    </section>
  );
};

export default RoleList;
