import { useState } from "react";

import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";

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

  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const pageInfo = {
    "/owner": {
      title: "Store Dashboard",
      description: "View ratings, customer feedback and store performance",
    },

    "/owner/profile": {
      title: "Profile",
      description: "Manage your personal account information",
    },

    "/owner/change-password": {
      title: "Change Password",
      description: "Update your account password securely",
    },
  };

  const current = pageInfo[location.pathname] || {
    title: "Store Owner",
    description: "",
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
        h-screen
        overflow-hidden
        flex
        bg-slate-100
        dark:bg-slate-950
        text-slate-900
        dark:text-white
      "
    >
      {/* Sidebar */}

      <aside
        className={`
          ${collapsed ? "w-20" : "w-64"}
          h-screen
          shrink-0
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
        {/* Logo */}

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
              cursor-pointer
            "
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation */}

        <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
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
                    rounded-xl
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
              rounded-xl
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

      {/* Main Content */}

      <main
        className="
          flex
          flex-col
          flex-1
          overflow-hidden
        "
      >
        {/* Page Header */}

        <div
          className="
            h-20
            shrink-0
            px-8
            flex
            items-center
            justify-between
            border-b
            border-slate-200
            dark:border-slate-800
            bg-white
            dark:bg-slate-950
          "
        >
          <div>
            <h1 className="text-3xl font-bold">{current.title}</h1>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              {current.description}
            </p>
          </div>

          <ProfileBadge />
        </div>

        {/* Page Content */}

        <div
          className="
            flex-1
            overflow-y-auto
            p-8
          "
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
}
