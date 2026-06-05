import { useQuery } from "@tanstack/react-query";

import { getOwnerDashboard } from "../../api/ownerApi";

export default function Dashboard() {
  const { data } = useQuery({
    queryKey: ["ownerDashboard"],
    queryFn: getOwnerDashboard,
  });

  const dashboard = data?.data || {};

  const ratings = dashboard.ratings || [];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Store Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-900 rounded-xl p-6">
          <h3>Average Rating</h3>

          <p className="text-4xl font-bold mt-3">
            {dashboard.averageRating || 0}
          </p>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <h3>Total Ratings</h3>

          <p className="text-4xl font-bold mt-3">{ratings.length}</p>
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="p-4 text-left">User</th>

              <th className="p-4 text-left">Email</th>

              <th className="p-4 text-left">Rating</th>
            </tr>
          </thead>

          <tbody>
            {ratings.map((rating) => (
              <tr key={rating.id} className="border-b border-slate-800">
                <td className="p-4">{rating.user.name}</td>

                <td className="p-4">{rating.user.email}</td>

                <td className="p-4">{rating.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
