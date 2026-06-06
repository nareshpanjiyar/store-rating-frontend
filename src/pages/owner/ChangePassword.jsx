import { useForm } from "react-hook-form";
import { Lock } from "lucide-react";
import { toast } from "sonner";
import { changePassword } from "../../api/ownerApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(3, "Current password must be at least 3 characters"),
  newPassword: z.string().min(3, "New password must be at least 3 characters"),
});

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const submit = async (data) => {
    try {
      await changePassword(data);

      toast.success("Password changed successfully");

      reset();
    } catch {
      toast.error("Failed to change password");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {user.role === "USER" && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Change Password</h1>

          <p className="text-slate-500 mt-1">
            Update your account password securely
          </p>
        </div>
      )}

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
              from-amber-500
              to-orange-600
              flex
              items-center
              justify-center
              text-white
            "
          >
            <Lock size={40} />
          </div>

          <div>
            <h2 className="text-3xl font-bold">Password Security</h2>

            <p className="text-slate-500">Keep your account protected</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(submit)} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Current Password
            </label>

            <input
              type="password"
              placeholder="Enter current password"
              {...register("currentPassword")}
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
            {errors.currentPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              {...register("newPassword")}
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

            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-6
                py-3
                rounded-xl
                font-medium
                transition-colors
              "
            >
              {isSubmitting ? "Updating Password..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
