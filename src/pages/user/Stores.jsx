import { useQuery } from "@tanstack/react-query";

import { getStores } from "../../api/storeApi";

import { Link } from "react-router-dom";

import { useState } from "react";

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

  if (isLoading) {
    return <div>Loading Stores...</div>;
  }

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Stores</h1>

        <input
          placeholder="Search Store..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-slate-900 p-3 rounded-lg"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12">No Stores Found</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {filtered.map((store) => (
            <Link key={store.id} to={`/stores/${store.id}`}>
              <div className="bg-slate-900 p-6 rounded-xl hover:border-blue-500 border border-slate-800">
                <h2 className="font-bold text-xl">{store.name}</h2>

                <p className="text-slate-400 mt-2">{store.address}</p>

                <p className="mt-4">Rating: {store.averageRating}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
