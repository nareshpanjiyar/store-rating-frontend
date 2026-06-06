import { Outlet, useLocation } from "react-router-dom";

import AdminSidebar from "../components/layout/AdminSidebar";
import ProfileBadge from "../components/common/ProfileBadge";

export default function AdminLayout() {
  const location = useLocation();

  const pageInfo = {
    "/admin": {
      title: "Dashboard",
      description: "Monitor users, stores and platform activity",
    },

    "/admin/users": {
      title: "Users",
      description: "Manage user accounts and permissions",
    },

    "/admin/stores": {
      title: "Stores",
      description: "Manage stores registered on the platform",
    },

    "/admin/create-user": {
      title: "Create User",
      description: "Add a new user or store owner",
    },

    "/admin/create-store": {
      title: "Create Store",
      description: "Register a new store",
    },

    "/admin/profile": {
      title: "Profile",
      description: "Manage your account information",
    },

    "/admin/change-password": {
      title: "Change Password",
      description: "Update your account password securely",
    },
  };

  const current = pageInfo[location.pathname] || {
    title: "Admin Panel",
    description: "",
  };

  return (
    <div
      className="
        flex
        h-screen
        overflow-hidden
        bg-slate-950
        text-white
      "
    >
      <AdminSidebar />

      <main className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}

        <div
          className="
            h-20
            px-8
            border-b
            border-slate-800
            flex
            items-center
            justify-between
            bg-slate-950
          "
        >
          <div>
            <h1 className="text-3xl font-bold">{current.title}</h1>

            <p className="text-slate-400 text-sm">{current.description}</p>
          </div>

          <ProfileBadge />
        </div>

        {/* Content */}

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
