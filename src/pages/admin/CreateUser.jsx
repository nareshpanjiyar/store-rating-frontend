import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { createUser } from "../../api/adminApi";

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;

const createUserSchema = z.object({
  name: z
    .string()
    .min(20, "Name must be at least 20 characters")
    .max(60, "Name cannot exceed 60 characters"),

  email: z.string().email("Please enter a valid email address"),

  address: z
    .string()
    .min(1, "Address must be at least 1 character")
    .max(400, "Address cannot exceed 400 characters"),

  password: z
    .string()
    .regex(
      passwordRegex,
      "Password must contain at least 6 characters, one uppercase letter, and one special character",
    ),

  role: z.enum(["USER", "STORE_OWNER"]),
});

export default function CreateUser() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      role: "USER",
    },
  });

  const submit = async (values) => {
    try {
      await createUser(values);

      toast.success("User Created Successfully");

      reset({
        name: "",
        email: "",
        password: "",
        address: "",
        role: "USER",
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to create user",
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
              from-blue-600
              to-violet-600
              flex
              items-center
              justify-center
              text-white
            "
          >
            <UserPlus size={40} />
          </div>

          <div>
            <h2 className="text-3xl font-bold">User Information</h2>

            <p className="text-slate-500">
              Enter the details for the new account
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(submit)} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium">Full Name</label>

            <input
              {...register("name")}
              placeholder="Enter full name"
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
                focus:ring-blue-500
              "
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Email Address
            </label>

            <input
              type="email"
              {...register("email")}
              placeholder="Enter email address"
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
                focus:ring-blue-500
              "
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Password</label>

            <input
              type="password"
              {...register("password")}
              placeholder="Enter password"
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
                focus:ring-blue-500
              "
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Address</label>

            <input
              {...register("address")}
              placeholder="Enter address"
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
                focus:ring-blue-500
              "
            />

            {errors.address && (
              <p className="mt-1 text-sm text-red-500">
                {errors.address.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Role</label>

            <select
              {...register("role")}
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
                focus:ring-blue-500
              "
            >
              <option value="USER">USER</option>

              <option value="STORE_OWNER">STORE OWNER</option>
            </select>

            {errors.role && (
              <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                bg-blue-600
                hover:bg-blue-700
                disabled:opacity-60
                text-white
                px-6
                py-3
                rounded-xl
                font-medium
                transition-colors
                cursor-pointer
              "
            >
              {isSubmitting ? "Creating User..." : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
