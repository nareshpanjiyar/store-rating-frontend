import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Store } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { createStore, getUsers } from "../../api/adminApi";

const createStoreSchema = z.object({
  name: z.string().min(3, "Store name must be at least 3 characters"),

  email: z.string().email("Please enter a valid email address"),

  address: z
    .string()
    .address("Address is required")
    .max(400, "Address cannot exceed 400 characters"),

  ownerId: z.string().min(1, "Please select a store owner"),
});

const defaultValues = {
  name: "",
  email: "",
  address: "",
  ownerId: "",
};

export default function CreateStore() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createStoreSchema),
    defaultValues,
  });

  const { data: ownersData, isLoading: ownersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      getUsers({
        role: "STORE_OWNER",
      }),
  });

  const owners = ownersData?.data || [];

  const submit = async (values) => {
    try {
      await createStore(values);

      toast.success("Store Created Successfully");

      reset(defaultValues);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to create store",
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div
        className="
          bg-white
          dark:bg-slate-900
          rounded-2xl
          border
          border-slate-200
          dark:border-slate-800
          p-8
        "
      >
        <div className="flex items-center gap-6 mb-8">
          <div
            className="
              w-24
              h-24
              rounded-full
              bg-gradient-to-r
              from-green-600
              to-emerald-600
              flex
              items-center
              justify-center
              text-white
            "
          >
            <Store size={40} />
          </div>

          <div>
            <h2 className="text-3xl font-bold">Store Information</h2>

            <p className="text-slate-500">
              Fill in the details to create a store
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(submit)} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium">Store Name</label>

            <input
              {...register("name")}
              placeholder="Enter store name"
              className="
                w-full
                px-4
                py-3
                rounded-xl
                border
                border-slate-300
                dark:border-slate-700
                bg-white
                dark:bg-slate-800
                focus:outline-none
                focus:ring-2
                focus:ring-green-500
              "
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Store Email
            </label>

            <input
              type="email"
              {...register("email")}
              placeholder="Enter store email"
              className="
                w-full
                px-4
                py-3
                rounded-xl
                border
                border-slate-300
                dark:border-slate-700
                bg-white
                dark:bg-slate-800
                focus:outline-none
                focus:ring-2
                focus:ring-green-500
              "
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Store Address
            </label>

            <input
              {...register("address")}
              placeholder="Enter store address"
              className="
                w-full
                px-4
                py-3
                rounded-xl
                border
                border-slate-300
                dark:border-slate-700
                bg-white
                dark:bg-slate-800
                focus:outline-none
                focus:ring-2
                focus:ring-green-500
              "
            />

            <p className="mt-1 text-xs text-slate-500">
              Maximum 400 characters
            </p>

            {errors.address && (
              <p className="mt-1 text-sm text-red-500">
                {errors.address.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Store Owner
            </label>

            <select
              {...register("ownerId")}
              disabled={ownersLoading}
              className="
                w-full
                px-4
                py-3
                rounded-xl
                border
                border-slate-300
                dark:border-slate-700
                bg-white
                dark:bg-slate-800
                focus:outline-none
                focus:ring-2
                focus:ring-green-500
                cursor-pointer
                disabled:opacity-60
              "
            >
              <option value="">
                {ownersLoading ? "Loading owners..." : "Select Store Owner"}
              </option>

              {owners.map((owner) => (
                <option key={owner.id} value={owner.id}>
                  {owner.name} ({owner.email})
                </option>
              ))}
            </select>

            {errors.ownerId && (
              <p className="mt-1 text-sm text-red-500">
                {errors.ownerId.message}
              </p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                bg-green-600
                hover:bg-green-700
                disabled:opacity-60
                disabled:cursor-not-allowed
                text-white
                px-6
                py-3
                rounded-xl
                font-medium
                transition-colors
                cursor-pointer
              "
            >
              {isSubmitting ? "Creating Store..." : "Create Store"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
