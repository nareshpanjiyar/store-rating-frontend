import { useState } from "react";

import { Outlet, NavLink, useNavigate } from "react-router-dom";
import ProfileBadge from "../components/common/ProfileBadge";

import {
  LayoutDashboard,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function OwnerLayout() {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const menuItems = [
    {
      label: "Dashboard",
      path: "/owner",
      icon: LayoutDashboard,
    },
    {
      label: "Profile",
      path: "/owner/profile",
      icon: User,
    },
  ];

  return (
    <div
      className="
        min-h-screen
        flex
        bg-slate-100
        dark:bg-slate-950
        text-slate-900
        dark:text-white
      "
    >
      <aside
        className={`
          ${collapsed ? "w-20" : "w-64"}
          transition-all
          duration-300
          border-r
          border-slate-200
          dark:border-slate-800
          bg-white
          dark:bg-slate-900
          flex
          flex-col
        `}
      >
        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between
            p-4
            border-b
            border-slate-200
            dark:border-slate-800
          "
        >
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
              hover:bg-slate-200
              dark:hover:bg-slate-800
            "
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Menu */}

        <nav className="flex-1 px-3 py-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/owner"}
                className={({ isActive }) =>
                  `
                    flex
                    items-center
                    ${collapsed ? "justify-center" : "gap-3"}
                    p-3
                    rounded-lg
                    transition-all

                    ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "hover:bg-slate-200 dark:hover:bg-slate-800"
                    }
                  `
                }
              >
                <Icon size={20} />

                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}

        <div
          className="
            p-3
            border-t
            border-slate-200
            dark:border-slate-800
          "
        >
          <button
            onClick={logout}
            className={`
              w-full
              flex
              items-center
              ${collapsed ? "justify-center" : "gap-3"}
              p-3
              rounded-lg
              hover:bg-red-600
              text-white
              transition-all
              cursor-pointer
            `}
          >
            <LogOut size={20} />

            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1">
        <div
          className="
            h-16
            px-6
            flex
            items-center
            justify-end
            border-b
            border-slate-200
            dark:border-slate-800
            bg-white
            dark:bg-slate-950
          "
        >
          <ProfileBadge />
        </div>

        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
