import { useQuery } from "@tanstack/react-query";

import { getDashboardStats } from "../../api/adminApi";

import { Users, Store, Star, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardStats,
  });

  const stats = data?.data || {};

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-pulse text-slate-400">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}

      <div className="grid md:grid-cols-3 gap-6">
        {/* Users */}

        <div
          className="
            rounded-3xl
            p-6
            border
            border-blue-500/20
            bg-gradient-to-br
            from-blue-500/10
            to-blue-600/5
            hover:scale-[1.02]
            transition-all
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400">Total Users</p>

              <h2 className="text-5xl font-bold mt-3">
                {stats.totalUsers || 0}
              </h2>
            </div>

            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-blue-500/20
                flex
                items-center
                justify-center
              "
            >
              <Users size={28} className="text-blue-400" />
            </div>
          </div>
        </div>

        {/* Stores */}

        <div
          className="
            rounded-3xl
            p-6
            border
            border-violet-500/20
            bg-gradient-to-br
            from-violet-500/10
            to-violet-600/5
            hover:scale-[1.02]
            transition-all
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400">Total Stores</p>

              <h2 className="text-5xl font-bold mt-3">
                {stats.totalStores || 0}
              </h2>
            </div>

            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-violet-500/20
                flex
                items-center
                justify-center
              "
            >
              <Store size={28} className="text-violet-400" />
            </div>
          </div>
        </div>

        {/* Ratings */}

        <div
          className="
            rounded-3xl
            p-6
            border
            border-yellow-500/20
            bg-gradient-to-br
            from-yellow-500/10
            to-yellow-600/5
            hover:scale-[1.02]
            transition-all
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400">Total Ratings</p>

              <h2 className="text-5xl font-bold mt-3">
                {stats.totalRatings || 0}
              </h2>
            </div>

            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-yellow-500/20
                flex
                items-center
                justify-center
              "
            >
              <Star size={28} className="text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Insights Section */}

      <div
        className="
          rounded-3xl
          bg-slate-900
          border
          border-slate-800
          p-8
        "
      >
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp size={24} className="text-green-400" />

          <h2 className="text-2xl font-semibold">Platform Insights</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-800 rounded-2xl p-5">
            <p className="text-slate-400 text-sm">User Growth</p>

            <h3 className="text-xl font-bold mt-2">{stats.totalUsers || 0}</h3>

            <p className="text-slate-500 text-sm mt-2">
              Registered users on the platform
            </p>
          </div>

          <div className="bg-slate-800 rounded-2xl p-5">
            <p className="text-slate-400 text-sm">Active Stores</p>

            <h3 className="text-xl font-bold mt-2">{stats.totalStores || 0}</h3>

            <p className="text-slate-500 text-sm mt-2">
              Stores available for ratings
            </p>
          </div>

          <div className="bg-slate-800 rounded-2xl p-5">
            <p className="text-slate-400 text-sm">Community Ratings</p>

            <h3 className="text-xl font-bold mt-2">
              {stats.totalRatings || 0}
            </h3>

            <p className="text-slate-500 text-sm mt-2">
              Ratings submitted by users
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
