import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Store, Search, Star, MapPin } from "lucide-react";

import { getStores } from "../../api/storeApi";

export default function Stores() {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["stores"],
    queryFn: getStores,
  });

  const stores = data?.data || [];

  const filtered = stores.filter((store) =>
    store.name.toLowerCase().includes(search.toLowerCase()),
  );

  const getRatingColor = (rating) => {
    if (rating >= 4) return "bg-green-500";
    if (rating >= 3) return "bg-yellow-500";
    return "bg-red-500";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg font-medium">Loading Stores...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1
            className="
              text-4xl
              font-bold
              bg-gradient-to-r
              from-blue-600
              to-purple-600
              bg-clip-text
              text-transparent
            "
          >
            Explore Stores
          </h1>

          <p className="text-slate-500 mt-2">Browse and rate stores near you</p>
        </div>

        <div className="relative w-full md:w-96">
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
            type="text"
            placeholder="Search stores..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />
        </div>
      </div>

      {/* Stats */}

      <div
        className="
          bg-white
          dark:bg-slate-900
          rounded-2xl
          border
          border-slate-200
          dark:border-slate-800
          p-5
        "
      >
        <div className="text-sm text-slate-500">Total Stores</div>

        <div className="text-3xl font-bold mt-1">{filtered.length}</div>
      </div>

      {/* Empty State */}

      {filtered.length === 0 ? (
        <div
          className="
            bg-white
            dark:bg-slate-900
            rounded-2xl
            border
            border-slate-200
            dark:border-slate-800
            p-16
            text-center
          "
        >
          <Store size={50} className="mx-auto text-slate-400" />

          <h3 className="text-xl font-semibold mt-4">No Stores Found</h3>

          <p className="text-slate-500 mt-2">Try a different search keyword.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((store) => (
            <Link key={store.id} to={`/stores/${store.id}`}>
              <div
                className="
                  group
                  h-full
                  bg-white
                  dark:bg-slate-900
                  border
                  border-slate-200
                  dark:border-slate-800
                  rounded-2xl
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                  hover:border-blue-500
                "
              >
                {/* Top */}

                <div className="flex justify-between items-start">
                  <div
                    className="
                      w-14
                      h-14
                      rounded-xl
                      bg-blue-100
                      dark:bg-blue-900/30
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Store size={26} className="text-blue-600" />
                  </div>

                  <div
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-white
                      text-sm
                      font-semibold
                      ${getRatingColor(store.overallRating || 0)}
                    `}
                  >
                    {store.overallRating || 0}
                  </div>
                </div>

                {/* Store Name */}

                <h2
                  className="
                    mt-5
                    text-xl
                    font-bold
                    group-hover:text-blue-500
                    transition
                  "
                >
                  {store.name}
                </h2>

                {/* Address */}

                <div
                  className="
                    flex
                    items-start
                    gap-2
                    mt-3
                    text-slate-500
                    text-sm
                  "
                >
                  <MapPin size={15} />

                  <span>{store.address}</span>
                </div>

                {/* Rating */}

                <div className="flex items-center gap-2 mt-5">
                  <Star
                    size={18}
                    className="text-yellow-500"
                    fill="currentColor"
                  />

                  <span className="font-medium">
                    {store.overallRating || 0}
                    /5 Rating
                  </span>
                </div>

                {/* CTA */}

                <div
                  className="
                    mt-6
                    text-blue-500
                    font-semibold
                  "
                >
                  View Details →
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
