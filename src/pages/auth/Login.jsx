import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginUser } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-200">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="
                w-full
                px-4
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

            {errors.email && (
              <p className="mt-1 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-200">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="
                w-full
                px-4
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

            <p>
              Minimum 6 characters, including 1 uppercase letter and 1 special
              character.
            </p>
            {errors.password && (
              <p className="mt-1 text-sm text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

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
              text-white
              font-semibold
              transition-colors
            "
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>

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
