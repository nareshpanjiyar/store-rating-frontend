/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  Star,
  Users,
  Store,
  Search,
  ArrowUpDown,
  MapPin,
  Mail,
} from "lucide-react";

import { getOwnerDashboard } from "../../api/ownerApi";

import StarRating from "../../components/ui/StarRating";

export default function Dashboard() {
  const [selectedStoreId, setSelectedStoreId] = useState("");

  const [search, setSearch] = useState("");

  const [sortField, setSortField] = useState("rating");

  const [sortDirection, setSortDirection] = useState("desc");

  const { data, isLoading } = useQuery({
    queryKey: ["ownerDashboard", selectedStoreId],
    queryFn: () => getOwnerDashboard(selectedStoreId),
  });

  const dashboard = data?.data || {};

  useEffect(() => {
    if (!selectedStoreId && dashboard.selectedStore?.id) {
      setSelectedStoreId(dashboard.selectedStore.id);
    }
  }, [dashboard.selectedStore, selectedStoreId]);

  const selectedStore = dashboard.selectedStore;

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
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
    return (
      <div className="flex justify-center items-center h-full">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Store Selector */}

      <div
        className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-4
        "
      >
        <div>
          <h2 className="text-2xl font-bold">Store Dashboard</h2>

          <p className="text-slate-500">
            Monitor ratings and customer feedback
          </p>
        </div>

        <select
          value={selectedStoreId}
          onChange={(e) => setSelectedStoreId(e.target.value)}
          className="
            min-w-[280px]
            px-4
            py-3
            rounded-xl
            border
            border-slate-300
            dark:border-slate-700
            bg-white
            dark:bg-slate-900
            cursor-pointer
          "
        >
          {dashboard.stores?.map((store) => (
            <option key={store.id} value={store.id}>
              {store.name}
            </option>
          ))}
        </select>
      </div>

      {/* Store Details */}

      <div
        className="
          rounded-3xl
          border
          border-slate-200
          dark:border-slate-800
          bg-white
          dark:bg-slate-900
          p-6
        "
      >
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="flex items-start gap-3 min-w-0">
            <Store size={20} className="shrink-0 mt-1 text-blue-500" />

            <div className="min-w-0 flex-1">
              <p className="text-xs text-slate-500">Store Name</p>

              <p
                title={selectedStore?.name}
                className="
                  font-semibold
                  break-words
                "
              >
                {selectedStore?.name}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 min-w-0">
            <Mail size={20} className="shrink-0 mt-1 text-violet-500" />

            <div className="min-w-0 flex-1">
              <p className="text-xs text-slate-500">Email</p>

              <p
                title={selectedStore?.email}
                className="
                  break-all
                "
              >
                {selectedStore?.email}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 min-w-0">
            <MapPin size={20} className="shrink-0 mt-1 text-emerald-500" />

            <div className="min-w-0 flex-1">
              <p className="text-xs text-slate-500">Address</p>

              <p
                title={selectedStore?.address}
                className="
                  break-words
                "
              >
                {selectedStore?.address}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-2 gap-6">
        <div
          className="
            rounded-3xl
            p-6
            border
            border-yellow-500/20
            bg-gradient-to-br
            from-yellow-500/10
            to-yellow-500/5
          "
        >
          <div className="flex justify-between">
            <div>
              <p className="text-slate-500">Average Rating</p>

              <h2 className="text-5xl font-bold mt-2">
                {dashboard.averageRating || 0}
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
            rounded-3xl
            p-6
            border
            border-blue-500/20
            bg-gradient-to-br
            from-blue-500/10
            to-blue-500/5
          "
        >
          <div className="flex justify-between">
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
          rounded-3xl
          overflow-hidden
          border
          border-slate-200
          dark:border-slate-800
          bg-white
          dark:bg-slate-900
        "
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th
                  onClick={() => handleSort("name")}
                  className="p-4 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    User
                    <ArrowUpDown size={15} />
                  </div>
                </th>

                <th
                  onClick={() => handleSort("email")}
                  className="p-4 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    Email
                    <ArrowUpDown size={15} />
                  </div>
                </th>

                <th
                  onClick={() => handleSort("rating")}
                  className="p-4 text-left cursor-pointer"
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
                    colSpan={3}
                    className="
                      text-center
                      py-12
                      text-slate-500
                    "
                  >
                    No ratings found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((item) => (
                  <tr
                    key={item.ratingId}
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
    </div>
  );
}
