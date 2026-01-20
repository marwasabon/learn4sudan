import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Sidebar from "./Sidebar.jsx";
import { useState } from "react";

export default function ProtectedRoute() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  const isAdmin =
    !!user?.isAdmin ||
    (Array.isArray(user?.roles) && user.roles.some((r) => r?.name === "admin"));
  // Non-admin users should not access protected pages; redirect to home
  if (!isAdmin) return <Navigate to="/" replace />;
  return (
    <div className="container-fluid">
      <div className="row">
        {isAdmin && (
          <aside
            className="col-auto px-0"
            style={{ width: collapsed ? 64 : 260 }}
          >
            <Sidebar
              collapsed={collapsed}
              onToggle={() => setCollapsed((c) => !c)}
            />
          </aside>
        )}
        <main
          className="col py-3"
          style={{ background: "linear-gradient(180deg,#f7fbff,#eef4fb)" }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
