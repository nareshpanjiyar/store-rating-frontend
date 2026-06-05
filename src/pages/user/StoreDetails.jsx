import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { Store, MapPin, Star, Users, ArrowLeft } from "lucide-react";

import { toast } from "sonner";

import { getStoreById, submitRating, updateRating } from "../../api/storeApi";

import StarRating from "../../components/ui/StarRating";

export default function StoreDetails() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [rating, setRating] = useState(0);

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["store", id],
    queryFn: () => getStoreById(id),
  });

  const store = data?.data;

  const handleSubmit = async () => {
    if (!rating) {
      toast.error("Please select a rating");
      return;
    }

    try {
      await submitRating({
        storeId: id,
        rating,
      });

      toast.success("Rating submitted successfully");

      refetch();
    } catch {
      try {
        await updateRating(id, {
          rating,
        });

        toast.success("Rating updated successfully");

        refetch();
      } catch {
        toast.error("Unable to submit rating");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="text-xl font-semibold">Loading Store...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Back Button */}

      <button
        onClick={() => navigate("/stores")}
        className="
          flex
          items-center
          gap-2
          px-4
          py-2
          rounded-xl
          border
          border-slate-300
          dark:border-slate-700
          hover:bg-slate-100
          dark:hover:bg-slate-800
          transition
          cursor-pointer
        "
      >
        <ArrowLeft size={18} />
        Back to Stores
      </button>

      {/* Hero Card */}

      <div
        className="
          bg-white
          dark:bg-slate-900
          border
          border-slate-200
          dark:border-slate-800
          rounded-3xl
          p-8
          shadow-lg
        "
      >
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="flex gap-5">
            <div
              className="
                w-20
                h-20
                rounded-2xl
                bg-blue-100
                dark:bg-blue-900/30
                flex
                items-center
                justify-center
              "
            >
              <Store size={38} className="text-blue-600" />
            </div>

            <div>
              <h1 className="text-4xl font-bold">{store.name}</h1>

              <div
                className="
                  flex
                  items-center
                  gap-2
                  mt-4
                  text-slate-500
                "
              >
                <MapPin size={18} />

                <span>{store.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6">
        <div
          className="
            bg-white
            dark:bg-slate-900
            rounded-2xl
            p-6
            border
            border-slate-200
            dark:border-slate-800
          "
        >
          <div className="flex items-center gap-3">
            <Star className="text-yellow-500" />
            <span className="text-slate-500">Average Rating</span>
          </div>

          <div className="text-4xl font-bold mt-4">
            {store.overallRating || 0}
          </div>
        </div>

        <div
          className="
            bg-white
            dark:bg-slate-900
            rounded-2xl
            p-6
            border
            border-slate-200
            dark:border-slate-800
          "
        >
          <div className="flex items-center gap-3">
            <Users className="text-blue-500" />
            <span className="text-slate-500">Your Previous Rating</span>
          </div>

          <div className="text-4xl font-bold mt-4">{store.userRating || 0}</div>
        </div>

        <div
          className="
            bg-white
            dark:bg-slate-900
            rounded-2xl
            p-6
            border
            border-slate-200
            dark:border-slate-800
          "
        >
          <div className="flex items-center gap-3">
            <Store className="text-purple-500" />
            <span className="text-slate-500">Store Status</span>
          </div>

          <div className="text-2xl font-bold mt-4 text-green-500">Active</div>
        </div>
      </div>

      {/* Rating Card */}

      <div
        className="
          bg-white
          dark:bg-slate-900
          border
          border-slate-200
          dark:border-slate-800
          rounded-3xl
          p-8
          shadow-lg
        "
      >
        <h2 className="text-2xl font-bold">Rate This Store</h2>

        <p className="text-slate-500 mt-2">
          Share your experience with other users.
        </p>

        <div className="mt-8 flex justify-center">
          <StarRating value={rating} onChange={setRating} editable />
        </div>

        {rating > 0 && (
          <div className="text-center mt-4">
            <span
              className="
                px-4
                py-2
                rounded-full
                bg-blue-100
                dark:bg-blue-900/30
                text-blue-600
                font-semibold
              "
            >
              Selected Rating: {rating}/5
            </span>
          </div>
        )}

        <div className="flex justify-center mt-8">
          <button
            onClick={handleSubmit}
            className="
              px-10
              py-4
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              text-white
              font-semibold
              hover:scale-105
              transition-all
              cursor-pointer
            "
          >
            Submit Rating
          </button>
        </div>
      </div>
    </div>
  );
}
