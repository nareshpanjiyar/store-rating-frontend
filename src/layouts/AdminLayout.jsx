import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/layout/AdminSidebar";
import ProfileBadge from "../components/common/ProfileBadge";

export default function AdminLayout() {
  return (
    <div className="flex bg-slate-950 text-white min-h-screen">
      <AdminSidebar />
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
