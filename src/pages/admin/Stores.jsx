import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { getStores } from "../../api/adminApi";

import { Search, ArrowUpDown, Store } from "lucide-react";

export default function Stores() {
  const { data, isLoading } = useQuery({
    queryKey: ["stores"],
    queryFn: getStores,
  });

  const stores = data?.data || [];

  const [search, setSearch] = useState("");

  const [sortField, setSortField] = useState("name");

  const [sortDirection, setSortDirection] = useState("asc");

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredStores = useMemo(() => {
    const filtered = stores.filter(
      (store) =>
        store.name?.toLowerCase().includes(search.toLowerCase()) ||
        store.email?.toLowerCase().includes(search.toLowerCase()) ||
        store.address?.toLowerCase().includes(search.toLowerCase()),
    );

    filtered.sort((a, b) => {
      let aValue;
      let bValue;

      switch (sortField) {
        case "email":
          aValue = a.email;
          bValue = b.email;
          break;

        case "address":
          aValue = a.address;
          bValue = b.address;
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
  }, [stores, search, sortField, sortDirection]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="text-slate-400 animate-pulse">Loading stores...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
            placeholder="Search stores..."
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
          <Store size={18} />

          <span className="font-medium">{filteredStores.length} Stores</span>
        </div>
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
                    Store Name
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
                  onClick={() => handleSort("address")}
                  className="
                    p-4
                    text-left
                    cursor-pointer
                    select-none
                  "
                >
                  <div className="flex items-center gap-2">
                    Address
                    <ArrowUpDown size={15} />
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredStores.map((store) => (
                <tr
                  key={store.id}
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
                        {store.name?.charAt(0)?.toUpperCase()}
                      </div>

                      <div>
                        <p className="font-medium">{store.name}</p>

                        <p className="text-xs text-slate-500">
                          #{store.id.slice(0, 8)}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 text-slate-300">{store.email}</td>

                  <td className="p-4 text-slate-400">{store.address}</td>
                </tr>
              ))}

              {filteredStores.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="
                      text-center
                      py-16
                      text-slate-500
                    "
                  >
                    No stores found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
