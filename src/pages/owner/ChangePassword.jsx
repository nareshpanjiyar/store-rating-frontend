import { useState } from "react";
import { useForm } from "react-hook-form";
import { Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { changePassword } from "../../api/ownerApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;

const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .regex(
      passwordRegex,
      "Current password must contain at least 6 characters, one uppercase letter, and one special character",
    ),

  newPassword: z
    .string()
    .regex(
      passwordRegex,
      "New password must contain at least 6 characters, one uppercase letter, and one special character",
    ),
});

export default function ChangePassword() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  const submit = async (data) => {
    try {
      await changePassword(data);

      toast.success("Password changed successfully");

      reset();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to change password",
      );
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
          {/* Current Password */}

          <div>
            <label className="block mb-2 text-sm font-medium">
              Current Password
            </label>

            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter current password"
                {...register("currentPassword")}
                className="
                  w-full
                  px-4
                  py-3
                  pr-12
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

              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                  hover:text-slate-600
                  dark:hover:text-slate-200
                  transition-colors
                  cursor-pointer
                "
              >
                {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {errors.currentPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}

          <div>
            <label className="block mb-2 text-sm font-medium">
              New Password
            </label>

            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                {...register("newPassword")}
                className="
                  w-full
                  px-4
                  py-3
                  pr-12
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

              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                  hover:text-slate-600
                  dark:hover:text-slate-200
                  transition-colors
                  cursor-pointer
                "
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Password Requirements */}

          <div
            className="
              rounded-xl
              bg-slate-100
              dark:bg-slate-800
              p-4
              text-sm
              text-slate-600
              dark:text-slate-400
            "
          >
            Password requirements:
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Minimum 6 characters</li>
              <li>At least 1 uppercase letter (A-Z)</li>
              <li>At least 1 special character (!@#$%^&*)</li>
            </ul>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                bg-blue-600
                hover:bg-blue-700
                disabled:opacity-50
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
              {isSubmitting ? "Updating Password..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
