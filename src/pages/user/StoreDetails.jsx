import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { getStoreById, submitRating, updateRating } from "../../api/storeApi";

import { useState } from "react";

import StarRating from "../../components/ui/StarRating";

import { toast } from "sonner";

export default function StoreDetails() {
  const { id } = useParams();

  const { data, refetch } = useQuery({
    queryKey: ["store", id],
    queryFn: () => getStoreById(id),
  });

  const store = data?.data;

  const [rating, setRating] = useState(0);

  const submit = async () => {
    try {
      await submitRating({
        storeId: id,
        rating,
      });

      toast.success("Rating Submitted");

      refetch();
    } catch {
      await updateRating(id, {
        rating,
      });

      toast.success("Rating Updated");

      refetch();
    }
  };

  if (!store) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold">{store.name}</h1>

      <p className="mt-3 text-slate-400">{store.address}</p>

      <div className="mt-6">
        <h3 className="text-xl">Overall Rating</h3>

        <p className="text-3xl font-bold mt-2">{store.averageRating}</p>
      </div>

      <div className="mt-8 bg-slate-900 p-6 rounded-xl">
        <h3 className="text-xl mb-4">Rate This Store</h3>

        <StarRating value={rating} onChange={setRating} editable />

        <button
          onClick={submit}
          className="mt-6 bg-blue-600 px-6 py-3 rounded-lg"
        >
          Submit Rating
        </button>
      </div>
    </div>
  );
}
