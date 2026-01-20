import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function AuthOnlyRoute() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return (
    <div className="container-fluid">
      <main
        className="col py-3"
        style={{ background: "linear-gradient(180deg,#f7fbff,#eef4fb)" }}
      >
        <Outlet />
      </main>
    </div>
  );
}
