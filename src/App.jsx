import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";

/*
Layouts
*/
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import OwnerLayout from "./layouts/OwnerLayout";

/*
Shared Pages
*/
import UserProfile from "./pages/Profile";
import ChangePassword from "./pages/owner/ChangePassword";

/*
Admin Pages
*/
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import StoresAdmin from "./pages/admin/Stores";
import CreateUser from "./pages/admin/CreateUser";
import CreateStore from "./pages/admin/CreateStore";

/*
User Pages
*/
import Stores from "./pages/user/Stores";
import StoreDetails from "./pages/user/StoreDetails";

/*
Owner Pages
*/
import OwnerDashboard from "./pages/owner/Dashboard";

/*
Misc Pages
*/
import Unauthorized from "./pages/Unauthorized";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}

        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected */}

        <Route element={<ProtectedRoute />}>
          {/* Shared Routes For All Logged In Users */}

          {/* <Route path="/profile" element={<UserProfile />} /> */}

          {/* ADMIN */}

          <Route element={<RoleRoute role="ADMIN" />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<Dashboard />} />

              <Route path="/admin/users" element={<Users />} />

              <Route path="/admin/stores" element={<StoresAdmin />} />

              <Route path="/admin/create-user" element={<CreateUser />} />

              <Route path="/admin/create-store" element={<CreateStore />} />

              <Route
                path="/admin/change-password"
                element={<ChangePassword />}
              />

              <Route path="/admin/profile" element={<UserProfile />} />
            </Route>
          </Route>

          {/* USER */}

          <Route element={<RoleRoute role="USER" />}>
            <Route element={<UserLayout />}>
              <Route path="/stores" element={<Stores />} />

              <Route path="/stores/:id" element={<StoreDetails />} />
              <Route
                path="/stores/change-password"
                element={<ChangePassword />}
              />
              <Route path="/stores/profile" element={<UserProfile />} />
            </Route>
          </Route>

          {/* STORE OWNER */}

          <Route element={<RoleRoute role="STORE_OWNER" />}>
            <Route element={<OwnerLayout />}>
              <Route path="/owner" element={<OwnerDashboard />} />
              <Route
                path="/owner/change-password"
                element={<ChangePassword />}
              />
              <Route path="/owner/profile" element={<UserProfile />} />
            </Route>
          </Route>
        </Route>

        {/* 404 */}

        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
              <div className="text-center">
                <h1 className="text-6xl font-bold">404</h1>

                <p className="mt-4 text-slate-400">Page Not Found</p>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
