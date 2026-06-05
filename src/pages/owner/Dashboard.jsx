import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Star, Users, ArrowUpDown, Search } from "lucide-react";

import { getOwnerDashboard } from "../../api/ownerApi";
import StarRating from "../../components/ui/StarRating";

export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["ownerDashboard"],
    queryFn: getOwnerDashboard,
  });

  const dashboard = data?.data || {};

  const [search, setSearch] = useState("");

  const [sortField, setSortField] = useState("rating");

  const [sortDirection, setSortDirection] = useState("desc");

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredUsers = useMemo(() => {
    const users = [...(dashboard.submittedUsers || [])];

    const filtered = users.filter(
      (item) =>
        item.user.name.toLowerCase().includes(search.toLowerCase()) ||
        item.user.email.toLowerCase().includes(search.toLowerCase()),
    );

    filtered.sort((a, b) => {
      let aValue;
      let bValue;

      switch (sortField) {
        case "name":
          aValue = a.user.name;
          bValue = b.user.name;
          break;

        case "email":
          aValue = a.user.email;
          bValue = b.user.email;
          break;

        default:
          aValue = a.rating;
          bValue = b.rating;
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;

      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;

      return 0;
    });

    return filtered;
  }, [dashboard.submittedUsers, search, sortField, sortDirection]);

  if (isLoading) {
    return <div className="text-center py-20">Loading Dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold">Store Dashboard</h1>

        <p className="text-slate-500 mt-2">
          View ratings and customer feedback.
        </p>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-2 gap-6">
        <div
          className="
            rounded-2xl
            p-6
            border
            border-yellow-500/20
            bg-gradient-to-br
            from-yellow-500/10
            to-yellow-500/5
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500">Average Rating</p>

              <h2 className="text-5xl font-bold mt-2">
                {dashboard.averageRating || "0.0"}
              </h2>

              <div className="mt-3">
                <StarRating value={Math.round(dashboard.averageRating || 0)} />
              </div>
            </div>

            <Star size={42} className="text-yellow-400" />
          </div>
        </div>

        <div
          className="
            rounded-2xl
            p-6
            border
            border-blue-500/20
            bg-gradient-to-br
            from-blue-500/10
            to-blue-500/5
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500">Total Ratings</p>

              <h2 className="text-5xl font-bold mt-2">
                {dashboard.totalRatings || 0}
              </h2>
            </div>

            <Users size={42} className="text-blue-400" />
          </div>
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
            border
            border-slate-300
            dark:border-slate-700
            bg-white
            dark:bg-slate-900
          "
        />
      </div>

      {/* Ratings Table */}

      <div
        className="
          rounded-2xl
          overflow-hidden
          border
          border-slate-200
          dark:border-slate-800
          bg-white
          dark:bg-slate-900
        "
      >
        <table className="w-full">
          <thead>
            <tr
              className="
                border-b
                border-slate-200
                dark:border-slate-800
              "
            >
              <th
                onClick={() => handleSort("name")}
                className="
                  p-4
                  text-left
                  cursor-pointer
                "
              >
                <div className="flex items-center gap-2">
                  User
                  <ArrowUpDown size={15} />
                </div>
              </th>

              <th
                onClick={() => handleSort("email")}
                className="
                  p-4
                  text-left
                  cursor-pointer
                "
              >
                <div className="flex items-center gap-2">
                  Email
                  <ArrowUpDown size={15} />
                </div>
              </th>

              <th
                onClick={() => handleSort("rating")}
                className="
                  p-4
                  text-left
                  cursor-pointer
                "
              >
                <div className="flex items-center gap-2">
                  Rating
                  <ArrowUpDown size={15} />
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="
                    text-center
                    py-12
                    text-slate-500
                  "
                >
                  No ratings found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((item) => (
                <tr
                  key={item.id}
                  className="
                    border-b
                    border-slate-200
                    dark:border-slate-800
                    hover:bg-slate-50
                    dark:hover:bg-slate-800/50
                    transition
                  "
                >
                  <td className="p-4 font-medium">{item.user.name}</td>

                  <td className="p-4 text-slate-500">{item.user.email}</td>

                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <span className="font-bold">{item.rating}</span>

                      <StarRating value={item.rating} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
