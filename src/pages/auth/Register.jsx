import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerUser } from "../../api/authApi";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(2, "Name must contain at least 2 characters"),

  email: z.string().email("Please enter a valid email"),

  address: z
    .string()
    .min(1, "Address must be at least 1 character")
    .max(400, "Address cannot exceed 400 characters"),

  password: z.string().min(3, "Password must be at least 3 characters"),
});

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await registerUser(data);

      toast.success("Account created successfully");

      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
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
              from-green-500
              to-emerald-600
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

          <h1 className="text-3xl font-bold text-white">Create Account</h1>

          <p className="text-slate-400 mt-2">Join Store Rating today</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-200">
              Full Name
            </label>

            <input
              placeholder="Enter your full name"
              {...register("name")}
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
                focus:ring-green-500
              "
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>

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
                focus:ring-green-500
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
              Address
            </label>

            <input
              placeholder="Enter your address"
              {...register("address")}
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
                focus:ring-green-500
              "
            />

            {errors.address && (
              <p className="mt-1 text-sm text-red-400">
                {errors.address.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-200">
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
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
                focus:ring-green-500
              "
            />

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
              bg-green-600
              hover:bg-green-700
              disabled:opacity-60
              text-white
              font-semibold
              transition-colors
            "
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm">Already have an account?</p>

          <Link
            to="/login"
            className="
              inline-block
              mt-2
              font-medium
              text-green-400
              hover:text-green-300
            "
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
