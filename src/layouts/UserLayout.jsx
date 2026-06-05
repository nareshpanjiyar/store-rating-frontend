import { Outlet, Link } from "react-router-dom";
import ProfileBadge from "../components/common/ProfileBadge";

export default function UserLayout() {
  return (
    <div
      className="
        min-h-screen
        bg-slate-100
        dark:bg-slate-950
        text-slate-900
        dark:text-white
      "
    >
      <header
        className="
          sticky
          top-0
          z-50
          bg-white
          dark:bg-slate-900
          border-b
          border-slate-200
          dark:border-slate-800
        "
      >
        <div
          className="
            max-w-8xl
            mx-auto
            px-6
            h-16
            flex
            items-center
            justify-between
          "
        >
          <div className="flex items-center gap-8">
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
              <span className="font-bold text-lg whitespace-nowrap">
                Store Rating
              </span>
            </div>

            <Link
              to="/stores"
              className="
                text-sm
                font-medium
                text-slate-600
                hover:text-slate-900
                dark:text-slate-400
                dark:hover:text-white
                transition-colors
              "
            >
              Stores
            </Link>
          </div>
          <ProfileBadge />
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
