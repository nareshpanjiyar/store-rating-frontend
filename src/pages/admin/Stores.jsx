import { useQuery } from "@tanstack/react-query";

import { getStores } from "../../api/adminApi";

export default function Stores() {
  const { data } = useQuery({
    queryKey: ["stores"],
    queryFn: getStores,
  });

  const stores = data?.data || [];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Stores</h1>

      <div className="bg-slate-900 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="p-4">Name</th>

              <th className="p-4">Email</th>

              <th className="p-4">Address</th>
            </tr>
          </thead>

          <tbody>
            {stores.map((store) => (
              <tr key={store.id} className="border-b border-slate-800">
                <td className="p-4">{store.name}</td>

                <td className="p-4">{store.email}</td>

                <td className="p-4">{store.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
