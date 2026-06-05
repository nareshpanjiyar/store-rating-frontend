import { useState } from "react";

import {
  LayoutDashboard,
  Users,
  Store,
  UserPlus,
  PlusSquare,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Link, useNavigate, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const navigate = useNavigate();

  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/admin",
    },
    {
      icon: Users,
      label: "Users",
      path: "/admin/users",
    },
    {
      icon: Store,
      label: "Stores",
      path: "/admin/stores",
    },
    {
      icon: UserPlus,
      label: "Create User",
      path: "/admin/create-user",
    },
    {
      icon: PlusSquare,
      label: "Create Store",
      path: "/admin/create-store",
    },
  ];

  return (
    <aside
      className={`
        ${collapsed ? "w-20" : "w-64"}
        min-h-screen
        bg-slate-900
        border-r
        border-slate-800
        transition-all
        duration-300
        flex
        flex-col
      `}
    >
      {/* Header */}

      <div className="flex items-center justify-between p-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div
            className="
              w-10
              h-10
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-violet-600
              flex
              items-center
              justify-center
              text-white
              font-bold
              text-lg
              shrink-0
            "
          >
            S
          </div>

          {!collapsed && (
            <span className="font-bold text-lg whitespace-nowrap">
              Store Rating
            </span>
          )}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="
            p-1
            rounded
            hover:bg-slate-800
          "
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Menu */}

      <nav className="flex-1 px-3 py-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                  flex
                  items-center
                  ${collapsed ? "justify-center" : "gap-3"}
                  p-3
                  rounded-lg
                  transition-all

                  ${active ? "bg-blue-600 text-white" : "hover:bg-slate-800"}
                `}
            >
              <Icon size={20} />

              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}

      <div className="p-3 border-t border-slate-800">
        <button
          onClick={logout}
          className={`
            w-full
            flex
            items-center
            ${collapsed ? "justify-center" : "gap-3"}
            p-3
            rounded-lg
            hover:bg-red-500
            transition-all
            cursor-pointer
          `}
        >
          <LogOut size={20} />

          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
