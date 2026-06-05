import { useQuery } from "@tanstack/react-query";

import { getDashboardStats } from "../../api/adminApi";

export default function Dashboard() {
  const { data } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardStats,
  });

  const stats = data?.data || {};

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-slate-900 rounded-xl p-6">
          <h3>Total Users</h3>

          <p className="text-4xl font-bold mt-3">{stats.totalUsers || 0}</p>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <h3>Total Stores</h3>

          <p className="text-4xl font-bold mt-3">{stats.totalStores || 0}</p>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <h3>Total Ratings</h3>

          <p className="text-4xl font-bold mt-3">{stats.totalRatings || 0}</p>
        </div>
      </div>
    </div>
  );
}
