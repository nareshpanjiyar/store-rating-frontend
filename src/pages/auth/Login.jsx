import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { loginUser } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

import { useNavigate, Link } from "react-router-dom";

import { toast } from "sonner";

import { Eye, EyeOff, Mail, Lock } from "lucide-react";

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;

const schema = z.object({
  email: z.string().email("Please enter a valid email"),

  password: z
    .string()
    .regex(
      passwordRegex,
      "Password must contain at least 6 characters, one uppercase letter, and one special character",
    ),
});

export default function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);

      login(response.data.token, response.data.user);

      toast.success("Login successful");

      const role = response.data.user.role;

      if (role === "ADMIN") {
        navigate("/admin");
      } else if (role === "STORE_OWNER") {
        navigate("/owner");
      } else {
        navigate("/stores");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-slate-950
        px-4
      "
    >
      <div
        className="
          w-full
          max-w-md
          bg-slate-900
          border
          border-slate-800
          rounded-3xl
          shadow-2xl
          p-8
        "
      >
        {/* Logo */}

        <div className="text-center mb-8">
          <div
            className="
              w-20
              h-20
              mx-auto
              mb-4
              rounded-2xl
              bg-gradient-to-r
              from-blue-500
              to-violet-600
              flex
              items-center
              justify-center
              text-white
              text-3xl
              font-bold
            "
          >
            SR
          </div>

          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>

          <p className="text-slate-400 mt-2">
            Sign in to continue to Store Rating
          </p>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-200">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                className="
                  w-full
                  pl-11
                  pr-4
                  py-3
                  rounded-xl
                  bg-slate-800
                  border
                  border-slate-700
                  text-white
                  placeholder:text-slate-400
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />
            </div>

            {errors.email && (
              <p className="mt-1 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-200">
              Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
                className="
                  w-full
                  pl-11
                  pr-12
                  py-3
                  rounded-xl
                  bg-slate-800
                  border
                  border-slate-700
                  text-white
                  placeholder:text-slate-400
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                  transition-colors
                  cursor-pointer
                "
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1 text-sm text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={isSubmitting}
            className="
              w-full
              py-3
              rounded-xl
              bg-blue-600
              hover:bg-blue-700
              disabled:opacity-60
              disabled:cursor-not-allowed
              text-white
              font-semibold
              transition-colors
            "
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}

        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm">Don't have an account?</p>

          <Link
            to="/register"
            className="
              inline-block
              mt-2
              font-medium
              text-blue-400
              hover:text-blue-300
              transition-colors
            "
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
