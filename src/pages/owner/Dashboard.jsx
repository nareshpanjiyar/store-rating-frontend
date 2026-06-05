import { useQuery } from "@tanstack/react-query";

import { getOwnerDashboard } from "../../api/ownerApi";
import StarRating from "../../components/ui/StarRating";

export default function Dashboard() {
  const { data } = useQuery({
    queryKey: ["ownerDashboard"],
    queryFn: getOwnerDashboard,
  });

  const dashboard = data?.data || {};

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

          <p className="text-4xl font-bold mt-3">{dashboard.totalRatings}</p>
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
            {dashboard.submittedUsers?.map((item) => (
              <tr key={item.id} className="border-b border-slate-800">
                <td className="p-4">{item.user.name}</td>

                <td className="p-4">{item.user.email}</td>

                <td className="p-4">
                  <span className="flex gap-2">
                    {item.rating} <StarRating value={item.rating} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
