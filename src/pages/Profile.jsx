import { User, Mail, Shield } from "lucide-react";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-slate-500 mt-1">View your account information</p>
      </div>

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
            <User size={40} />
          </div>

          <div>
            <h2 className="text-3xl font-bold">{user.name}</h2>

            <p className="text-slate-500">{user.role}</p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <Mail size={18} />
            <span>{user.email}</span>
          </div>

          <div className="flex items-center gap-3">
            <Shield size={18} />
            <span>{user.role}</span>
          </div>

          <div className="flex items-center gap-3">
            <User size={18} />
            <span>{user.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
