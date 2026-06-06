import { useState, useRef, useEffect } from "react";
import { User, LogOut, Lock, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export default function ProfileBadge() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const configurePath = (path) => {
    switch (user.role) {
      case "ADMIN":
        return "/admin" + path;

      case "STORE_OWNER":
        return "/owner" + path;

      default:
        return "/stores" + path;
    }
  };

  const logout = () => {
    queryClient.clear();
    localStorage.clear();
    navigate("/login");
  };

  const initials =
    user?.name
      ?.split(" ")
      ?.map((n) => n[0])
      ?.join("")
      ?.toUpperCase()
      ?.slice(0, 2) || "U";

  const roleStyles = {
    ADMIN: {
      ring: "ring-red-500/40",
      badge: "bg-red-500/10 text-red-300 border border-red-500/20",
    },

    STORE_OWNER: {
      ring: "ring-blue-500/40",
      badge: "bg-blue-500/10 text-blue-300 border border-blue-500/20",
    },

    USER: {
      ring: "ring-emerald-500/40",
      badge: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20",
    },
  };

  const style = roleStyles[user.role] || roleStyles.USER;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="
          flex
          items-center
          gap-2
          cursor-pointer
          rounded-xl
          px-2
          py-1
          hover:bg-slate-100
          dark:hover:bg-slate-800
          transition-all
        "
      >
        <div
          className={`
            w-10
            h-10
            rounded-full
            from-blue-500
            via-indigo-500
            to-purple-600
            text-white
            font-semibold
            flex
            items-center
            justify-center
            ring-2
            ${style.ring}
          `}
        >
          {initials}
        </div>

        <ChevronDown
          size={16}
          className={`
            transition-transform
            duration-200
            text-slate-500
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            mt-3
            w-72
            bg-white
            dark:bg-slate-900
            border
            border-slate-200
            dark:border-slate-800
            rounded-2xl
            shadow-2xl
            overflow-hidden
            z-50
          "
        >
          <div
            className="
              p-5
              border-b
              border-slate-200
              dark:border-slate-800
            "
          >
            <div className="flex items-center gap-4">
              <div>
                <h3 className="font-semibold text-base">{user.name}</h3>

                <p className="text-sm text-slate-500 truncate">{user.email}</p>

                <span
                  className={`
                    inline-flex
                    items-center
                    mt-2
                    px-3
                    py-1.5
                    rounded-xl
                    text-xs
                    font-semibold
                    tracking-wide
                    ${style.badge}
                  `}
                >
                  {user.role}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setOpen(false);
              navigate(configurePath("/profile"));
            }}
            className="
              w-full
              flex
              items-center
              gap-3
              px-5
              py-3
              hover:bg-slate-100
              dark:hover:bg-slate-800
              transition-colors
              cursor-pointer
            "
          >
            <User size={18} />
            Profile
          </button>

          <button
            onClick={() => {
              setOpen(false);
              navigate(configurePath("/change-password"));
            }}
            className="
              w-full
              flex
              items-center
              gap-3
              px-5
              py-3
              hover:bg-slate-100
              dark:hover:bg-slate-800
              transition-colors
              cursor-pointer
            "
          >
            <Lock size={18} />
            Change Password
          </button>

          <button
            onClick={logout}
            className="
              w-full
              flex
              items-center
              gap-3
              px-5
              py-3
              text-red-400
              hover:bg-red-500/10
              transition-colors
              cursor-pointer
            "
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
