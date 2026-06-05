import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers, deleteUser } from "../../api/adminApi";
import { toast } from "sonner";
import { useState, useMemo } from "react";
import { Search, ArrowUpDown, Users as UsersIcon } from "lucide-react";

import ConfirmDialog from "../../components/common/ConfirmDialog";

export default function Users() {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");

  const [sortField, setSortField] = useState("name");

  const [sortDirection, setSortDirection] = useState("asc");

  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    userId: null,
    userName: "",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,

    onSuccess: () => {
      toast.success("User deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to delete user");
    },
  });

  const users = data?.data || [];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredUsers = useMemo(() => {
    const filtered = users.filter(
      (user) =>
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase()) ||
        user.role?.toLowerCase().includes(search.toLowerCase()),
    );

    filtered.sort((a, b) => {
      let aValue;
      let bValue;

      switch (sortField) {
        case "email":
          aValue = a.email;
          bValue = b.email;
          break;

        case "role":
          aValue = a.role;
          bValue = b.role;
          break;

        default:
          aValue = a.name;
          bValue = b.name;
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;

      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;

      return 0;
    });

    return filtered;
  }, [users, search, sortField, sortDirection]);

  const handleDelete = (id, name) => {
    setDeleteDialog({
      open: true,
      userId: id,
      userName: name,
    });
  };

  const confirmDelete = () => {
    deleteMutation.mutate(deleteDialog.userId);

    setDeleteDialog({
      open: false,
      userId: null,
      userName: "",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="text-slate-400 animate-pulse">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>

          <p className="text-slate-400 mt-1">
            Manage user accounts and permissions
          </p>
        </div>

        <div
          className="
            flex
            items-center
            gap-2
            px-4
            py-2
            rounded-xl
            bg-slate-900
            border
            border-slate-800
          "
        >
          <UsersIcon size={18} />

          <span className="font-medium">{filteredUsers.length} Users</span>
        </div>
      </div>

      {/* Search */}

      <div className="relative max-w-md">
        <Search
          size={18}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="
            w-full
            pl-11
            pr-4
            py-3
            rounded-xl
            bg-slate-900
            border
            border-slate-800
            outline-none
            focus:border-blue-500
          "
        />
      </div>

      {/* Table */}

      <div
        className="
          bg-slate-900
          border
          border-slate-800
          rounded-3xl
          overflow-hidden
          shadow-xl
        "
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th
                  onClick={() => handleSort("name")}
                  className="
                    p-4
                    text-left
                    cursor-pointer
                    select-none
                  "
                >
                  <div className="flex items-center gap-2">
                    Name
                    <ArrowUpDown size={15} />
                  </div>
                </th>

                <th
                  onClick={() => handleSort("email")}
                  className="
                    p-4
                    text-left
                    cursor-pointer
                    select-none
                  "
                >
                  <div className="flex items-center gap-2">
                    Email
                    <ArrowUpDown size={15} />
                  </div>
                </th>

                <th
                  onClick={() => handleSort("role")}
                  className="
                    p-4
                    text-center
                    cursor-pointer
                    select-none
                  "
                >
                  <div className="flex items-center justify-center gap-2">
                    Role
                    <ArrowUpDown size={15} />
                  </div>
                </th>

                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="
                      border-b
                      border-slate-800
                      hover:bg-slate-800/40
                      transition-colors
                    "
                >
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div
                        className="
                            w-10
                            h-10
                            rounded-full
                            bg-gradient-to-r
                            from-blue-500
                            to-violet-600
                            text-white
                            flex
                            items-center
                            justify-center
                            font-semibold
                          "
                      >
                        {user.name?.charAt(0)?.toUpperCase()}
                      </div>

                      <div>
                        <p className="font-medium">{user.name}</p>

                        <p className="text-xs text-slate-500">
                          #{user.id.slice(0, 8)}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="text-slate-300">{user.email}</span>
                  </td>

                  <td className="p-4 text-center">
                    <div
                      className={`
                          inline-flex
                          items-center
                          justify-center
                          min-w-[140px]
                          px-4
                          py-2.5
                          rounded-xl
                          text-sm
                          font-semibold
                          border
                          ${
                            user.role === "ADMIN"
                              ? `
                              bg-red-500/10
                              text-red-300
                              border-red-500/20
                            `
                              : user.role === "STORE_OWNER"
                                ? `
                              bg-blue-500/10
                              text-blue-300
                              border-blue-500/20
                            `
                                : `
                              bg-emerald-500/10
                              text-emerald-300
                              border-emerald-500/20
                            `
                          }
                        `}
                    >
                      {user.role}
                    </div>
                  </td>

                  <td className="p-4 text-center">
                    {user.role !== "ADMIN" && (
                      <button
                        onClick={() => handleDelete(user.id, user.name)}
                        disabled={deleteMutation.isPending}
                        className="
                            px-5
                            py-2.5
                            rounded-xl
                            bg-rose-500/10
                            text-rose-300
                            border
                            border-rose-500/20
                            hover:bg-rose-500/15
                            hover:border-rose-500/30
                            transition-all
                            font-medium
                            cursor-pointer
                          "
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="
                      text-center
                      py-16
                      text-slate-500
                    "
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog
        open={deleteDialog.open}
        title="Delete User"
        message={`Are you sure you want to delete ${deleteDialog.userName}? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() =>
          setDeleteDialog({
            open: false,
            userId: null,
            userName: "",
          })
        }
      />
    </div>
  );
}
